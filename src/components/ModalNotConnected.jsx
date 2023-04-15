import { Button, Modal, Stack, Typography } from "@mui/material";
import { useApi } from "../contexts/ApiContext";

// Modal to display if no device is connected
const ModalNotConnected = () => {
  const { device, request, connect, writeColor, disconnect } = useApi();

  return (
    <Modal open={!device} onClose={() => {}}>
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography component={"h1"} variant="h4">
          No device Connected
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            request().then((device) => connect(device));
          }}
        >
          Choose a device
        </Button>
      </Stack>
    </Modal>
  );
};

export default ModalNotConnected;
