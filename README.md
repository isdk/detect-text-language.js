# ISDK: Detect Text Language

ISDK(Intelligent System Development Kit): An AI development kit for developers.

A text language detection library that supports returning language names, ISO 639-1/639-3 codes, and associated country information.

---

## Features

- 🌐 **Multi-language Detection**: Identify the language type of the text.
- 🏷️ **ISO Code Support**: Return ISO 639-1/639-3 standard language codes.
- 🌍 **Country Information Association**: Automatically match corresponding country codes (ISO 3166) and country names.
- 🛠️ **Flexible Configuration**: Support setting language subsets and confidence thresholds.

---

## Installation

```bash
npm install @isdk/detect-text-language
```

## Basic Usage

### Detect Language Name or ISO Code

```typescript
import { detectTextLanguage } from '@isdk/detect-text-language';

// Detect language name
const text = "Hola, ¿cómo estás?";
const languageName = await detectTextLanguage(text);
console.log(languageName); // Output: "Spanish"

// Detect ISO 639-1 code
const isoCode = await detectTextLanguage(text, { isoCode: true });
console.log(isoCode); // Output: "es"
```

### Get Full Language Information

```typescript
import { detectTextLangEx } from '@isdk/detect-text-language';

const result = detectTextLangEx("Bonjour le monde!");
console.log(result);
/* Output:
{
  iso6391: 'fr',
  name: 'French',
  iso3166: 'FR',
  country: 'France',
  scores: { ... }
}
*/
```

## Configuration Options

```typescript
interface IDetectLanguageOptions {
  isoCode?: boolean;          // Whether to return ISO 639-1 code (default returns name)
  langSubset?: string[];      // Restrict the range of languages to detect (array of ISO 639-1 codes)
  threshold?: number;         // Confidence threshold (default 0.1)
}
```

## Advanced Use Cases

Restrict Language Detection Range

```typescript
// Only detect Chinese or English
const options = { langSubset: ['zh', 'en'] };
const result = detectTextLanguage("你好，世界！", options);
```

## API Documentation

* detectTextLanguage(text: string, options?: IDetectLanguageOptions)
  * Returns language name or ISO code (depending on isoCode option)
  * Returns undefined when confidence is below the threshold or detection fails
* detectTextLangEx(text: string, options?: IDetectLanguageOptions)
  * Returns an object containing the following information:

  ```ts
  {
    iso6391: string;          // ISO 639-1 code
    name?: string;            // Full language name
    iso3166?: string;         // Main country code (ISO 3166)
    country?: string;         // Country name
    scores?: Record<string, number>; // Confidence scores for each language
  }
  ```

## Contribution Guide

1. Fork the repository
1. Create a feature branch (git checkout -b feature/YourFeature)
1. Commit your changes (git commit -m 'Add some amazing feature')
1. Push to the branch (git push origin feature/YourFeature)
1. Open a Pull Request

## License

MIT License © 2024-2025 [Riceball LEE(ISDK)]
