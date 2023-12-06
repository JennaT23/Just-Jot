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
const MEDIUMSAGEGREEN = '#9DC290'   // light medium
const SPACEGREEN = '#43533E';       // dark green space
const DARKGREEN = '#273822';        // dark background
const DARKSAGEBUTTON = '#507340'    // dark button
const MEDIUMDARKSAGE = '#49633F'    // dark medium


const SNOW = '#FFF7F8';             // Light pink space
const PINK = '#f9c8d0';             // light background
const BLUSHPINK = '#F08285';        // light button
const MEDIUMPINK = '#F4A5AA'        // light medium
const SAGEPINK = '#B34B59';         // dark button
const SPACEPINK = '#823B50';        // dark space
const DARKPINK = '#5B2032';         // dark background
const MEDIUMDARKPINK = '#873545'    // dark medium

const WHITESMOKE = '#FAF9F6';       // Light brown space
const NUDE = '#bcb8b1';             // light background
const LIGHTBROWN = '#81756D';       // light button
const MEDIUMBROWN = '#9E968F'       // light medium brown
const BROWN = '#8a817c';            // dark space
const DARKBROWN = '#463f3a';        // dark background
const DARKBROWNBUTTON = '#705d50'   // dark button
const MEDIUMDARKBUTTON = '#5B4E45'  // dark medium

const LIGHTERGRAY = '#c9c9c9';
const DARKGRAY = '#787878';
const RED = '#e61212';
const MEDIUMPURPLE = '#af92d5';
const DARKMEDIUMPURPLE = '#5F428A';
const MEDIUMBLUE = '#8fc2e5';
const DARKMEDIUMBLUE = '#346487';

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
        HEADING: MEDIUMPURPLE,
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
        HEADING: DARKMEDIUMPURPLE,
    }
};

const blue = {
    light: {
        ...common,
        BACKGROUND: BLUE,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        BUTTON_COLOR: PICTONBLUE,
        SPACE: PALEBLUE,
        HEADING: MEDIUMBLUE,
    },
    dark: {
        ...common,
        BACKGROUND: DARKBLUE,
        BUTTON_TEXT: BLACK,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        BUTTON_COLOR: MIDBLUE,
        SPACE: SPACEBLUE,
        HEADING: DARKMEDIUMBLUE,
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
        HEADING: MEDIUMSAGEGREEN,
    },
    dark: {
        ...common,
        BACKGROUND: DARKGREEN,
        BUTTON_TEXT: BLACK,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        BUTTON_COLOR: DARKSAGEBUTTON,
        CARD_BACKGROUND: MINTCREAM,
        SPACE: SPACEGREEN,
        HEADING: MEDIUMDARKSAGE,
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
        HEADING: MEDIUMPINK,
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
        HEADING: MEDIUMDARKPINK,
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
        HEADING: MEDIUMBROWN,
    },
    dark: {
        ...common,
        BACKGROUND: DARKBROWN,
        BUTTON_TEXT: BLACK,
        TEXT: WHITE,
        SUBHEADING: LIGHTGRAY,
        BUTTON_COLOR: DARKBROWNBUTTON,
        TEXT_ENTRY: NUDE,
        SPACE: BROWN,
        HEADING: MEDIUMDARKBUTTON,
    }
}

export const colors = { purple, blue, pink, green, brown }