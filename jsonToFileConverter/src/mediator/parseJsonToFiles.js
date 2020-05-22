const fs = require('fs');
const {forEach} = require('lodash');
const requestValidator = require('../validator/requestValidator');
const TextProcessor = require('../processors/TextProcessor');
const ImageProcessor = require('../processors/ImageProcessor');

module.exports = async function(req) {
  if (!requestValidator(req)) {
    throw new Error('Incorrect JSON sent');
  }

  const absolutePath = process.cwd();
  const rootDir = '/outdir';
  const fullOutPath = absolutePath + rootDir;

  const {text, images} = req.body;

  console.log('creating output folder');
  const exists = await fs.existsSync(fullOutPath);

  if (!exists) {
    await fs.mkdirSync(fullOutPath, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  }

  console.log('output directory created');

  console.log('processing text files');
  forEach(text, async file => {
    const processText = new TextProcessor(file.filename, file.content);
    processText.process(fullOutPath);
  });
  console.log('text files processed: ' + text.length);

  console.log('processing images files');
  forEach(images, image => {
    const processImage = new ImageProcessor(image.filename, image.content);
    processImage.process(fullOutPath);
  })
  console.log('image files processed: ' + images.length);

  console.log('finished processing');

  return {success: true}
}
