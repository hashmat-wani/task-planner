import React, { useContext } from "react";

import { Backdrop, CircularProgress } from "@mui/material";
import { loadingContext } from "../context/LoadingContext";

const Loading = () => {
  const { loading } = useContext(loadingContext);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
