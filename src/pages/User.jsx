import { Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { useNavigation } from "../contexts/NavigationContext";

const User = () => {
  const { location } = useNavigation();
  const isActive = location === 3;

  const { disconnect, writeColor } = useApi();
  const [curInterval, setCurInterval] = useState(null);

  const [color, setColor] = useState();

  const startTone = () => {
    if (curInterval) {
      clearInterval(curInterval);
      setCurInterval(null);
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 2048;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          source.connect(analyser);
          setCurInterval(
            setInterval(() => {
              analyser.getByteFrequencyData(dataArray);
              const total = dataArray.reduce((acc, curr) => acc + curr);
              const average = total / bufferLength;
              console.log(average);
              // If above 50, we have a tone
              if (average > 60) {
                writeColor("#ff0000");
                setColor("red");
              } else {
                writeColor("#000000");
                setColor("black");
              }
            }, 100)
          );
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(curInterval);
    };
  }, [curInterval, isActive]);

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
        backgroundColor: color,
      }}
    >
      <Typography component={"h1"} variant="h3">
        User
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          startTone();
        }}
      >
        {curInterval ? "Stop Listening" : "Start listening"}
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          disconnect();
        }}
      >
        Déconnexion
      </Button>
    </Container>
  );
};

export default User;
