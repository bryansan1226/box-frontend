import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import axios from "axios";
import backendUrl from "../config";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function NewAccountForm(props) {
  //Declaring variables for user input and handling navigation to homepage after user creates account
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstName = (event) => {
    const inputValue = event.target.value;
    setFirstName(inputValue);
  };
  const handleLastName = (event) => {
    const inputValue = event.target.value;
    setLastName(inputValue);
  };
  const handleUsername = (event) => {
    const inputValue = event.target.value;
    setUsername(inputValue);
  };
  const handleEmail = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
  };
  const handlePassword = (event) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
  };
  const navigate = useNavigate();
  /*This handles form submission.
  Gets the current timestamp, and then makes an API POST request to create an account. 
  It sends all the inputted data (firstName, lastName...) along with the timestamp to the backend. 
  If the request is successful, the backend with send a response that contains a token. This token is set in localstorage
  and the user is then navigated to /home. and the NewAccountForm component is closed. 
  */
  const handleSubmit = (event) => {
    const currentTimestamp = new Date().toISOString();
    event.preventDefault();
    axios
      .post(`${backendUrl}api/createAccount`, {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        timestamp: currentTimestamp,
      })
      .then((response) => {
        const { token, message } = response.data;
        console.log("Response from server:", message);
        localStorage.setItem("token", token);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
      });
    props.handleClose();
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div style={{ position: "relative" }}>
            <Button
              style={{ position: "absolute", top: 0, right: 0 }}
              onClick={props.handleClose}
            >
              <CloseIcon />
            </Button>
          </div>
          <TextField
            required
            id="firstName"
            onChange={handleFirstName}
            label="First name"
          />
          <TextField
            required
            id="lastName"
            onChange={handleLastName}
            label="Last name"
          />
          <TextField
            required
            id="username"
            onChange={handleUsername}
            label="Username"
          />
          <TextField
            required
            id="email"
            onChange={handleEmail}
            label="E-Mail"
          />
          <TextField
            required
            id="password"
            type="password"
            onChange={handlePassword}
            label="Password"
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" onClick={handleSubmit}>
            Create Account
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
export default NewAccountForm;
