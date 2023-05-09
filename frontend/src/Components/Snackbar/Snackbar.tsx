import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { IconButton } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import { State } from "../../Pages/Food/Food";
import CloseIcon from "@mui/icons-material/Close";

function TransitionUp(
  props: JSX.IntrinsicAttributes & SlideProps,
  transitionDirection: number
) {
  if (transitionDirection === 0) {
    return <Slide {...props} direction={"up"} />;
  } else {
    return <Slide {...props} direction={"down"} />;
  }
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarV2 = ({
  state,
  setState,
  autohide,
}: {
  state: State;
  setState: (state: State) => void;
  autohide?: number;
}) => {
  const handleClose = () => {
    setState({ ...state, open: false, text: "Product added to cart" });
  };

  const { vertical, horizontal, open, text } = state;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={text}
      key={vertical + horizontal}
      TransitionComponent={(e) => TransitionUp(e, 1)}
      autoHideDuration={autohide ? autohide : 800}
      action={
        <React.Fragment>
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    >
      <Alert
        onClose={handleClose}
        severity="info"
        sx={{ width: "100%", bgcolor: "#82218b" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarV2;
