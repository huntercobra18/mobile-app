// import { Container } from "@mui/material";
// import { useNavigation } from "../contexts/NavigationContext";

// const Photo = () => {
//   const { location } = useNavigation();
//   const isActive = location === 2;

//   return (
//     <Container
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 3,
//         paddingTop: 2,
//         paddingBottom: 2,
//         height: "100%",
//       }}
//     >
//       <h1>Photo</h1>
//     </Container>
//   );
// };

// export default Photo;

import { Button, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { useNavigation } from "../contexts/NavigationContext";
import {
  couleurDominanteImage,
  couleurDominanteImage2,
} from "../utils/functions";

const Photo = () => {
  const { location } = useNavigation();
  const isActive = location === 2;

  const [imageURL, setImageURL] = useState("");
  const [color, setColor] = useState(null);
  const { writeColor } = useApi();
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(stream);
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.log(error);
    }
  };

  const stopVideoStream = () => {
    if (!stream) return;
    stream.getTracks().forEach((track) => track.stop());
    setStream(null);
  };

  useEffect(() => {
    if (isActive) {
      startVideoStream();
    } else {
      stopVideoStream();
    }
  }, [isActive]);

  const captureFrame = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const res = `#${couleurDominanteImage2("canvas", 5)}`;
    console.log(res);
    writeColor(res);
    setColor(res);
  };

  const getMajColor = () => {
    const res = `#${couleurDominanteImage("img-selected", 5)}`;
    writeColor(res);
    setColor(res);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the selected file
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

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
        width: "100%",
        overflow: "auto",
        overflowX: "hidden",
      }}
    >
      <Typography component={"h1"} variant="h3">
        capture photo
      </Typography>
      <input
        type="file"
        accept="image"
        capture="camera"
        onChange={handleFileSelect}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {imageURL && (
          <img
            src={imageURL}
            id="img-selected"
            width="200"
            alt="Selected one"
          />
        )}
      </Box>

      <Button onClick={getMajColor}>Couleur majoritaire</Button>

      <Stack direction={"column"} spacing={2}>
        <video ref={videoRef} autoPlay hidden />
        <canvas ref={canvasRef} id="canvas" />
      </Stack>
      <Button onClick={captureFrame}>"Snap..."</Button>
    </Container>
  );
};

export default Photo;
