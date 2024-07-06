export function generateFlowchart(parsedLog) {
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

    if (parsedLog.triggerDetails) {
        if (flowchartText) {
            flowchartText += '              |\n              v\n';
        }
        flowchartText += `
+-----------------------------+
|        Trigger Event        |
+-----------------------------+
| ${parsedLog.triggerDetails.triggerName} (${parsedLog.triggerDetails.triggerEvent}) |
+-----------------------------+
`;
    }

    return flowchartText.trim();
}
