// "$29.99" -> 29.99, "Tax: $2.40" -> 2.4
// Keeps only the digits and the dot
export function parsePrice(text: string) {
  return Number(text.replace(/[^0-9.]/g, ''));
}

// Avoids floating point noise like 0.1 + 0.2
export function roundMoney(amount: number) {
  return Math.round(amount * 100) / 100;
}
