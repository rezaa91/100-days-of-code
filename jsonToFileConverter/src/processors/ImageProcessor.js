const fs = require('fs');

function ImageProcessor(filename, content) {
  this.filename = filename;
  this.content = content;
}

ImageProcessor.prototype.decode = function() {
  return this.content.replace(/^data:image\/png;base64,/, "");
}

ImageProcessor.prototype.process = async function(rootDir) {
  await fs.writeFileSync(`${rootDir}/${this.filename}`, this.decode(), 'base64');
}

module.exports = ImageProcessor;
