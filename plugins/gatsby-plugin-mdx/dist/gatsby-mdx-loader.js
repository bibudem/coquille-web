"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = require("gatsby-core-utils/path");
var _cacheHelpers = require("./cache-helpers");
var _compileMdx = require("./compile-mdx");
/* eslint-disable @babel/no-invalid-this */

// Custom MDX Loader that compiles MDX to JSX
const gatsbyMDXLoader = async function (source) {
  const {
    options,
    getNode,
    cache,
    reporter
  } = this.getOptions();
  const resourcePath = (0, _path.slash)(this.resourcePath);
  const mdxNodeId = await cache.get((0, _cacheHelpers.createFileToMdxCacheKey)(resourcePath));
  if (!mdxNodeId) {
    return source;
  }
  const mdxNode = getNode(mdxNodeId);
  if (!mdxNode) {
    return source;
  }
  const compileRes = await (0, _compileMdx.compileMDX)(
  // We want to work with the transformed source from our layout plugin
  {
    absolutePath: resourcePath,
    source: mdxNode.body
  }, options, cache, reporter);
  if (compileRes !== null && compileRes !== void 0 && compileRes.processedMDX) {
    return compileRes.processedMDX;
  }
  return source;
};
var _default = exports.default = gatsbyMDXLoader;