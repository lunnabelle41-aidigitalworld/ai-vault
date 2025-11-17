const fs = require('fs');
const path = require('path');

// Read the new categories file
const newCategoriesPath = path.join(__dirname, 'new_categories_add63.ts');
const newCategoriesContent = fs.readFileSync(newCategoriesPath, 'utf8');

// Extract the categories array using regex
const newCategoriesMatch = newCategoriesContent.match(/export const newCategories = (\[[\s\S]*?\]);/);
if (!newCategoriesMatch) {
    console.error('Could not find newCategories array in new_categories_add63.ts');
    process.exit(1);
}

// Parse the categories using eval (safe in this context since we control the input)
let newCategories;
try {
    newCategories = eval(newCategoriesMatch[1]);
} catch (error) {
    console.error('Error parsing categories:', error);
    process.exit(1);
}

// Read the existing categories file
const categoriesPath = path.join(__dirname, 'categories.ts');
let categoriesContent = fs.readFileSync(categoriesPath, 'utf8');

// Find the position to insert new categories (before the closing bracket)
const insertPosition = categoriesContent.lastIndexOf('];');

if (insertPosition === -1) {
    console.error('Could not find closing bracket in categories.ts');
    process.exit(1);
}

// Convert categories to the proper format
let newCategoriesString = '';
newCategories.forEach((category, index) => {
    newCategoriesString += '  {\n';
    newCategoriesString += `    name: "${category.name}",\n`;
    newCategoriesString += `    icon: "${category.icon}",\n`;
    newCategoriesString += `    toolCount: ${category.toolCount},\n`;
    newCategoriesString += '    subcategories: [\n';
    
    category.subcategories.forEach(subcategory => {
        newCategoriesString += `      { name: "${subcategory.name}", favicon: "${subcategory.favicon}", website: "${subcategory.website}" },\n`;
    });
    
    newCategoriesString += '    ]\n';
    newCategoriesString += '  }';
    
    // Add comma if not the last category
    if (index < newCategories.length - 1) {
        newCategoriesString += ',\n';
    } else {
        newCategoriesString += '\n';
    }
});

// Insert the new categories before the closing bracket
const updatedContent = categoriesContent.slice(0, insertPosition) + 
    newCategoriesString + 
    categoriesContent.slice(insertPosition);

// Write the updated content back to the file
fs.writeFileSync(categoriesPath, updatedContent);

console.log('Successfully appended new categories to categories.ts');