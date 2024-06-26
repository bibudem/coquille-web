"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_MAP = exports.ERROR_CODES = void 0;
const ERROR_CODES = exports.ERROR_CODES = {
  MdxCompilation: `10001`,
  NonExistentFileNode: `10002`,
  InvalidAcornAST: `10003`,
  NonDeterminableExportName: `10004`,
  AcornCompilation: `10005`
};
const ERROR_MAP = exports.ERROR_MAP = {
  [ERROR_CODES.MdxCompilation]: {
    text: context => `Failed to compile the file "${context.absolutePath}". Original error message:\n\n${context.errorMeta.message}`,
    level: `ERROR`,
    type: `PLUGIN`,
    category: `USER`
  },
  [ERROR_CODES.NonExistentFileNode]: {
    text: context => `Unable to locate the GraphQL File node for ${context.resourcePath}${context.mdxPath ? `\nFile: ${context.mdxPath}` : ``}`,
    level: `ERROR`,
    type: `PLUGIN`
  },
  [ERROR_CODES.InvalidAcornAST]: {
    text: context => `Invalid AST. Parsed source code did not return valid output.\n\nTemplate:\n${context.resourcePath}${context.mdxPath ? `\nFile: ${context.mdxPath}` : ``}`,
    level: `ERROR`,
    type: `PLUGIN`,
    category: `USER`
  },
  [ERROR_CODES.NonDeterminableExportName]: {
    text: context => `Unable to determine default export name for file:\n${context.resourcePath}`,
    level: `ERROR`,
    type: `PLUGIN`
  },
  [ERROR_CODES.AcornCompilation]: {
    text: context => `Unable to inject MDX into JS template:\n${context.resourcePath}`,
    level: `ERROR`,
    type: `PLUGIN`
  }
};