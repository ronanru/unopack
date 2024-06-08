#!/usr/bin/env -S bun run
// Generate standard galactic translation from english
import en from '@/locale/en';

const charMap = {
  a: 'ᔑ',
  b: 'ʖ',
  c: 'ᓵ',
  d: '↸',
  e: 'ᒷ',
  f: '⎓',
  g: '⊣',
  h: '⍑',
  i: '╎',
  j: '⋮',
  k: 'ꖌ',
  l: 'ꖎ',
  m: 'ᒲ',
  n: 'リ',
  o: '𝙹',
  p: '!¡',
  q: 'ᑑ',
  r: '∷',
  s: 'ᓭ',
  t: 'ℸ ̣',
  u: '⚍',
  v: '⍊',
  w: '∴',
  x: '̇/',
  y: '||',
  z: '⨅',
  ' ': ' ',
} as Record<string, string>;

const translate = (obj: any): any => {
  if (typeof obj === 'string')
    return obj
      .toLowerCase()
      .split('')
      .map((char) => charMap[char] || '')
      .join('');
  if (Array.isArray(obj)) return obj.map((item) => translate(item));
  for (const key in obj) {
    obj[key] = translate(obj[key]);
  }
  return obj;
};

//@ts-ignore
await Bun.write(
  'src/locale/standardgalactic.ts',
  `import type { Translation } from './en';
  
export default ${JSON.stringify(translate(en), null, 2)} satisfies Translation;
`
);

console.log('Generated standardgalactic.ts');
