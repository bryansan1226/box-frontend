import * as React from "react";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import NewAccountForm from "../components/NewAccountForm";
import LoginForm from "../components/LoginForm";
function Login() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <h1>The Box</h1>
      <Button variant="contained" onClick={handleOpen}>
        Create new account
      </Button>
      <LoginForm />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        //onClick={handleClose}
      >
        <NewAccountForm handleClose={handleClose} />
      </Backdrop>
    </>
  );
}

export default Login;
