const flowchartGenerator = (function() {
    function generateFlowchart(parsedLog) {
        let flowchartText = '';

        if (parsedLog.validations.length > 0) {
            flowchartText += `
+-----------------------------+
|      Validation Rules       |
+-----------------------------+
${parsedLog.validations.map(validation => `| ${validation.ruleName}         `).join('\n')}
+-----------------------------+
`;
        }

        if (parsedLog.duplicateRules.length > 0) {
            if (flowchartText) {
                flowchartText += '              |\n              v\n';
            }
            flowchartText += `
+-----------------------------+
|    Duplicate Detection      |
+-----------------------------+
${parsedLog.duplicateRules.map(rule => `| ${rule.ruleName}               `).join('\n')}
+-----------------------------+
`;
        }

        if (parsedLog.triggers.length > 0) {
            if (flowchartText) {
                flowchartText += '              |\n              v\n';
            }
            flowchartText += `
+-----------------------------+
|         Triggers            |
+-----------------------------+
${parsedLog.triggers.map(trigger => `| ${trigger.triggerName} (${trigger.triggerEvent})         `).join('\n')}
+-----------------------------+
`;
        }

        return flowchartText;
    }

    return {
        generateFlowchart: generateFlowchart
    };
})();
