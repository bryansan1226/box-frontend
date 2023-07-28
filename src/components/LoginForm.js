import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
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
      const response = await axios.post("/api/login", { username, password });
      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/home");
    } catch (error) {
      console.error(error.response?.data?.error || "Error during login");
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <TextField id="username" onChange={handleUsername} label="Username" />
        <TextField
          id="password"
          type="password"
          onChange={handlePassword}
          label="Password"
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
