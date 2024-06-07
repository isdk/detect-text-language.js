import { detectTextLang } from './detect-text-lang-franc'

describe('detectTextLang', async () => {
  it('should detect French', async () => {
    expect(await detectTextLang('Bonjour le monde!')).toBe('French');
  });

  it('should detect English', async () => {
    expect(await detectTextLang('Hello world')).toBe('English');
  });

  it('should return undefined for short text', async () => {
    expect(await detectTextLang('H')).toBeUndefined();
  });

  it('should return ISO code when specified', async () => {
    expect(await detectTextLang(`C'est bonjour.`, { isoCode: true })).toBe('fra');
  });

  it('should handle unknown languages', async () => {
    expect(await detectTextLang('🤔🧐🤔🧐')).toBeUndefined();
  });

  it('should use default minimum length', async () => {
    const text = 'He';
    const result = await detectTextLang(text);
    expect(result).toBe('English');
  });

  it('should use custom minimum length', async () => {
    const text = 'She is smile.';
    const result = await detectTextLang(text, { minLength: 3 });
    expect(result).toBe('English');
  });
});
