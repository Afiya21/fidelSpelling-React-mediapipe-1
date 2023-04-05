import amharicWords from './amharicwords';

async function getLanguageWords(lang, mode, levelIndex) {
  if (lang == 'en') {
    if (mode == 'learn') {
      const { default: words } = await import(
        `../data/english/level-${levelIndex}.ts`
      );
      return words;
    } else {
      const { default: words } = await import(
        `../data/english/level-${4}.ts` // get level 4
      );
      return words;
    }
  } else {
    if (mode == 'learn') {
      const { default: words } = await import(
        `../data/Amharic/level-${levelIndex}.ts`
      );
      return words;
    } else {
      const { default: words } = await import(
        `../data/Amharic/level-${4}.ts` // get level 4
      );
      return words;
    }
  }
}

export default getLanguageWords;
