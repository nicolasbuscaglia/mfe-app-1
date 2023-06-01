import { Box, Button, Typography } from "@mui/material";
import { Emitter } from "nanoevents";
import { useEffect, useState } from "react";

const FAKE_USER = {
  name: "John",
  surname: "Doe",
  email: "johndoe@email.com",
};

interface EventEmitterInterface {
  emitter?: Emitter;
}

const CustomButton = ({ emitter }: EventEmitterInterface) => {
  const [user, setUser] = useState({});
  const handleClick = () => {
    emitter?.emit("updateUser", user);
  };

  useEffect(() => {
    setUser(FAKE_USER);
  }, []);

  return (
    <Box sx={{ p: 2, border: "1px dashed grey" }}>
      <Typography variant="h6" gutterBottom>
        Microfrontend 1
      </Typography>
      <Typography variant="body2" gutterBottom>
        {JSON.stringify(FAKE_USER, null, 4)}
      </Typography>
      <Button variant="contained" onClick={handleClick}>
        Send to MFE2
      </Button>
    </Box>
  );
};

export default CustomButton;
