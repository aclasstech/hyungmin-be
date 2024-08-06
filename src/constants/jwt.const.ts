import * as fs from 'fs';
import * as crypto from 'node:crypto';
import * as path from 'node:path';

function checkExistFolder(name: string) {
  const check_path = path.join(__dirname, `../../../${name}`);
  !fs.existsSync(check_path) && fs.mkdir(check_path, (err) => err);
}

function getTokenKeyPair() {
  checkExistFolder('secure');
  const tokenPrivateKeyPath = path.join(
    __dirname,
    `../../../secure/jwt/key.pem`,
  );
  const tokenPublicKeyPath = path.join(
    __dirname,
    `../../../secure/jwt/key.pub`,
  );
  const tokenPrivateKeyExists = fs.existsSync(tokenPrivateKeyPath);
  const tokenPublicKeyExists = fs.existsSync(tokenPublicKeyPath);
  if (!tokenPrivateKeyExists || !tokenPublicKeyExists) {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    fs.writeFileSync(tokenPrivateKeyPath, privateKey);
    fs.writeFileSync(tokenPublicKeyPath, publicKey);
  }

  const tokenPrivateKey = fs.readFileSync(tokenPrivateKeyPath, 'utf-8');
  const tokenPublicKey = fs.readFileSync(tokenPublicKeyPath, 'utf-8');
  return {
    tokenPrivateKey,
    tokenPublicKey,
  };
}

export const {
  tokenPrivateKey: accessTokenPrivateKey,
  tokenPublicKey: accessTokenPublicKey,
} = getTokenKeyPair();

export const {
  tokenPrivateKey: refreshTokenPrivateKey,
  tokenPublicKey: refreshTokenPublicKey,
} = getTokenKeyPair();
