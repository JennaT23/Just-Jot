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

const RED = '#e61212';
const LIGHTGRAY = '#c9c9c9';
const VERYLIGHTGRAY = '#f0f0f0' //f0f0f0 dedede

const common = {
    DELETE: RED,
    TEXTBOXBORDER: LIGHTGRAY,
    TEXTBOXBACKGROUND: VERYLIGHTGRAY,
};

const purple = {
    light: {
        ...common,
        BACKGROUND: LILAC,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: PURPLE,
        CAPTURE: WHITE,
        CARD_BACKGROUND: WHITE,
    },
    dark: {
        ...common,
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
        ...common,
        BACKGROUND: BLUE,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: MIDBLUE,
        CAPTURE: WHITE,
        CARD_BACKGROUND: WHITE,
    },
    dark: {
        ...common,
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
        ...common,
        BACKGROUND: PALEGREEN,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: GREEN,
        CAPTURE: WHITE,
        CARD_BACKGROUND: WHITE,
    },
    dark: {
        ...common,
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
        ...common,
        BACKGROUND: PINK,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: MIDPINK,
        CAPTURE: WHITE,
        CARD_BACKGROUND: SEASHELL,
    },
    dark: {
        ...common,
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
        ...common,
        BACKGROUND: NUDE,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: BROWN,
        CAPTURE: WHITE,
        CARD_BACKGROUND: SEASHELL,
    },
    dark: {
        ...common,
        BACKGROUND: DARKBROWN,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: BROWN,
        CAPTURE: WHITE,
        CARD_BACKGROUND: SEASHELL,
    }
}

export const colors = { purple, blue, pink, green, brown }