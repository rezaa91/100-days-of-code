const fs = require('fs');

function TextProcessor(filename, content) {
  this.filename = filename;
  this.content = content;
}

TextProcessor.prototype.process = async function(rootDir) {
  await fs.writeFileSync(`${rootDir}/${this.filename}`, this.content);
}

module.exports = TextProcessor;
