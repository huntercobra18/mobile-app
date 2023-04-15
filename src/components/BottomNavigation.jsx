import * as React from "react";
import Box from "@mui/material/Box";
import {
  BottomNavigation as BottomNavigationMUI,
  Typography,
} from "@mui/material";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigation } from "../contexts/NavigationContext";
import ColorizeIcon from "@mui/icons-material/Colorize";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PersonIcon from "@mui/icons-material/Person";
import { Stack } from "@mui/system";
import { useApi } from "../contexts/ApiContext";

const BottomNavigation = () => {
  const { location, dispatch } = useNavigation();
  const { macAddress } = useApi();

  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          p: 2,
          backgroundColor: "primary.dark",
        }}
      >
        <Typography>{macAddress}</Typography>
      </Stack>
      <BottomNavigationMUI
        showLabels
        value={location}
        onChange={(event, newValue) => {
          dispatch({ type: newValue });
        }}
        as={"nav"}
      >
        <BottomNavigationAction label="Picker" icon={<ColorizeIcon />} />
        <BottomNavigationAction label="Random" icon={<ShuffleIcon />} />
        <BottomNavigationAction label="Photo" icon={<InsertPhotoIcon />} />
        <BottomNavigationAction label="User" icon={<PersonIcon />} />
      </BottomNavigationMUI>
    </Box>
  );
};

export default BottomNavigation;
