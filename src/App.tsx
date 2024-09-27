import { Box, Typography } from "@mui/material";
import { Home } from "./pages";
import { containerStyles, footerStyles } from "./App.styles";

function App() {
  return (
    <Box sx={containerStyles}>
      <header>
        <Typography variant="h1" gutterBottom>
          Weather Forecast
        </Typography>
      </header>
      <body>
        <Home />
      </body>
      <footer>
        <Box sx={footerStyles}>
          <Typography variant="subtitle1">Weather app</Typography>
          <Typography variant="subtitle2">by Juan</Typography>
        </Box>
      </footer>
    </Box>
  );
}

export default App;
