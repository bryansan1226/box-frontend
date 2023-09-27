import { useState } from "react";
import backendUrl from "../config";
import axios from "axios";
import { useEffect } from "react";

function PostFeed(props) {
  const [posts, getPosts] = useState([]);
  const getUserPosts = async () => {
    axios
      .get(`${backendUrl}api/getUserPosts/${props.userInfo.user_id}`)
      .then((response) => {
        const message = response.data.rows;
        console.log("Response from server:", message);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  return <h2>Feed:</h2>;
}
export default PostFeed;
