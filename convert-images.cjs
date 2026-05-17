const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, 'src', 'assets');

const imagesToConvert = [
  { name: '01.png', output: '01.webp', quality: 70 },
  { name: '02.png', output: '02.webp', quality: 70 },
  { name: '03.png', output: '03.webp', quality: 70 },
  { name: '04.png', output: '04.webp', quality: 65 }, // High compression for the largest background slide
];

const logosToConvert = [
  { name: 'logo-bioforte.png', output: 'logo-bioforte.webp', width: 200, height: 50 },
  { name: 'logo-bioforte-white.png', output: 'logo-bioforte-white.webp', width: 200, height: 50 }
];

async function convertImages() {
  console.log('--- Iniciando conversão de imagens para WebP ---');
  
  // Convert slides/banners (highly optimized landscape resolution)
  for (const img of imagesToConvert) {
    const inputPath = path.join(assetsDir, img.name);
    const outputPath = path.join(assetsDir, img.output);
    
    if (fs.existsSync(inputPath)) {
      console.log(`Convertendo e redimensionando ${img.name}...`);
      try {
        // Delete old output file if exists to prevent lock errors
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }

        await sharp(inputPath)
          .resize({
            width: 1200,
            height: 675,
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: img.quality })
          .toFile(outputPath);
        
        const oldSize = fs.statSync(inputPath).size / 1024;
        const newSize = fs.statSync(outputPath).size / 1024;
        console.log(`✓ ${img.name} convertido com sucesso!`);
        console.log(`  Tamanho anterior: ${oldSize.toFixed(2)} KB`);
        console.log(`  Novo tamanho: ${newSize.toFixed(2)} KB (Redução de ${((1 - newSize/oldSize) * 100).toFixed(1)}%)`);
      } catch (err) {
        console.error(`Erro ao converter ${img.name}:`, err);
      }
    } else {
      console.warn(`[Aviso] Arquivo não encontrado: ${inputPath}`);
    }
  }

  // Convert and resize logos
  for (const logo of logosToConvert) {
    const inputPath = path.join(assetsDir, logo.name);
    const outputPath = path.join(assetsDir, logo.output);
    
    if (fs.existsSync(inputPath)) {
      console.log(`Redimensionando e convertendo ${logo.name}...`);
      try {
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }

        await sharp(inputPath)
          .resize({
            width: logo.width,
            height: logo.height,
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 } // transparent background
          })
          .webp({ quality: 75 })
          .toFile(outputPath);
        
        const oldSize = fs.statSync(inputPath).size / 1024;
        const newSize = fs.statSync(outputPath).size / 1024;
        console.log(`✓ ${logo.name} redimensionado com sucesso!`);
        console.log(`  Tamanho anterior: ${oldSize.toFixed(2)} KB`);
        console.log(`  Novo tamanho: ${newSize.toFixed(2)} KB`);
      } catch (err) {
        console.error(`Erro ao processar logo ${logo.name}:`, err);
      }
    } else {
      console.warn(`[Aviso] Logo não encontrado: ${inputPath}`);
    }
  }

  console.log('--- Conversão concluída! ---');
}

convertImages();
