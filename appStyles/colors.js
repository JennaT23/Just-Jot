const LILAC = '#c8b9e4';
const PURPLE = '#805dc0';
const WHITE = '#ffffff';
const GRAPE = '#53227d';
const BLACK = '#080808';
const GRAY = '#696969'

const common = {
    PRIMARY: PURPLE,
};

const light = {
    ...common,
    BACKGROUND: LILAC,
    BUTTON_TEXT: WHITE,
    TEXT: BLACK,
    SUBHEADING: GRAY,
};

const dark = {
    ...common,
    BACKGROUND: GRAPE,
    TEXT: WHITE,
    SUBHEADING: GRAY
};

export const colors = { light, dark };