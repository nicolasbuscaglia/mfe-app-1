import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Emitter } from "nanoevents";
import { useEffect, useState } from "react";
import { getRandomUser } from "../services/users";

interface EventEmitterInterface {
  emitter?: Emitter;
}

const CustomButton = ({ emitter }: EventEmitterInterface) => {
  const [user, setUser] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    emitter?.emit("updateUser", user);
  };

  useEffect(() => {
    const unbind = emitter?.on("userLoggedIn", (value: boolean) => {
      setIsDisabled(value);
    });
    return () => {
      unbind && unbind();
    };
  }, [emitter]);

  const getUser = async () => {
    setIsFetching(true);
    const randomUser = await getRandomUser();
    setUser(randomUser);
    setIsFetching(false);
  };

  useEffect(() => {
    if (!isDisabled) getUser();
  }, []);

  return (
    <Box sx={{ p: 2, border: "1px dashed grey" }}>
      <Typography variant="h6" gutterBottom>
        Microfrontend 1
      </Typography>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <Typography variant="body2" gutterBottom>
          {JSON.stringify(user, null, 4)}
        </Typography>
      )}
      <Box display="flex" gap={2} mt={2}>
        <Button variant="contained" onClick={getUser} disabled={isDisabled}>
          Get Random User
        </Button>
        <Button variant="contained" onClick={handleClick} disabled={isDisabled}>
          Send to MFE2
        </Button>
      </Box>
    </Box>
  );
};

export default CustomButton;
