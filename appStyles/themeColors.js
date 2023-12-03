const BLACK = '#080808';
const WHITE = '#ffffff';
const GRAY = '#858585';             // Light subheading
const LIGHTGRAY = '#D1D1D1';        // dark subheading

const PALEPURPLE = '#f4f0f9';       // Light brown space
const LILAC = '#c8b9e4';            // light background
const PURPLE = '#976BC7';           // button
const SPACEPURPLE = '#54447E';      // dark space
const DARKPURPLE = '#28194D';       // dark background

const PALEBLUE = "#F8FBFF";         // Light blue space
const BLUE = "#bfdbf7";             // light background
const PICTONBLUE = "#5fa9d3";       // light button
const MIDBLUE = '#4D90B6';          // dark button
const SPACEBLUE = '#305279';        // dark space
const DARKBLUE = '#1B3757';         // dark background

const MINTCREAM = '#FCFFFB';        // Light green space
const SAGEGREEN = '#C6E2BA';        // light background
const DARKSAGEGREEN = '#74a366';    // light button
const SPACEGREEN = '#43533E';       // dark green space
const DARKGREEN = '#273822';        // dark background


const SNOW = '#FFF7F8';             // Light pink space
const PINK = '#f9c8d0';             // light background
const BLUSHPINK = '#F08285';         // light button
const SAGEPINK = '#B34B59';         // dark button
const SPACEPINK = '#823B50';        // dark space
const DARKPINK = '#5B2032';         // dark background

const WHITESMOKE = '#FAF9F6';       // Light brown space
const NUDE = '#bcb8b1';             // light background
const LIGHTBROWN = '#81756D';       // light button
const BROWN = '#8a817c';            // dark space
const DARKBROWN = '#463f3a';        // dark background

const LIGHTERGRAY = '#c9c9c9';
const DARKGRAY = '#787878';
const RED = '#e61212';

const common = {
    DELETE: RED,
    TEXTBOXBORDER: LIGHTERGRAY,
    SEPARATIONLINE: DARKGRAY,
    CAPTURE: WHITE,
};

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
        ...common,
        BACKGROUND: DARKPURPLE,
        BUTTON_TEXT: WHITE,
        BUTTON_COLOR: PURPLE,
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
        BUTTON_COLOR: PURPLE,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        BUTTON_COLOR: PICTONBLUE,
        SPACE: PALEBLUE,
    },
    dark: {
        ...common,
        BACKGROUND: DARKBLUE,
        BUTTON_TEXT: BLACK,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        BUTTON_COLOR: MIDBLUE,
        SPACE: SPACEBLUE,
    }
};

const green = {
    light: {
        ...common,
        BACKGROUND: SAGEGREEN,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        BUTTON_COLOR: DARKSAGEGREEN,
        SPACE: MINTCREAM,
    },
    dark: {
        ...common,
        BACKGROUND: DARKGREEN,
        BUTTON_TEXT: BLACK,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        BUTTON_COLOR: DARKSAGEGREEN,
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
        BUTTON_COLOR: BLUSHPINK,
        SPACE: SNOW,
    },
    dark: {
        ...common,
        BACKGROUND: DARKPINK,
        BUTTON_TEXT: BLACK,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        BUTTON_COLOR: SAGEPINK,
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
        BUTTON_COLOR: LIGHTBROWN,
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