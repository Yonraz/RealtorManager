const characters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?";

export function getSecretKey() {
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + characters[x % characters.length], "");
}
