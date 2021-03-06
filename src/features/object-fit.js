
const camelCase = require('lodash.camelcase');
const generateNodes = require('../utils/generate-nodes');
const values = require('./object-fit-rules');

module.exports = (node, config, prefix) => {
  if (config.features.objectFit) {
    const rules = [];
    const classNamePrefix = prefix || '';
    let className;

    if (config.features.objectFit.className === '') {
      className = '';
    } else if (config.features.objectFit.className) {
      className = config.features.objectFit.className + '-';
    } else {
      className = 'object-fit-'
    }

    values.forEach(item => {
      let selector;

      if (config.cssModules) {
        selector = camelCase(`${classNamePrefix}-${item.selector}`);
      } else {
        selector = `${classNamePrefix}${className}${item.selector}`;
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
