const parser = (function() {
    function parseLog(log) {
        const lines = log.split('\n');
        const summary = {
            user: '',
            events: [],
            validations: [],
            duplicateRules: [],
            duplicateDetails: null,
            duplicateSummary: null,
            object: '',
            record: '',
            triggers: []
        };

        lines.forEach(line => {
            if (line.includes('|USER_INFO|')) {
                const parts = line.split('|');
                summary.user = `<span class="dynamic-content">${parts[4]}</span> with ID <span class="dynamic-content">${parts[3]}</span>`;
            } else if (line.includes('|EXECUTION_STARTED|') || line.includes('|EXECUTION_STARTED')) {
                summary.events.push('EXECUTION_STARTED');
            } else if (line.includes('|EXECUTION_FINISHED|') || line.includes('|EXECUTION_FINISHED')) {
                summary.events.push('EXECUTION_FINISHED');
            } else if (line.includes('|VALIDATION_RULE|')) {
                const parts = line.split('|');
                summary.validations.push({
                    ruleId: parts[2],
                    ruleName: parts[3]
                });
            } else if (line.includes('|VALIDATION_FORMULA|')) {
                const parts = line.split('|');
                const lastValidation = summary.validations[summary.validations.length - 1];
                if (lastValidation) {
                    lastValidation.formula = parts[2];
                    lastValidation.description = parts[3].split('=')[1];
                }
            } else if (line.includes('|VALIDATION_FAIL|') || line.includes('|VALIDATION_FAIL')) {
                const lastValidation = summary.validations[summary.validations.length - 1];
                if (lastValidation) {
                    lastValidation.result = 'FAIL';
                }
            } else if (line.includes('|CODE_UNIT_STARTED|')) {
                const parts = line.split('|');
                if (parts[3].startsWith('Validation:')) {
                    const [validationObject, validationRecord] = parts[3].split(':').slice(1);
                    summary.object = validationObject;
                    summary.record = validationRecord;
                } else if (parts[3].startsWith('TRIGGERS')) {
                    summary.triggers.push({
                        triggerId: parts[3].split('|')[1],
                        triggerName: parts[3].split('|')[2].split(' ')[0],
                        triggerEvent: parts[3].split(' ')[parts[3].split(' ').length - 1]
                    });
                }
            } else if (line.includes('|DUPLICATE_DETECTION_RULE_INVOCATION|')) {
                const parts = line.split('|');
                summary.duplicateRules.push({
                    ruleId: parts[2].split(':')[1],
                    ruleName: parts[3].split(':')[1],
                    dmlType: parts[4].split(':')[1]
                });
            } else if (line.includes('|DUPLICATE_DETECTION_MATCH_INVOCATION_DETAILS|')) {
                const parts = line.split('|');
                summary.duplicateDetails = {
                    entityType: parts[2].split(':')[1],
                    actionTaken: parts[3].split(':')[1].replace('_', ' ')
                };
            } else if (line.includes('|DUPLICATE_DETECTION_MATCH_INVOCATION_SUMMARY|')) {
                const parts = line.split('|');
                summary.duplicateSummary = {
                    entityType: parts[2].split(':')[1],
                    numRecordsToBeSaved: parts[3].split(':')[1],
                    numRecordsToBeSavedWithDuplicates: parts[4].split(':')[1],
                    numDuplicateRecordsFound: parts[5].split(':')[1]
                };
            }
        });

        return summary;
    }

    return {
        parseLog: parseLog
    };
})();
