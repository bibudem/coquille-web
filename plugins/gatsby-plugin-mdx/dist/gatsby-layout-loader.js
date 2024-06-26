"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _path2 = require("gatsby-core-utils/path");
var _parseComponentPath = require("gatsby-core-utils/parse-component-path");
var _errorUtils = require("./error-utils");
var _cacheHelpers = require("./cache-helpers");
/* eslint-disable @babel/no-invalid-this */

// Wrap MDX content with Gatsby Layout component
const gatsbyLayoutLoader = async function (source) {
  const {
    nodeExists,
    reporter
  } = this.getOptions();
  // Figure out if the path to the MDX file is passed as a
  // resource query param or if the MDX file is directly loaded as path.
  const mdxPath = (0, _parseComponentPath.getPathToContentComponent)(`${this.resourcePath}${this.resourceQuery}`);
  if (!(await nodeExists(mdxPath))) {
    reporter.panicOnBuild({
      id: _errorUtils.ERROR_CODES.NonExistentFileNode,
      context: {
        resourcePath: this.resourcePath,
        mdxPath
      }
    });
  }

  // add mdx dependency to webpack
  this.addDependency(_path.default.resolve(mdxPath));
  const acorn = await (0, _cacheHelpers.cachedImport)(`acorn`);
  // @ts-ignore - We typecast below
  const {
    default: jsx
  } = await (0, _cacheHelpers.cachedImport)(`acorn-jsx`);
  const {
    generate
  } = await (0, _cacheHelpers.cachedImport)(`astring`);
  const {
    buildJsx
  } = await (0, _cacheHelpers.cachedImport)(`estree-util-build-jsx`);
  const JSX = jsx;
  try {
    const tree = acorn.Parser.extend(JSX()).parse(source, {
      ecmaVersion: `latest`,
      sourceType: `module`,
      locations: true
    });
    const AST = tree;

    // Throw when tree is not a Program
    if (!AST.body && !AST.sourceType) {
      reporter.panicOnBuild({
        id: _errorUtils.ERROR_CODES.InvalidAcornAST,
        context: {
          resourcePath: this.resourcePath,
          mdxPath
        }
      });
    }

    /**
     * Inject import to actual MDX file at the top of the file
     * Input:
     * [none]
     * Output:
     * import GATSBY_COMPILED_MDX from "/absolute/path/to/content.mdx"
     */
    AST.body.unshift({
      type: `ImportDeclaration`,
      specifiers: [{
        type: `ImportDefaultSpecifier`,
        local: {
          type: `Identifier`,
          name: `GATSBY_COMPILED_MDX`
        }
      }],
      source: {
        type: `Literal`,
        value: (0, _path2.slash)(mdxPath)
      }
    });
    let hasClassicReactImport = false;

    /**
     * Replace default export with wrapper function that injects compiled MDX as children
     * Input:
     * export default PageTemplate
     * Output:
     * export default (props) => <PageTemplate {...props}>{GATSBY_COMPILED_MDX}</PageTemplate>
     **/
    const newBody = [];
    AST.body.forEach(child => {
      var _id;
      if (child.type === `ImportDeclaration` && child.source.value === `react`) {
        hasClassicReactImport = true;
      }
      if (child.type !== `ExportDefaultDeclaration`) {
        newBody.push(child);
        return;
      }
      const declaration = child.declaration;
      const pageComponentName = ((_id = declaration.id) === null || _id === void 0 ? void 0 : _id.name) || declaration.name || null;
      if (!pageComponentName) {
        reporter.panicOnBuild({
          id: _errorUtils.ERROR_CODES.NonDeterminableExportName,
          context: {
            resourcePath: this.resourcePath
          }
        });
      }
      newBody.push(declaration);
      newBody.push({
        type: `ExportDefaultDeclaration`,
        declaration: {
          type: `FunctionDeclaration`,
          id: {
            type: `Identifier`,
            name: `GatsbyMDXWrapper`
          },
          expression: false,
          generator: false,
          async: false,
          params: [{
            type: `Identifier`,
            name: `props`
          }],
          body: {
            type: `BlockStatement`,
            body: [{
              type: `ReturnStatement`,
              argument: {
                type: `JSXElement`,
                openingElement: {
                  type: `JSXOpeningElement`,
                  attributes: [{
                    type: `JSXSpreadAttribute`,
                    argument: {
                      type: `Identifier`,
                      name: `props`
                    }
                  }],
                  name: {
                    type: `JSXIdentifier`,
                    name: pageComponentName
                  },
                  selfClosing: false
                },
                closingElement: {
                  type: `JSXClosingElement`,
                  name: {
                    type: `JSXIdentifier`,
                    name: pageComponentName
                  }
                },
                children: [{
                  type: `JSXElement`,
                  openingElement: {
                    type: `JSXOpeningElement`,
                    attributes: [{
                      type: `JSXSpreadAttribute`,
                      argument: {
                        type: `Identifier`,
                        name: `props`
                      }
                    }],
                    name: {
                      type: `JSXIdentifier`,
                      name: `GATSBY_COMPILED_MDX`
                    },
                    selfClosing: true
                  },
                  children: []
                }]
              }
            }]
          }
        }
      });
    });
    if (!hasClassicReactImport) {
      newBody.unshift({
        type: `ImportDeclaration`,
        specifiers: [{
          type: `ImportDefaultSpecifier`,
          local: {
            type: `Identifier`,
            name: `React`
          }
        }],
        source: {
          type: `Literal`,
          value: `react`
        }
      });
    }
    AST.body = newBody;
    buildJsx(AST);
    const transformedSource = generate(AST);
    return transformedSource;
  } catch (error) {
    reporter.panicOnBuild({
      id: _errorUtils.ERROR_CODES.InvalidAcornAST,
      context: {
        resourcePath: this.resourcePath,
        mdxPath
      },
      error
    });
    return ``;
  }
};
var _default = exports.default = gatsbyLayoutLoader;