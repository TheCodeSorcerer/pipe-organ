

//
const KEY_SPACE = 32;
const KEY_ESCAPE = 27;

const KEY_LETTERS = {
  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90
};

const KEY_NUMBERS = {
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57
};

const KEY_SYMBOLS = {
  ';': 186,
  '[': 219,
  ']': 221,
}

const KEYS_ALL = {
  ...KEY_LETTERS,
  ...KEY_NUMBERS,
  ...KEY_SYMBOLS,
}

const KEY_HOMEROW = [
  KEYS_ALL['a'],
  KEYS_ALL['s'],
  KEYS_ALL['d'],
  KEYS_ALL['f'],
  KEYS_ALL['g'],
  KEYS_ALL['h'],
  KEYS_ALL['j'],
  KEYS_ALL['k'],
  KEYS_ALL['l'],
  KEYS_ALL[';'],
]

const KEY_TOPROW = [
  KEYS_ALL['q'],
  KEYS_ALL['w'],
  KEYS_ALL['e'],
  KEYS_ALL['r'],
  KEYS_ALL['t'],
  KEYS_ALL['y'],
  KEYS_ALL['u'],
  KEYS_ALL['i'],
  KEYS_ALL['o'],
  KEYS_ALL['p'],
  KEYS_ALL['['],
  KEYS_ALL[']'],
]

const KEYS_NUMROW = [
  KEYS_ALL['1'],
  KEYS_ALL['2'],
  KEYS_ALL['3'],
  KEYS_ALL['4'],
  KEYS_ALL['5'],
  KEYS_ALL['6'],
  KEYS_ALL['7'],
  KEYS_ALL['8'],
  KEYS_ALL['9'],
  KEYS_ALL['0'],
]

