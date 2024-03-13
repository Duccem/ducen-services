import { lightPalette } from "./lightPalette";

export const theme = {
  name: 'light',
  colors: lightPalette,
  fontSizes: {
    h1: 40,
    h2: 28,
    h3: 20,
    p1: 20,
    p2: 16,
    p3: 12
  },
  fontWeights: [300, 400, 500, 600, 700, 800],
  space: [0, 4, 8, 16, 32, 64],
  shadows: {
    none: '',
    normal: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    elevated: '0px 4.8px 14.4px rgba(0, 0, 0, 0.18), 0px 25.6px 57.6px rgba(0, 0, 0, 0.22)'
  },
  radii: {
    none: 'none',
    small: '4px',
    medium: '8px',
    large: '16px',
    full: '9999px'
  },
  sizes: {
    fixed: {
      small: '100px',
      medium: '300px',
      larger: '500px'
    },
    percent: {
      small: '20%',
      medium: '50%',
      larger: '100%'
    }
  }
};
