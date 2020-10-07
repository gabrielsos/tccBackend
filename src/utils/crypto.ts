import crypto from 'crypto';

export default function randomDigits(): string {
  const password = crypto.randomBytes(8).toString('hex');

  return password;
}
