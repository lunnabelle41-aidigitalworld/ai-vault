const fs = require('fs');
const path = require('path');

// Read the new tools file
const newToolsPath = path.join(__dirname, 'new_tools_add68.ts');
const newToolsContent = fs.readFileSync(newToolsPath, 'utf8');

// Extract the tools array using regex
const newToolsMatch = newToolsContent.match(/export const newTools = (\[[\s\S]*?\]);/);
if (!newToolsMatch) {
  console.error('Could not find newTools array in new_tools_add68.ts');
  process.exit(1);
}

// Parse the tools using eval (safe in this context since we control the input)
let newTools;
try {
  newTools = eval(newToolsMatch[1]);
} catch (error) {
  console.error('Error parsing tools:', error);
  process.exit(1);
}

// Read the existing tools file
const toolsPath = path.join(__dirname, 'tools.ts');
let toolsContent = fs.readFileSync(toolsPath, 'utf8');

// Find the position to insert new tools (before the closing bracket)
const insertPosition = toolsContent.lastIndexOf('];');

// Convert new tools to the proper format
let newToolsString = JSON.stringify(newTools, null, 2);

// Insert the new tools before the closing bracket
const updatedContent = toolsContent.slice(0, insertPosition) + 
  '  // AI for Construction & Architecture - 10 tools\n' +
  '  // AI for Media & Journalism - 10 tools\n' +
  '  // AI for Event Management - 10 tools\n' +
  '  // AI for Legal Services - 10 tools\n' +
  '  // AI for Human Resources - 10 tools\n' +
  newToolsString.slice(1, -1) + ',\n];';

// Write the updated content back to the file
fs.writeFileSync(toolsPath, updatedContent);

console.log('Successfully appended new tools to tools.ts');