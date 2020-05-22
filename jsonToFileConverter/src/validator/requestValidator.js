const {get, forEach} = require('lodash');

const requiredProperties = ['text', 'images'];

module.exports = function(req) {
  let validated = true;
  const {body} = req;

  forEach(requiredProperties, property => {
    if (!get(body, property)) {
      validated = false;
    }
  });

  return validated;
}
