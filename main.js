const fs = require('fs');

const measures = 500

const getPermutations = (permutations => beats =>
  Array(beats * measures)
    .fill()
    .map(() => permutations[Math.floor(Math.random() * 16)]))([
  '1111',
  '1110',
  '1100',
  '1000',
  '1001',
  '1011',
  '1010',
  '1101',
  '0111',
  '0110',
  '0100',
  '0011',
  '0101',
  '0010',
  '0001',
  '0000',
]);

const replaceNotes = permutations =>
  permutations
    .join('')
    .split('')
    .join(' ')
    .replace(/1/g, 'e16')
    .replace(/0/g, 'r16');

const buildScore = (tempo, beats, staffString) =>
  `\\score {` +
  `\n  \\new Staff <<` +
  `\n    \\new Voice \\relative c' {` +
  `\n      \\tempo 4 = ${tempo} ` +
  `\n      \\time ${beats}/4` +
  `\n      ${staffString}` +
  `\n    }` +
  `\n  >>` +
  `\n  \\layout { }` +
  `\n  \\midi { }` +
  `\n}`;

const main = () => {
  const beats = 4;
  const tempo = 133;
  const permutations = getPermutations(beats);
  const staffString = replaceNotes(permutations);
  const score = buildScore(tempo, beats, staffString);
  fs.writeFileSync('./score.ly', score);
};

main();
