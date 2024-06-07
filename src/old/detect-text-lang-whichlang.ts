import { detectLanguage } from 'whichlang-wasm'

/**
 * Detects the language of a given text using the franc library.
 *
 * Returns the language name if `options.isoCode` is falsy, otherwise returns the ISO 639-3 code.
 * Returns `undefined` if no language is identified.
 *
 * @param text - The text to analyze for its language.
 * @param options - Configuration options, including a minimum text length and a flag for returning ISO codes.
 * @param options.minLength - The minimum length of text required for detection (default: 2).
 * @param options.isoCode - If truthy, returns the ISO 639-3 code instead of the language name (default: falsy).
 * @returns - The language name or ISO 639-3 code if detected, or `undefined` if not recognized.
 *
 * @example
 * ```typescript
 * // Detect language with default options
 * const detectedLanguage = detectTextLang("Bonjour le monde!");
 * console.log(detectedLanguage); // "French"
 *
 * // Return ISO 639-3 code
 * const detectedISOCode = detectTextLang("Bonjour le monde!", { isoCode: true });
 * console.log(detectedISOCode); // "fra"
 *
 * // Specify a minimum text length
 * const shortText = "Hi";
 * const detectedWithMinLength = detectTextLang(shortText, { minLength: 3 });
 * console.log(detectedWithMinLength); // undefined
 * ```
 */
export async function detectTextLang(text: string, options: {minLength?: number, isoCode?: boolean} = {}) {
  const result = detectLanguage(text)
  return result
}

