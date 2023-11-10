const LILAC = '#c8b9e4';
const PURPLE = '#805dc0';
const WHITE = '#ffffff';
const GRAPE = '#652d90';
const BLACK = '#080808';
const GRAY = '#696969';
const BLUE = "#a9def9"; // background color light
const MIDBLUE= '#2c7da0';
const DARKBLUE = '#013a63'; // background color darl
const PALEGREEN = '#95d5b2'; // background color light
const GREEN = '#52b788';
const DARKGREEN = '#2d6a4f';// background color light
const PINK = '#ffb3c1'; // background color light
const MIDPINK = '#ff4d6d';
const DARKPINK = '#800f2f';// background color light
const NUDE = '#e7bc91'; // background color light
const BROWN = '#a47148';
const DARKBROWN = '#6c584c'// background color light

// const common = {
//     PRIMARY: PURPLE,
//     CAPTURE: WHITE,
// };

// const light = {
//     ...common,
//     BACKGROUND: LILAC,
//     BUTTON_TEXT: WHITE,
//     TEXT: BLACK,
//     SUBHEADING: GRAY,
// };

// const dark = {
//     ...common,
//     BACKGROUND: GRAPE,
//     TEXT: WHITE,
//     SUBHEADING: GRAY
// };

// export const colors = { light, dark };

const purple = {
    light: {
        BACKGROUND: LILAC,
        BUTTON_TEXT: WHITE,
        TEXT: BLACK,
        SUBHEADING: GRAY,
        PRIMARY: PURPLE,
        CAPTURE: WHITE,
    },
    dark: {
        BACKGROUND: GRAPE,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: PURPLE,
        CAPTURE: WHITE,
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
    },
    dark: {
        BACKGROUND: DARKBLUE,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: MIDBLUE,
        CAPTURE: WHITE,
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
    },
    dark: {
        BACKGROUND: DARKGREEN,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: GREEN,
        CAPTURE: WHITE,
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
    },
    dark: {
        BACKGROUND: DARKPINK,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: MIDPINK,
        CAPTURE: WHITE,
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
    },
    dark: {
        BACKGROUND: DARKBROWN,
        TEXT: WHITE,
        SUBHEADING: GRAY,
        PRIMARY: BROWN,
        CAPTURE: WHITE,
    }
}

export const themes = {
    purple, blue, pink, green, brown
    // purple theme
    // purple: {
    //     light: {
    //         BACKGROUND: LILAC,
    //         BUTTON_TEXT: WHITE,
    //         TEXT: BLACK,
    //         SUBHEADING: GRAY,
    //         PRIMARY: PURPLE,
    //         CAPTURE: WHITE,
    //     },
    //     dark: {
    //         BACKGROUND: GRAPE,
    //         TEXT: WHITE,
    //         SUBHEADING: GRAY,
    //         PRIMARY: PURPLE,
    //         CAPTURE: WHITE,
    //     }
    // },

    // // blue theme
    // blue: {
    //     light: {
    //         BACKGROUND: BLUE,
    //         BUTTON_TEXT: WHITE,
    //         TEXT: BLACK,
    //         SUBHEADING: GRAY,
    //         PRIMARY: MIDBLUE,
    //         CAPTURE: WHITE,
    //     },
    //     dark: {
    //         BACKGROUND: DARKBLUE,
    //         TEXT: WHITE,
    //         SUBHEADING: GRAY,
    //         PRIMARY: MIDBLUE,
    //         CAPTURE: WHITE,
    //     }
    // },

    // // green theme
    // green: {
    //     light: {
    //         BACKGROUND: PALEGREEN,
    //         BUTTON_TEXT: WHITE,
    //         TEXT: BLACK,
    //         SUBHEADING: GRAY,
    //         PRIMARY: GREEN,
    //         CAPTURE: WHITE,
    //     },
    //     dark: {
    //         BACKGROUND: DARKGREEN,
    //         TEXT: WHITE,
    //         SUBHEADING: GRAY,
    //         PRIMARY: GREEN,
    //         CAPTURE: WHITE,
    //     }
    // },

    // // pink theme
    // pink: {
    //     light: {
    //         BACKGROUND: PINK,
    //         BUTTON_TEXT: WHITE,
    //         TEXT: BLACK,
    //         SUBHEADING: GRAY,
    //         PRIMARY: MIDPINK,
    //         CAPTURE: WHITE,
    //     },
    //     dark: {
    //         BACKGROUND: DARKPINK,
    //         TEXT: WHITE,
    //         SUBHEADING: GRAY,
    //         PRIMARY: MIDPINK,
    //         CAPTURE: WHITE,
    //     }
    // },

    // // brown theme
    // brown: {
    //     light: {
    //         BACKGROUND: NUDE,
    //         BUTTON_TEXT: WHITE,
    //         TEXT: BLACK,
    //         SUBHEADING: GRAY,
    //         PRIMARY: BROWN,
    //         CAPTURE: WHITE,
    //     },
    //     dark: {
    //         BACKGROUND: DARKBROWN,
    //         TEXT: WHITE,
    //         SUBHEADING: GRAY,
    //         PRIMARY: BROWN,
    //         CAPTURE: WHITE,
    //     }
    // }
}