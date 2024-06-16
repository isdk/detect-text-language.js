import { detectTextLanguage, detectTextLangEx } from './detect-text-lang-eld'

describe('detectTextLang', async () => {
  it('should detect French', async () => {
    expect(await detectTextLanguage('Bonjour le monde!')).toBe('French');
  });

  it('should detect Chinese', async () => {
    expect(await detectTextLanguage('你好世界!')).toBe('Chinese');
    expect(detectTextLanguage('你好世界!', {isoCode: true})).toBe('zh');
  });

  it('should detect English', async () => {
    expect(await detectTextLanguage('in the world')).toBe('English');
  });

  it('should return ISO code when specified', async () => {
    expect(await detectTextLanguage(`C'est bonjour.`, { isoCode: true })).toBe('fr');
  });

  it('should handle unknown languages', async () => {
    expect(await detectTextLanguage('🤔🧐🤔🧐')).toBeUndefined();
  });

  it('should use default minimum length', async () => {
    const text = 'He';
    const result = await detectTextLanguage(text);
    expect(result).toBeUndefined();
  });

  it('should use custom minimum length', async () => {
    const text = 'She is smiling.';
    const result = await detectTextLanguage(text);
    expect(result).toBe('English');
  });
});

describe('detectTextLangEx', () => {
  it('should detect English text with complete details', async () => {
    const englishResult = detectTextLangEx('This is an English text.');

    expect(englishResult).toEqual(
      expect.objectContaining({
        iso6391: 'en',
        iso3166: 'US',
        name: 'English',
        country: 'United States',
      })
    );
  });

  it('should detect Chinese text with complete details', async () => {
    const chineseResult = detectTextLangEx('这是一段中文文本.');

    expect(chineseResult).toEqual(
      expect.objectContaining({
        iso6391: 'zh', iso3166: 'CN', country: 'China', name: 'Chinese',
      })
    );
  });

  it('should detect French text with complete details', async () => {
    const frenchResult = detectTextLangEx('Ceci est un texte français.');

    expect(frenchResult).toEqual(
      expect.objectContaining({
        iso6391: 'fr', iso3166: 'FR', country: 'France', name: 'French'
      })
    );
  });

  it('should detect German text with complete details', async () => {
    const result = detectTextLangEx('Das Wetter ist heute schön.');
    console.log('🚀 ~ it.only ~ Result:', result)

    expect(result).toEqual(
      expect.objectContaining({
        iso6391: 'de', iso3166: 'DE', country: 'Germany', name: 'German'
      })
    );
  });
});