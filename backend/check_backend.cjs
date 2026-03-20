const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

// Walk directory
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.js') && !file.endsWith('check_backend.cjs')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walk(baseDir);

function getExactCasedPath(absoluteTarget) {
  if (!fs.existsSync(absoluteTarget)) return null;

  const parts = absoluteTarget.split(path.sep);
  let currentPath = parts[0] + path.sep; 

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part === '') continue;

    try {
      const items = fs.readdirSync(currentPath);
      const exactMatch = items.find((item) => item.toLowerCase() === part.toLowerCase());
      if (!exactMatch) return null; 
      currentPath = path.join(currentPath, exactMatch);
    } catch(e) {
      return null;
    }
  }
  return currentPath;
}

let fixesCount = 0;

for (const sourceFile of files) {
  let content = fs.readFileSync(sourceFile, 'utf8');
  let newContent = content;

  // matches import ... from "..." or import "..."
  const importRegex = /(?:import|export)\s+(?:.*from\s+)?['"]([^'"]+)['"]/g;

  let match;
  while ((match = importRegex.exec(newContent)) !== null) {
    const originalImport = match[1];
    
    if (!originalImport.startsWith('.')) continue;

    let absoluteTarget = path.resolve(path.dirname(sourceFile), originalImport);
    let targetWithExt = absoluteTarget;
    let found = false;
    let exts = ['', '.js', '/index.js'];
    
    for (const ext of exts) {
      if (fs.existsSync(absoluteTarget + ext)) {
        const stat = fs.statSync(absoluteTarget + ext);
        if (!stat.isDirectory()) {
           targetWithExt = absoluteTarget + ext;
           found = true;
           break;
        }
      }
    }

    if (!found) continue;

    const exactTarget = getExactCasedPath(targetWithExt);
    if (!exactTarget) continue;

    let relativeImport = path.relative(path.dirname(sourceFile), exactTarget);
    relativeImport = relativeImport.replace(/\\/g, '/');
    if (!relativeImport.startsWith('.')) {
      relativeImport = './' + relativeImport;
    }

    if (originalImport !== relativeImport) {
      console.log(`[FIXING] ${sourceFile}: \n   ${originalImport}  ->  ${relativeImport}`);
      const escTarget = originalImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const replaceRegex = new RegExp(`(['"])${escTarget}(['"])`, 'g');
      newContent = newContent.replace(replaceRegex, `$1${relativeImport}$2`);
      fixesCount++;
    }
  }

  if (content !== newContent) {
    fs.writeFileSync(sourceFile, newContent, 'utf8');
  }
}

console.log(`Done. Fixed ${fixesCount} imports in backend.`);
