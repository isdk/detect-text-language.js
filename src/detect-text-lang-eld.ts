import { eld } from 'eld'
import {iso6393} from 'iso-639-3'
import { CountryCodes, CountryNames } from './country-codes'

const _CountryCodes = Object.fromEntries(Object.entries(CountryCodes).map(([key, value]) => [key, value.split(',')[0]]))

let isSubset = false

export interface IDetectLanguageOptions {
  isoCode?: boolean
  langSubset?: string[]
  // the score threshold for the detected language
  threshold?: number
}

function dynamicLangSubset(langSubset?: string[]) {
  if (langSubset?.length) {
    isSubset = true
    eld.dynamicLangSubset(langSubset)
  } else if (isSubset) {
    isSubset = false
    eld.dynamicLangSubset(false)
  }
}

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
export function detectTextLanguage(text: string, options: IDetectLanguageOptions = {}) {
  dynamicLangSubset(options.langSubset)
  const result = eld.detect(text);
  if (result.isReliable()) {
    const threshold = options.threshold ?? 0.1
    const scores = result.getScores()
    const lang: string = result.language
    if (scores[lang] >= threshold) {
      if (!options.isoCode) {
        return getLanguageFromIso6391(lang)
      }
      return lang
    }
  }
}

/**
 * Detects the language of the provided text and returns the language code along with additional information.
 *
 * @param text The string of text to be detected.
 * @returns An object containing the ISO 639-1 code of the language, and optionally, the ISO 3166 country code, country name, and language name.
 *          Returns undefined if the language cannot be reliably detected.
 */
export function detectTextLangEx(text: string, options?: IDetectLanguageOptions) {
  dynamicLangSubset(options?.langSubset)
  let result: { iso6391: string, iso3166?: string, name?: string, country?: string, scores?: {[langCode: string]: number} } | undefined
  const langInfo = eld.detect(text)
  if (langInfo.isReliable()) {
    const threshold = options?.threshold ?? 0.1
    const scores = langInfo.getScores()
    const iso6391 = langInfo.language
    if (scores[iso6391] >= threshold) {
      result = { iso6391, scores: langInfo.getScores() }
      const countryCode = getCountryCodeFromLang(iso6391)
      if (countryCode) {
        result.iso3166 = countryCode
        const countryName = CountryNames[countryCode]
        result.country = countryName
      }
      const info = iso6393.find(i => i.iso6391 === iso6391)
      if (info?.name) {
        result.name = info.name
      }
    }
  }
  return result
}

export function getCountryCodeFromLang(iso6391: string) {
  // _countryCodes the key is iso3166 Country Code, the value is the the iso6391 code
  for (const [key, value] of Object.entries(_CountryCodes)) {
    if (value === iso6391 || value.startsWith(iso6391+'-')) {
      return key
    }
  }
}

export function getLanguageFromIso6391(iso6391: string) {
  const info = iso6393.find(i => i.iso6391 === iso6391)
  return info?.name
}
