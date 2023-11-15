const BLACK = '#080808';
const WHITE = '#ffffff';
const GRAY = '#858585';
const LIGHTGRAY = '#D1D1D1';

const PALEPURPLE = '#f4f0f9';
const LILAC = '#c8b9e4';
const PURPLE = '#805dc0';
const SPACEPURPLE = '#54447E';
const DARKPURPLE = '#28194D';

const PALEBLUE = "#F8FBFF";
const BLUE = "#bfdbf7";
const MIDBLUE = '#2c7da0';
const SPACEBLUE = '#305279';
const DARKBLUE = '#1B3757';

const MINTCREAM = '#FCFFFB'; 
const SAGEGREEN = '#C6E2BA'; 
const GREEN = '#5E7458';
const DARKGREEN = '#273822';
const SPACEGREEN = '#43533E';

const SNOW = '#FFF7F8';
const PINK = '#f9c8d0';
const MIDPINK = '#ff4d6d';
const DARKPINK = '#c95d63';// background color light

const NUDE = '#bcb8b1'; // background color light
const BROWN = '#8a817c';
const DARKBROWN = '#463f3a'// background color light

const purple = {
    light: {
        ...common,
        BACKGROUND: LILAC,
        BUTTON_TEXT: WHITE,
        BUTTON_COLOR: PURPLE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        TEXT_ENTRY: PALEPURPLE,
        SPACE: PALEPURPLE,

    },
    dark: {
        BACKGROUND: GRAPE,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        TEXT_ENTRY: PURPLE,
        SPACE: SPACEPURPLE,
    }
};

const blue = {
    light: {
        ...common,
        BACKGROUND: BLUE,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        BUTTON_COLOR: MIDBLUE,
        CAPTURE: WHITE,
        SPACE: PALEBLUE,
    },
    dark: {
        ...common,
        BACKGROUND: DARKBLUE,
        BUTTON_TEXT: BLACK,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        BUTTON_COLOR: MIDBLUE,
        CAPTURE: WHITE,
        SPACE: SPACEBLUE,
    }
};

const green = {
    light: {
        BACKGROUND: PALEGREEN,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        BUTTON_COLOR: GREEN,
        CAPTURE: WHITE,
        SPACE: MINTCREAM,
    },
    dark: {
        ...common,
        BACKGROUND: DARKGREEN,
        BUTTON_TEXT: BLACK,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        BUTTON_COLOR: GREEN,
        CAPTURE: WHITE,
        CARD_BACKGROUND: MINTCREAM,
        SPACE: SPACEGREEN,
    }
};

const pink = {
    light: {
        ...common,
        BACKGROUND: PINK,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        BUTTON_COLOR: MIDPINK,
        CAPTURE: WHITE,
        SPACE: SNOW,
    },
    dark: {
        ...common,
        BACKGROUND: DARKPINK,
        BUTTON_TEXT: BLACK,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        BUTTON_COLOR: MIDPINK,
        TEXT_ENTRY: WHITE,
        SPACE: SPACEPINK,
    }
};

const brown = {
    light: {
        ...common,
        BACKGROUND: NUDE,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        BUTTON_COLOR: BROWN,
        TEXT_ENTRY: NUDE,
        SPACE: WHITESMOKE,
    },
    dark: {
        ...common,
        BACKGROUND: DARKBROWN,
        BUTTON_TEXT: BLACK,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        BUTTON_COLOR: LIGHTBROWN,
        TEXT_ENTRY: NUDE,
        SPACE: BROWN,
    }
}

export const colors = { purple, blue, pink, green, brown }