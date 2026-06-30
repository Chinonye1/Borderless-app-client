import { createTheme } from "@mui/material";

// One place to control the whole app's look.
// Change `primary.main` and every button, link, and accent updates.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#e11d2a", // brand red (matches the logo)
      dark: "#b3151f",
      light: "#ef5350",
    },
    secondary: {
      main: "#1e293b", // dark slate, for contrast against the red
    },
    background: {
      default: "#f8fafc",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    h2: { fontWeight: 800 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
  },
});
