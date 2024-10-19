[**@isdk/detect-text-language**](../README.md) • **Docs**

***

[@isdk/detect-text-language](../globals.md) / detectTextLangEx

# Function: detectTextLangEx()

> **detectTextLangEx**(`text`, `options`?): `undefined` \| `object`

Detects the language of the provided text and returns the language code along with additional information.

## Parameters

• **text**: `string`

The string of text to be detected.

• **options?**: [`IDetectLanguageOptions`](../interfaces/IDetectLanguageOptions.md)

## Returns

`undefined` \| `object`

An object containing the ISO 639-1 code of the language, and optionally, the ISO 3166 country code, country name, and language name.
         Returns undefined if the language cannot be reliably detected.

## Defined in

[detect-text-lang-eld.ts:67](https://github.com/isdk/detect-text-language.js/blob/55c5de458aba5390ac483a68576a169ee5b00681/src/detect-text-lang-eld.ts#L67)
