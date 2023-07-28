import axios from "axios";
import { useEffect, useState } from "react";
import backendUrl from "../config";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function Homepage() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    console.log("got to fetch");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        //redirect
        return null;
      }
      const response = await axios.get(`${backendUrl}api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user information", error);
      return null;
    }
  };
  const getUserInfo = async () => {
    const info = await fetchUserInfo();
    if (info) {
      setUserInfo(info);
      console.log(userInfo);
    } else {
      console.log("User not authenticated or an error occured.");
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const handleSignOut = () => {
    setUserInfo(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  if (userInfo === null) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <h1>Welcome, {userInfo.first_name}!</h1>
        <Button variant="contained" size="small" onClick={handleSignOut}>
          Sign out
        </Button>
      </>
    );
  }
}
export default Homepage;
