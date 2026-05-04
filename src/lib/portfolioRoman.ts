const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'] as const;

/** Roman label for portfolio rows (matches services page numerals for I–XII). */
export function portfolioRomanNumeral(index: number): string {
  return ROMAN[index] ?? String(index + 1);
}
