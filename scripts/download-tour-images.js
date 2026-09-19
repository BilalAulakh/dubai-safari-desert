const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '../public/images/tours');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  'buy-1-get-1-free-safari.webp',
  'evening-desert-safari-dubai.webp',
  'vip-evening-desert-safari-dubai.webp',
  'evening-desert-safari-with-quad-bike.webp',
  'vip-desert-safari-dubai-with-quad-bike.webp',
  'private-evening-desert-safari-dubai.webp',
  'vip-private-desert-safari-dubai.webp',
  'morning-desert-safari-dubai.webp',
  'private-morning-desert-safari-dubai.webp',
  'over-night-desert-safari-dubai.webp',
  'half-day-desert-safari-dubai.webp',
  'atv-quad-bike-ride-dubai-1-person.webp',
  'atv-quad-bike-ride-dubai-2-persons.webp',
  'rzr-1000cc-1-seater-buggy.webp',
  '2-seater-buggy.webp',
  'rzr-1000cc-2-seater-buggy.webp',
  'can-am-3x-marvick-2-seater-buggy.webp',
  'can-am-3x-marvick-4-seater-buggy.webp'
];

const baseUrl = 'https://dubai-heritage.com/assets/images/tour-cards/';

function downloadImage(fileName) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, fileName);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Skipping already downloaded: ${fileName}`);
      return resolve(true);
    }
    const file = fs.createWriteStream(dest);
    const url = baseUrl + fileName;

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`Successfully downloaded: ${fileName}`);
            resolve(true);
          });
        });
      } else {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        console.error(`Failed ${fileName}: status ${response.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      console.error(`Error downloading ${fileName}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Starting download of ${images.length} tour images...`);
  for (const img of images) {
    await downloadImage(img);
  }
  console.log('All image downloads completed.');
}

run();
