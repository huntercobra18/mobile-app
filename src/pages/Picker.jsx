import { useNavigation } from "../contexts/NavigationContext";
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { HexColorPicker } from "react-colorful";

const Picker = () => {
  const { location } = useNavigation();
  const isActive = location === 0;

  const { writeColor } = useApi();

  const [color, setColor] = useState("#ffffff");

  const handleChange = (color) => {
    setColor(color);
    writeColor(color);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        paddingTop: 2,
        paddingBottom: 2,
        height: "100%",
      }}
    >
      <Typography component={"h1"} variant="h3">
        Picker
      </Typography>
      <Box className={"no-swipe"}>
        <HexColorPicker color={color} onChange={handleChange} />
      </Box>
    </Container>
  );
};

export default Picker;
