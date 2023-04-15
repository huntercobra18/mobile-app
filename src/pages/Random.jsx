import { useEffect, useState } from "react";
import { useNavigation } from "../contexts/NavigationContext";
import { useApi } from "../contexts/ApiContext";
import { getRandomSaturatedColor } from "../utils/functions";
import { Container, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const Random = () => {
  const { location } = useNavigation();
  const isActive = location === 1;
  const [color, setColor] = useState(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  const { writeColor } = useApi();

  const onShake = (devicemotionEvent) => {
    const x = devicemotionEvent.acceleration.x;
    setX(Math.round(x * 100) / 100);
    const y = devicemotionEvent.acceleration.y;
    setY(Math.round(y * 100) / 100);
    const z = devicemotionEvent.acceleration.z;
    setZ(Math.round(z * 100) / 100);
    const norme = Math.sqrt(x * x + y * y + z * z);
    if (norme > 12) {
      // Vibrates the device for 500ms
      navigator.vibrate(500);

      // Plays a sound
      // const audio = new Audio("/sounds/coin.mp3");
      // audio.play();

      // Changes the color of the bulb
      const color = `#${getRandomSaturatedColor()}`;
      writeColor(color);
      setColor(color);
    }
  };

  // TEST
  // useEffect(() => {
  //   // Every 5 seconds, change the color of the bulb
  //   const interval = setInterval(() => {
  //     const color = `#${getRandomSaturatedColor()}`;
  //     writeColor(color);
  //     setColor(color);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (isActive) {
      window.addEventListener("devicemotion", onShake, true);
    } else {
      window.removeEventListener("devicemotion", onShake, true);
    }

    return () => {
      window.removeEventListener("devicemotion", onShake, true);
    };
  }, [isActive]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        backgroundColor: color,
        paddingTop: 2,
        paddingBottom: 2,
        height: "100%",
      }}
    >
      <Typography component={"h1"} variant="h3">
        Random
      </Typography>
      <Stack direction={"row"} spacing={2}>
        <TextField
          label="Y"
          value={y}
          InputProps={{
            readOnly: true,
          }}
          type="number"
        />
        <TextField
          label="X"
          value={x}
          InputProps={{
            readOnly: true,
          }}
          type="number"
        />
        <TextField
          label="Z"
          value={z}
          InputProps={{
            readOnly: true,
          }}
          type="number"
        />
      </Stack>
    </Container>
  );
};

export default Random;
