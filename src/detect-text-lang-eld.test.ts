import { detectTextLanguage } from './detect-text-lang-eld'

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
