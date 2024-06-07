import {iso6393} from 'iso-639-3'
import { LanguageDetector, LanguageDetectorBuilder } from '@isdk/lingua'

const detectorForAllLanguages: LanguageDetector =LanguageDetectorBuilder
  .fromAllLanguages()
  // .withLowAccuracyMode()
  .withPreloadedLanguageModels()
  .build();

/**
 * detects the language of the given text.
 *
 * This function employs a language detection algorithm to identify the language of the input text. If the `isoCode` option is provided,
 * it attempts to match the detected language to the ISO 639-3 standard code.
 *
 * @param text The text whose language is to be detected.
 * @param options Additional options, such as requesting an ISO code match.
 * @param options.isoCode - If truthy, returns the ISO 639-3 code instead of the language name (default: falsy).
 * @returns The detected language name or ISO 639-3 code. If the `isoCode` option was specified and a match was found, returns the ISO 639-3 code;
 * otherwise, returns the raw result from the language detector, return undefined if no detector.
 *
 * @example
 * ```typescript
 * await detectTextLanguage("Hello, world!", { isoCode: true });
 * // Returns 'eng' assuming the detector recognizes English and ISO code option is used.
 * ```
 */
export function detectTextLanguage(text: string, options: {isoCode?: boolean}= {}) {
  const result = detectorForAllLanguages.detectLanguageOf(text);
  if (result && options.isoCode) {
    const info = iso6393.find(i => i.name.toLowerCase() === result.toLowerCase())
    return info?.iso6393
  }
  return result
}

export function freeLanguagesDetector() {
  detectorForAllLanguages.free()
}

