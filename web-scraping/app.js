const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const writeStream = fs.createWriteStream('outcome.log', {flags: 'a'});

const url = 'https://www.currys.co.uk/gbuk/oculus-tv-and-home-entertainment/gaming/virtual-reality/430_4538_32216_6323_xx/xx-criteria.html';

const wantedItem = 'quest vr gaming headset - 64 gb';
const maxPrice = 400;

axios.get(url)
    .then((response) => response.data)
    .then((data) => {
        const $ = cheerio.load(data);
        const products = $('article.product');
        console.log(`found ${products.length} products`);
        products.each((i, product) => {
            const title = $(product).find('span[data-product="name"]').text();

            if (title.toLowerCase() !== wantedItem) {
                return;
            }

            console.log('match found');

            const price = parseInt($(product).find('.amounts').text().trim().substring(1));
            const inStock = $(product).find('.email-when-back').length === 0;

            if (!inStock) {
                writeStream.write('Not in stock!\n');

                return false;
            }

            if (price > maxPrice) {
                writeStream.write('In stock but costs too much!');

                return false;
            }

            writeStream.write(`ITEM FOUND: ${price}`);
        });
        
        console.log('scraping done...');
    })
    .catch((err) => console.error(err));
