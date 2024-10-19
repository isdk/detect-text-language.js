[**@isdk/detect-text-language**](../README.md) • **Docs**

***

[@isdk/detect-text-language](../globals.md) / detectTextLanguage

# Function: detectTextLanguage()

> **detectTextLanguage**(`text`, `options`): `undefined` \| `string`

detects the language of the given text.

This function employs a language detection algorithm to identify the language of the input text. If the `isoCode` option is provided,
it attempts to match the detected language to the ISO 639-3 standard code.

## Parameters

• **text**: `string`

The text whose language is to be detected.

• **options**: [`IDetectLanguageOptions`](../interfaces/IDetectLanguageOptions.md) = `{}`

Additional options, such as requesting an ISO code match.

## Returns

`undefined` \| `string`

The detected language name or ISO 639-1 code. If the `isoCode` option was specified and a match was found, returns the ISO 639-1 code;
otherwise, returns the raw result from the language detector, return undefined if no detector.

## Example

```typescript
await detectTextLanguage("in the world!", { isoCode: true });
// Returns 'en' assuming the detector recognizes English and ISO code option is used.
```

## Defined in

[detect-text-lang-eld.ts:44](https://github.com/isdk/detect-text-language.js/blob/55c5de458aba5390ac483a68576a169ee5b00681/src/detect-text-lang-eld.ts#L44)
