import { eld } from 'eld'
import {iso6393} from 'iso-639-3'


/**
 * detects the language of the given text.
 *
 * This function employs a language detection algorithm to identify the language of the input text. If the `isoCode` option is provided,
 * it attempts to match the detected language to the ISO 639-3 standard code.
 *
 * @param text The text whose language is to be detected.
 * @param options Additional options, such as requesting an ISO code match.
 * @param options.isoCode - If truthy, returns the ISO 639-1 code instead of the language name (default: falsy).
 * @returns The detected language name or ISO 639-1 code. If the `isoCode` option was specified and a match was found, returns the ISO 639-1 code;
 * otherwise, returns the raw result from the language detector, return undefined if no detector.
 *
 * @example
* ```typescript
* await detectTextLanguage("in the world!", { isoCode: true });
* // Returns 'en' assuming the detector recognizes English and ISO code option is used.
* ```
*/
export function detectTextLanguage(text: string, options: {isoCode?: boolean}= {}) {
  const result = eld.detect(text);
  // console.log('🚀 ~ detectTextLanguage ~ result:', text,result.isReliable(), result.getScores())
  if (result.isReliable()) {
    const lang = result.language
    if (!options.isoCode) {
      const info = iso6393.find(i => i.iso6391 === lang)
      return info?.name
    }
    return lang
  }
}
