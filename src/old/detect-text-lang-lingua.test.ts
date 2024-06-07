import { detectTextLanguage } from './detect-text-lang-lingua'

describe('detectTextLang', async () => {
  it('should detect French', async () => {
    expect(await detectTextLanguage('Bonjour le monde!')).toBe('French');
  });

  it('should detect Chinese', async () => {
    expect(await detectTextLanguage('你好世界!')).toBe('Chinese');
    expect(detectTextLanguage('你好世界!', {isoCode: true})).toBe('zho');
  });

  it('should detect English', async () => {
    expect(await detectTextLanguage('Hello world')).toBe('English');
  });

  it('should return ISO code when specified', async () => {
    expect(await detectTextLanguage(`C'est bonjour.`, { isoCode: true })).toBe('fra');
  });

  it('should handle unknown languages', async () => {
    expect(await detectTextLanguage('🤔🧐🤔🧐')).toBeUndefined();
  });

  it('should use default minimum length', async () => {
    const text = 'He';
    const result = await detectTextLanguage(text);
    expect(result).toBe('English');
  });

  it('should use custom minimum length', async () => {
    const text = 'She is smiling.';
    const result = await detectTextLanguage(text);
    expect(result).toBe('English');
  });
});
