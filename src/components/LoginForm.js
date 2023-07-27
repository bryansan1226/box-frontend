import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import axios from "axios";
import backendUrl from "../config";

function LoginForm(props) {
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

  const handleSubmit = (event) => {
    const currentTimestamp = new Date().toISOString();
    event.preventDefault();
    axios
      .post(`${backendUrl}/api/createAccount`, {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        timestamp: currentTimestamp,
      })
      .then((response) => {
        console.log("Response from server:", response.data);
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
      });
    props.handleClose();
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
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
        <TextField required id="email" onChange={handleEmail} label="E-Mail" />
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
  );
}
export default LoginForm;
