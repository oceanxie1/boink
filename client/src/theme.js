import { createTheme } from '@mui/material/styles'

export const shades = {
    primary: {
          100: "#f9eeee",
          200: "#f3dede",
          300: "#edcdcd",
          400: "#e7bdbd",
          500: "#e1acac",
          600: "#b48a8a",
          700: "#876767",
          800: "#5a4545",
          900: "#2d2222"
    },  

    secondary: {
          100: "#fcf8fb",
          200: "#f9f2f7",
          300: "#f5ebf4",
          400: "#f2e5f0",
          500: "#efdeec",
          600: "#bfb2bd",
          700: "#8f858e",
          800: "#60595e",
          900: "#302c2f"
},

    neutral: {
        100: "#faf9f4",
        200: "#f6f2ea",
        300: "#f1ecdf",
        400: "#ede5d5",
        500: "#e8dfca",
        600: "#bab2a2",
        700: "#8b8679",
        800: "#5d5951",
        900: "#2e2d28"
    },
}

export const theme = createTheme({
    palette: {
        primary: {
            main: shades.primary[500]
        },
        secondary: {
            main: shades.secondary[500]
        },
        neutral: {
            dark: shades.neutral[700],
            main: shades.neutral[500],
            light: shades.neutral[100]
        }
    },
    typography: {
        fontFamily: ["Gaegu", "sans-serif"].join(","),
        fontSize: 11,
        h1: {
            fontFamily: ["Gaegu", "sans-serif"].join(","),
        fontSize: 48,
        },
        h2: {
            fontFamily: ["Gaegu", "sans-serif"].join(","),
        fontSize: 36,
        },
        h3: {
            fontFamily: ["Gaegu", "sans-serif"].join(","),
        fontSize: 20,
        },
        h4: {
            fontFamily: ["Gaegu", "sans-serif"].join(","),
        fontSize: 14,
        },
    }
})