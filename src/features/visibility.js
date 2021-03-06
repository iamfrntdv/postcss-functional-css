
const camelCase = require('lodash.camelcase');
const generateNodes = require('../utils/generate-nodes');
const values = require('./visibility-rules');

module.exports = (node, config, prefix) => {
  if (config.features.visibility) {
    const rules = [];
    const classNamePrefix = prefix || '';

    values.forEach(item => {
      let selector;

      if (config.cssModules) {
        selector = camelCase(`${classNamePrefix}-${item.selector}`);
      } else {
        selector = `${classNamePrefix}${item.selector}`;
      }

      const rule = {
        selector: `.${selector}`,
        decls: item.decls
      };

      rules.push(rule);
    });

    const nodes = generateNodes(rules);
    node.append(nodes);
  }
};
