const fs = require('fs');
const axios = require('axios');
const path = require('path');
const archiver = require('archiver');

// Download file from url
const downloadFile = async (fileUrl, outputPath) => {
  const writer = fs.createWriteStream(outputPath);
  const response = await axios({
    url: fileUrl,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

// Download files from urls
const downloadFiles = async (fileUrls, publicDir) => {
  for (const fileUrl of fileUrls) {
    let fileName = path.basename(fileUrl);
    // Remove the unwanted part of the filename
    fileName = fileName.split('_')[0] + path.extname(fileName);
    const outputPath = path.join(publicDir, fileName);
    await downloadFile(fileUrl, outputPath);
  }
};

// Create public directory for download files
const createPublicDirectory = (subDir) => {
  const publicDir = path.join(__dirname, '..', '..', 'public', subDir);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  return publicDir;
};

// Cleanup public folder
const cleanupPublicFolder = (publicDir) => {
  fs.readdirSync(publicDir).forEach((file) => {
    fs.unlinkSync(path.join(publicDir, file));
  });
};

// Zip files
const addFilesToArchive = (publicDir, archive, nameFileZip) => {
  fs.readdirSync(publicDir).forEach((file) => {
    if (file === nameFileZip) return;
    const filePath = path.join(publicDir, file);
    if (fs.lstatSync(filePath).isFile()) {
      archive.file(filePath, { name: file });
    }
  });
};

// Zip files
const zipFiles = async (publicDir, subDir, nameFileZip) => {
  const zipPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    subDir,
    nameFileZip,
  );
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => resolve(zipPath));
    archive.on('error', (err) => reject(err));

    archive.pipe(output);
    addFilesToArchive(publicDir, archive, nameFileZip);
    archive.finalize();
  });
};

const createFileJson = (data, fileName, publicDir) => {
  const filePath = path.join(publicDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = {
  downloadFile,
  downloadFiles,
  zipFiles,
  createPublicDirectory,
  cleanupPublicFolder,
  createFileJson,
};
