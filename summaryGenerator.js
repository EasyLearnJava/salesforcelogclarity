export function generateSummary(parsedLog) {
    let summaryText = `
<span class="static-label">User</span>: ${parsedLog.user}
<span class="static-label">LogSummary</span>:
  - <span class="static-label">Event</span>: <span class="dynamic-content">EXECUTION_STARTED</span>`;

    if (parsedLog.validations.length > 0) {
        summaryText += `
  - <span class="static-label">ValidationBlock</span>:
      <span class="static-label">Object</span>: <span class="dynamic-content">${parsedLog.object}</span>
      <span class="static-label">Record</span>: <span class="dynamic-content">${parsedLog.record}</span>
      <span class="static-label">Validations</span>: ${parsedLog.validations.map(validation => `
        - <span class="static-label">ValidationRule</span>: <span class="dynamic-content">${validation.ruleName}</span>
          <span class="static-label">Result</span>: <span class="dynamic-content">${validation.result || 'N/A'}</span>
          <span class="static-label">Formula</span>: <span class="dynamic-content">${validation.formula || 'N/A'}</span>
          <span class="static-label">Description</span>: <span class="dynamic-content">${validation.description || 'N/A'}</span>`).join('')}`;
    }

    if (parsedLog.duplicateRules.length > 0 && parsedLog.duplicateSummary) {
        summaryText += `
  - <span class="static-label">DuplicateDetectionBlock</span>:
      <span class="static-label">DuplicateRuleName</span>: <span class="dynamic-content">${parsedLog.duplicateRules[0].ruleName}</span>
      <span class="static-label">Result</span>: <span class="dynamic-content">${parsedLog.duplicateSummary.numDuplicateRecordsFound === '0' ? 'No Duplicates Found' : 'Duplicates Found'}</span>
      <span class="static-label">EntityType</span>: <span class="dynamic-content">${parsedLog.duplicateSummary.entityType}</span>
      <span class="static-label">ActionTaken</span>: <span class="dynamic-content">${parsedLog.duplicateDetails.actionTaken}</span>
      <span class="static-label">NumRecordsToBeSaved</span>: <span class="dynamic-content">${parsedLog.duplicateSummary.numRecordsToBeSaved}</span>
      <span class="static-label">NumRecordsToBeSavedWithDuplicates</span>: <span class="dynamic-content">${parsedLog.duplicateSummary.numRecordsToBeSavedWithDuplicates}</span>
      <span class="static-label">NumDuplicateRecordsFound</span>: <span class="dynamic-content">${parsedLog.duplicateSummary.numDuplicateRecordsFound}</span>`;
    }

    if (parsedLog.triggerDetails) {
        summaryText += `
  - <span class="static-label">TriggerBlock</span>:
      <span class="static-label">Object</span>: <span class="dynamic-content">Account</span>
      <span class="static-label">Trigger</span>: <span class="dynamic-content">${parsedLog.triggerDetails.triggerName}</span>
      <span class="static-label">Event</span>: <span class="dynamic-content">${parsedLog.triggerDetails.triggerEvent}</span>
      <span class="static-label">Record</span>: ${Object.entries(parsedLog.record).map(([key, value]) => `
        <span class="static-label">${key}</span>: <span class="dynamic-content">${value}</span>`).join('')}`;
    }

    summaryText += `
  - <span class="static-label">Event</span>: <span class="dynamic-content">EXECUTION_FINISHED</span>`;

    return summaryText.trim();
}
