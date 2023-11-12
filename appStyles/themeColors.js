const BLACK = '#080808';
const GRAY = '#696969';
const WHITE = '#ffffff';
const SEASHELL = '#FFF5EE';

const LILAC = '#c8b9e4';
const PURPLE = '#805dc0';
const GRAPE = '#652d90';

const BLUE = "#bfdbf7"; // background color light
const MIDBLUE= '#2c7da0';
const DARKBLUE = '#274c77'; // background color dark

const PALEGREEN = '#95d5b2'; // background color light
const GREEN = '#c0f8d1';
const DARKGREEN = '#426148';// background color light

const PINK = '#f8c7cc'; // background color light
const MIDPINK = '#ff4d6d';
const DARKPINK = '#c95d63';// background color light

const NUDE = '#bcb8b1'; // background color light
const BROWN = '#8a817c';
const DARKBROWN = '#463f3a'// background color light

const purple = {
    light: {
        BACKGROUND: LILAC,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: PURPLE,
        CAPTURE: WHITE,
        CARD_BACKGROUND: WHITE,
    },
    dark: {
        BACKGROUND: GRAPE,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: PURPLE,
        CAPTURE: WHITE,
        CARD_BACKGROUND: WHITE,
    }
};

const blue = {
    light: {
        BACKGROUND: BLUE,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: MIDBLUE,
        CAPTURE: WHITE,
        CARD_BACKGROUND: WHITE,
    },
    dark: {
        BACKGROUND: DARKBLUE,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: MIDBLUE,
        CAPTURE: WHITE,
        CARD_BACKGROUND: WHITE,
    }
};

const green = {
    light: {
        BACKGROUND: PALEGREEN,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: GREEN,
        CAPTURE: WHITE,
        CARD_BACKGROUND: WHITE,
    },
    dark: {
        BACKGROUND: DARKGREEN,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: GREEN,
        CAPTURE: WHITE,
        CARD_BACKGROUND: WHITE,
    }
};

const pink = {
    light: {
        BACKGROUND: PINK,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: MIDPINK,
        CAPTURE: WHITE,
        CARD_BACKGROUND: SEASHELL,
    },
    dark: {
        BACKGROUND: DARKPINK,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: MIDPINK,
        CAPTURE: WHITE,
        CARD_BACKGROUND: SEASHELL,
    }
};

const brown = {
    light: {
        BACKGROUND: NUDE,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: BROWN,
        CAPTURE: WHITE,
        CARD_BACKGROUND: SEASHELL,
    },
    dark: {
        BACKGROUND: DARKBROWN,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: BROWN,
        CAPTURE: WHITE,
        CARD_BACKGROUND: SEASHELL,
    }
}

export const colors = { purple, blue, pink, green, brown }