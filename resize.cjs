const sharp = require('sharp');
const fs = require('fs');

sharp('src/assets/perfil_alice_chat.png')
  .resize(128, 128)
  .webp({ quality: 80 })
  .toFile('src/assets/perfil_alice_chat.webp')
  .then(() => {
    console.log('Image successfully resized and converted to webp.');
  })
  .catch(err => {
    console.error('Error processing image:', err);
  });
