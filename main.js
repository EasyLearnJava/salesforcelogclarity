import { parseLog } from './parser.js';
import { generateSummary } from './summaryGenerator.js';
import { generateFlowchart } from './flowchartGenerator.js';

document.getElementById('analyzeLogButton').addEventListener('click', analyzeLog);

function analyzeLog() {
    const logInput = document.getElementById('logInput').value;
    const logSummaryElement = document.getElementById('logSummary');
    const flowchartElement = document.getElementById('flowchart');
    const summaryTitle = document.getElementById('summaryTitle');
    const flowchartTitle = document.getElementById('flowchartTitle');
    const messageElement = document.getElementById('message');

    const parsedLog = parseLog(logInput);

    if (parsedLog.user && parsedLog.events.length > 0) {
        const summaryText = generateSummary(parsedLog);
        const flowchartText = generateFlowchart(parsedLog);

        logSummaryElement.innerHTML = summaryText.trim();
        flowchartElement.textContent = flowchartText.trim();

        logSummaryElement.classList.remove('hidden');
        flowchartElement.classList.remove('hidden');
        summaryTitle.classList.remove('hidden');
        flowchartTitle.classList.remove('hidden');
        messageElement.classList.add('hidden');
    } else {
        logSummaryElement.classList.add('hidden');
        flowchartElement.classList.add('hidden');
        summaryTitle.classList.add('hidden');
        flowchartTitle.classList.add('hidden');
        messageElement.classList.remove('hidden');
    }
}
