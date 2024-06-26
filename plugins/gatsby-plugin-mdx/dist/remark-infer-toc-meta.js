"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const remarkInferTocMeta = options => {
  const {
    toc,
    visit,
    maxDepth
  } = {
    maxDepth: 6,
    ...options
  };
  const processToC = (node, current) => {
    if (!node) {
      return {};
    }
    switch (node.type) {
      case `paragraph`:
        {
          const typedCurrent = current;
          visit(node, item => {
            if (item.type === `link`) {
              typedCurrent.url = item.url;
            }
            if (item.type === `text` || item.type === `inlineCode`) {
              if (typedCurrent.title) {
                typedCurrent.title += item.value;
              } else {
                typedCurrent.title = item.value;
              }
            }
          });
          return current;
        }
      case `list`:
        {
          const typedCurrent = current;
          typedCurrent.items = node.children.map(item => processToC(item, {}));
          return typedCurrent;
        }
      case `listItem`:
        {
          if (node.children.length) {
            const heading = processToC(node.children[0], {});
            if (node.children.length > 1) {
              processToC(node.children[1], heading);
            }
            return heading;
          }
        }
    }
    return {};
  };
  return (tree, file) => {
    const generatedToC = toc(tree, {
      maxDepth
    });
    const mdxFile = file;
    if (!mdxFile.data.meta) {
      mdxFile.data.meta = {};
    }
    mdxFile.data.meta.toc = processToC(generatedToC.map, {});
  };
};
var _default = exports.default = remarkInferTocMeta;