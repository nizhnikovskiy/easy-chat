import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Fix the CSS import path in the generated type definition
const indexDtsPath = join(process.cwd(), 'dist', 'index.d.ts');

try {
  let content = readFileSync(indexDtsPath, 'utf-8');
  
  // Remove the CSS import line from the type definition
  // Users need to import it separately as 'easy-chat/styles'
  content = content.replace(/import\s+['"]\.\/styles\/index\.css['"];?\n?/g, '');
  
  writeFileSync(indexDtsPath, content, 'utf-8');
  console.log('✓ Fixed type definitions');
} catch (error) {
  console.error('Error fixing type definitions:', error.message);
  process.exit(1);
}


