const decodeWAV = (rawWav) => {
  if (typeof rawWav === 'string') {
    // eslint-disable-next-line no-param-reassign
    rawWav = Buffer.from(rawWav, 'binary');
  }
  if (!Buffer.isBuffer(rawWav)) {
    throw new TypeError('pcm data must be Buffer or string');
  }
  // eslint-disable-next-line no-param-reassign
  rawWav = rawWav.subarray(44);
  return rawWav;
};

const toArrayBuffer = (buffer) => {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
};

const toBuffer = (arrayBuffer) => {
  const buffer = Buffer.alloc(arrayBuffer.byteLength);
  const view = new Uint8Array(arrayBuffer);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
};

export { decodeWAV, toArrayBuffer, toBuffer };
