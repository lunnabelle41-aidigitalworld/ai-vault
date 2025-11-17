const fs = require('fs');
const path = require('path');

// Read the new tools file
const newToolsPath = path.join(__dirname, 'new_tools_add63.ts');
const newToolsContent = fs.readFileSync(newToolsPath, 'utf8');

// Extract the tools array using regex
const newToolsMatch = newToolsContent.match(/export const newTools = (\[[\s\S]*?\]);/);
if (!newToolsMatch) {
    console.error('Could not find newTools array in new_tools_add63.ts');
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

if (insertPosition === -1) {
    console.error('Could not find closing bracket in tools.ts');
    process.exit(1);
}

// Convert tools to the proper format
let newToolsString = JSON.stringify(newTools, null, 2);

// Remove the opening and closing brackets to integrate with existing array
newToolsString = newToolsString.slice(1, -1);

// Insert the new tools before the closing bracket
const updatedContent = toolsContent.slice(0, insertPosition) + 
    '  // AI for Healthcare & Medicine - 10 tools\n' +
    '  // AI for Automotive & Transportation - 10 tools\n' +
    '  // AI for Food & Beverage - 10 tools\n' +
    '  // AI for Fashion & Apparel - 10 tools\n' +
    '  // AI for Finance & Banking - 10 tools\n' +
    newToolsString + ',\n];';

// Write the updated content back to the file
fs.writeFileSync(toolsPath, updatedContent);

console.log('Successfully appended new tools to tools.ts');