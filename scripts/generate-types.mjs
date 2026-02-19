#!/usr/bin/env node

/**
 * Auto-generate TypeScript definitions from Dart interop code
 * 
 * This script parses the Dart interop file to extract function signatures
 * and automatically generates TypeScript definitions.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const DART_INTEROP_FILE = join(__dirname, '..', 'dart', 'interop.dart');
const TS_OUTPUT_FILE = join(__dirname, '..', 'dist', 'interop.d.ts');

/**
 * Parse Dart type to TypeScript type
 */
function dartTypeToTS(dartType) {
  const typeMap = {
    'JSNumber': 'number',
    'JSString': 'string',
    'JSBoolean': 'boolean',
    'JSArray<JSNumber>': 'number[]',
    'JSArray<JSString>': 'string[]',
    'JSPromise<JSString>': 'Promise<string>',
    'JSPromise<JSNumber>': 'Promise<number>',
    'JSPromise<JSBoolean>': 'Promise<boolean>',
    'void': 'void',
  };

  // Handle generic types
  if (dartType.includes('JSArray<')) {
    const innerType = dartType.match(/JSArray<(.+?)>/)?.[1];
    if (innerType) {
      return `${dartTypeToTS(innerType)}[]`;
    }
  }

  if (dartType.includes('JSPromise<')) {
    const innerType = dartType.match(/JSPromise<(.+?)>/)?.[1];
    if (innerType) {
      return `Promise<${dartTypeToTS(innerType)}>`;
    }
  }

  return typeMap[dartType] || 'any';
}

/**
 * Parse function signature from Dart code
 */
function parseFunctionSignature(implName, implCode) {
  // Extract return type and parameters
  const signatureMatch = implCode.match(
    /(\w+(?:<[^>]+>)?)\s+(\w+)\s*\((.*?)\)/s
  );
  
  if (!signatureMatch) {
    return null;
  }

  const [, returnType, funcName, paramsStr] = signatureMatch;
  
  // Parse parameters
  const params = [];
  if (paramsStr.trim()) {
    const paramList = paramsStr.split(',').map(p => p.trim());
    for (const param of paramList) {
      const paramMatch = param.match(/(\w+(?:<[^>]+>)?)\s+(\w+)/);
      if (paramMatch) {
        const [, paramType, paramName] = paramMatch;
        params.push({
          name: paramName,
          type: dartTypeToTS(paramType)
        });
      }
    }
  }

  return {
    name: funcName.replace('_', '').replace('Impl', ''),
    returnType: dartTypeToTS(returnType),
    params
  };
}

/**
 * Extract exported functions from Dart interop file
 */
function extractFunctions(dartCode) {
  const functions = [];
  
  // First, parse the main() function to find assignments
  const mainMatch = dartCode.match(/void\s+main\s*\(\s*\)\s*{([^}]+)}/s);
  const assignments = new Map();
  
  if (mainMatch) {
    const mainBody = mainMatch[1];
    // Pattern: _internalName = _actualFunction.toJS or _actualFunctionImpl.toJS
    const assignmentMatches = mainBody.matchAll(/_(\w+)\s*=\s*_?(\w+)(?:\.toJS|Impl\.toJS)/g);
    for (const match of assignmentMatches) {
      const [, internalName, actualFunc] = match;
      assignments.set(internalName, actualFunc);
    }
  }
  
  // Find all @JS declarations
  const jsDeclarations = dartCode.matchAll(
    /@JS\('globalThis\.dartbridge\.(\w+)'\)[^;]*external\s+set\s+_(\w+)/g
  );
  
  for (const match of jsDeclarations) {
    const [, exportName, internalName] = match;
    
    // Get the actual function name from assignments
    const actualFunc = assignments.get(internalName) || `${internalName}Impl`;
    
    // Find the corresponding implementation function
    const implPattern = new RegExp(
      `(\\w+(?:<[^>]+>)?)\\s+_${actualFunc}\\s*\\(([^)]*(?:\\([^)]*\\)[^)]*)?)\\)`,
      's'
    );
    const implMatch = dartCode.match(implPattern);
    
    if (implMatch) {
      const [fullMatch] = implMatch;
      const signature = parseFunctionSignature(`_${actualFunc}`, fullMatch);
      
      if (signature) {
        signature.exportName = exportName;
        functions.push(signature);
      }
    }
  }
  
  return functions;
}

/**
 * Generate TypeScript interface from functions
 */
function generateTSInterface(functions) {
  const header = `/**
 * TypeScript definitions for Dart-compiled JavaScript interop
 * 
 * AUTO-GENERATED - DO NOT EDIT MANUALLY
 * Generated from: dart/interop.dart
 * 
 * To regenerate: npm run generate-types
 */

/**
 * Global Dart bridge namespace
 */
declare global {
  interface Window {
    dartbridge: DartBridge;
  }

  const dartbridge: DartBridge;
}

/**
 * Main Dart bridge interface
 */
export interface DartBridge {`;

  const methods = functions.map(func => {
    const paramsList = func.params
      .map(p => `${p.name}: ${p.type}`)
      .join(', ');
    
    return `  /**
   * ${func.exportName} - Dart function exposed to JavaScript
   */
  ${func.exportName}: (${paramsList}) => ${func.returnType};`;
  }).join('\n\n');

  const footer = `
}

export {};
`;

  return header + '\n' + methods + '\n' + footer;
}

/**
 * Main function
 */
function main() {
  try {
    console.log('🔍 Reading Dart interop file...');
    const dartCode = readFileSync(DART_INTEROP_FILE, 'utf-8');
    
    console.log('📝 Parsing function signatures...');
    const functions = extractFunctions(dartCode);
    
    if (functions.length === 0) {
      console.warn('⚠️  No functions found in Dart interop file');
      return;
    }
    
    console.log(`✅ Found ${functions.length} functions:`);
    functions.forEach(func => {
      const params = func.params.map(p => `${p.name}: ${p.type}`).join(', ');
      console.log(`   - ${func.exportName}(${params}): ${func.returnType}`);
    });
    
    console.log('\n🔨 Generating TypeScript definitions...');
    const tsContent = generateTSInterface(functions);
    
    writeFileSync(TS_OUTPUT_FILE, tsContent, 'utf-8');
    console.log(`✅ TypeScript definitions written to: ${TS_OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
