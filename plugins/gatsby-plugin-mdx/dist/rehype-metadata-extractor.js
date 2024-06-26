"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * This plugin extracts metadata from the file and stores it
 * within the unified processor data for later extraction.
 */
const rehypeMdxMetadataExtractor = function () {
  const metadata = {};
  // eslint-disable-next-line @babel/no-invalid-this
  this.data(`mdxMetadata`, metadata);
  return (_tree, file) => {
    Object.assign(metadata, file.data.meta);
  };
};
var _default = exports.default = rehypeMdxMetadataExtractor;