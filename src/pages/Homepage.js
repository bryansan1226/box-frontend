import axios from "axios";
import { useEffect, useState } from "react";
import backendUrl from "../config";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import NewPostForm from "../components/NewPostForm";
import PostFeed from "../components/PostFeed";

function Homepage() {
  //State to store user information
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    console.log("got to fetch");
    try {
      //Retrieves token from localstorage, if no token is present the user will be redirected to /login
      const token = localStorage.getItem("token");
      if (!token) {
        //redirect
        //TODO: Add code to redirect to login page
        return null;
      }
      //Makes a GET request to fetch user data using token
      const response = await axios.get(`${backendUrl}api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Returns user data if successful
      return response.data;
      //console.log(response.data);
    } catch (error) {
      console.error("Error fetching user information", error);
      return null;
    }
  };
  //Function to get user info using fetchUserInfo and updates userInfo state.
  const getUserInfo = async () => {
    const info = await fetchUserInfo();
    if (info) {
      setUserInfo(info);
      console.log(userInfo);
    } else {
      console.log("User not authenticated or an error occured.");
    }
  };
  //Effect hook to get user info when component mounts
  useEffect(() => {
    getUserInfo();
  }, []);
  //Handles signing out by removing the session token from localstorage and navigates to index page.
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
        {/*<NewPostForm userInfo={userInfo} />
        Experimenting with whether it's better render NewPostForm from homepage or PostFeed*/}
        <PostFeed userInfo={userInfo} />
        <Button variant="contained" size="small" onClick={handleSignOut}>
          Sign out
        </Button>
      </>
    );
  }
}
export default Homepage;
