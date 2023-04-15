import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import BottomNavigation from "../components/BottomNavigation";
import ModalNotConnected from "../components/ModalNotConnected";
import { ApiProvider } from "../contexts/ApiContext";
import { NavigationProvider } from "../contexts/NavigationContext";
import SwipeHandler from "./Swipehandler";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Base = ({ children }) => {
  return (
    <NavigationProvider>
      <ThemeProvider theme={theme}>
        <ApiProvider>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              height: "100%",
              bgcolor: "background.default",
              color: "text.primary",
            }}
          >
            <SwipeHandler>
              {children.map((children, i) => (
                <section
                  key={`page-section-${i}`}
                  style={{
                    height: "100%",
                  }}
                >
                  {children}
                </section>
              ))}
            </SwipeHandler>
            <ModalNotConnected />
            <BottomNavigation />
          </Box>
        </ApiProvider>
      </ThemeProvider>
    </NavigationProvider>
  );
};

export default Base;
