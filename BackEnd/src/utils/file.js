const fs = require('fs');
const path = require('path');

const readFile = (filePath) => {
  try {
    const result = fs.readFileSync(filePath);
    return result;
  } catch (e) {
    logger.error(`Get file failed at ${filePath}: `, { stack: e.stack });
    return null;
  }
};

const mkDirByPathSync = (targetDir, opts) => {
  const isRelativeToScript = opts && opts.isRelativeToScript;
  const { sep } = path;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    return curDir;
  }, initDir);
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err)
      logger.error(`Can't delete file ${filePath}`, {
        stack: err.stack,
        ctx: 'DeleteFile',
      });
  });
};

module.exports = { readFile, mkDirByPathSync, deleteFile };
