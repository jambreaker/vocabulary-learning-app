const ADMIN_SESSION_COOKIE = "vla_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 Stunden

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// Konstante Laufzeit, um Signaturvergleiche nicht per Kurzschluss verräterisch zu machen.
function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function getSigningKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET ist nicht gesetzt.");
  }
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function sign(payload: string): Promise<string> {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return bufferToHex(signature);
}

export async function buildSessionCookieValue(): Promise<{
  value: string;
  expiresAt: Date;
}> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `admin:${expiresAt}`;
  const signature = await sign(payload);
  return { value: `${payload}.${signature}`, expiresAt: new Date(expiresAt) };
}

export async function isSessionCookieValid(
  value: string | undefined | null
): Promise<boolean> {
  if (!value) return false;
  const separatorIndex = value.lastIndexOf(".");
  if (separatorIndex === -1) return false;

  const payload = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  const expectedSignature = await sign(payload);
  if (!timingSafeEqualHex(signature, expectedSignature)) return false;

  const [marker, expiresAtRaw] = payload.split(":");
  if (marker !== "admin") return false;
  const expiresAt = Number(expiresAtRaw);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

export function verifyAdminCredentials(
  username: string,
  password: string
): boolean {
  const expectedUsername = process.env.ADMIN_USERNAME ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedUsername || !expectedPassword) return false;
  return username === expectedUsername && password === expectedPassword;
}

export const ADMIN_SESSION_COOKIE_NAME = ADMIN_SESSION_COOKIE;
export const ADMIN_SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
