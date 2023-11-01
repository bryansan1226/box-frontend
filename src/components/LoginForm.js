import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  //declaring variables to handle user input and allow navigating within the app using navigate
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsername = (event) => {
    const inputValue = event.target.value;
    setUsername(inputValue);
  };
  const handlePassword = (event) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
  };
  const handleLogin = async () => {
    try {
      /*Makes an API call to the backend with the provided username and password. 
      If the API returns a token, it will be set in localstorage and the user will be navigated to the homepage*/
      const response = await axios.post("/api/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/home");
    } catch (error) {
      console.error(error.response?.data?.error || "Error during login");
    }
  };
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <TextField
          id="username"
          onChange={handleUsername}
          onKeyDown={handleEnterKeyPress}
          label="Username"
        />
        <TextField
          id="password"
          type="password"
          onChange={handlePassword}
          label="Password"
          onKeyDown={handleEnterKeyPress}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={handleLogin}>
          Sign in
        </Button>
      </CardActions>
    </Card>
  );
}
export default LoginForm;
