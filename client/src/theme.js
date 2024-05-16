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
        100: "#fffbf0",
        200: "#fff7e0",
        300: "#fff3d1",
        400: "#ffefc1",
        500: "#ffebb2",
        600: "#ccbc8e",
        700: "#998d6b",
        800: "#665e47",
        900: "#332f24"
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
        fontFamily: ["Danfo", "sans-serif"].join(","),
        fontSize: 11,
        h1: {
            fontFamily: ["Danfo", "sans-serif"].join(","),
        fontSize: 48,
        },
        h2: {
            fontFamily: ["Danfo", "sans-serif"].join(","),
        fontSize: 36,
        },
        h3: {
            fontFamily: ["Danfo", "sans-serif"].join(","),
        fontSize: 20,
        },
        h4: {
            fontFamily: ["Danfo", "sans-serif"].join(","),
        fontSize: 14,
        },
    }
})