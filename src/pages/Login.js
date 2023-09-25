import * as React from "react";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import NewAccountForm from "../components/NewAccountForm";
import LoginForm from "../components/LoginForm";

//The login function is used to open or close the NewAccountForm component
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
      {/*This button opens the backdrop and NewAccountForm component to allow user to create an account
         along with a grey backdrop to bring the component into focus */}
      <Button variant="contained" onClick={handleOpen}>
        Create new account
      </Button>
      {/*This component handles user credentials and is always displayed */}
      <LoginForm />
      {/*The backdrop will also render the NewAccount component when opened and passes the handleClose
        function so it can be closed from within the component */}
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
