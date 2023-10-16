const LILAC = '#c8b9e4';
const PURPLE = '#805dc0';
const WHITE = '#ffffff';
const GRAPE = '#53227d';
const BLACK = '#080808'

const common = {
 PRIMARY: PURPLE,
};

const light = {
 ...common,
 BACKGROUND: LILAC,
 BUTTON_TEXT: WHITE,
 TEXT: BLACK,
};

const dark = {
 ...common,
 BACKGROUND: GRAPE,
 TEXT: WHITE,
};

export const colors = {light, dark};