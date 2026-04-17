import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SCRYPT_PREFIX = "scrypt";

function safeCompareText(input: string, stored: string): boolean {
  const inputBuffer = Buffer.from(input);
  const storedBuffer = Buffer.from(stored);
  if (inputBuffer.length !== storedBuffer.length) {
    return false;
  }
  return timingSafeEqual(inputBuffer, storedBuffer);
}

function parseHashedSecret(stored: string) {
  const [scheme, saltHex, hashHex] = stored.split("$");
  if (scheme !== SCRYPT_PREFIX || !saltHex || !hashHex) {
    return null;
  }
  return {
    salt: Buffer.from(saltHex, "hex"),
    hash: Buffer.from(hashHex, "hex"),
  };
}

function hashSecret(secret: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(secret, salt, 64);
  return `${SCRYPT_PREFIX}$${salt.toString("hex")}$${hash.toString("hex")}`;
}

function verifySecret(input: string, stored: string): boolean {
  if (!stored) {
    return false;
  }

  const parsed = parseHashedSecret(stored);
  if (!parsed) {
    return safeCompareText(input, stored);
  }

  const computed = scryptSync(input, parsed.salt, parsed.hash.length);
  return timingSafeEqual(computed, parsed.hash);
}

export function hashPassword(password: string): string {
  return hashSecret(password.trim());
}

export function hashPin(pin: string): string {
  return hashSecret(pin.trim());
}

export function verifyPassword(input: string, stored: string): boolean {
  return verifySecret(input.trim(), stored.trim());
}

export function verifyPin(input: string, stored: string): boolean {
  return verifySecret(input.trim(), stored.trim());
}

export function isLegacySecret(stored?: string | null): boolean {
  return !!stored && !stored.startsWith(`${SCRYPT_PREFIX}$`);
}
