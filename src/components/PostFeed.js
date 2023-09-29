import { useState } from "react";
import backendUrl from "../config";
import axios from "axios";
import { useEffect } from "react";
import Post from "./Post";
import { CardContent } from "@mui/material";
import NewPostForm from "./NewPostForm";

function PostFeed(props) {
  const [posts, getPosts] = useState([]);
  const getUserPosts = async () => {
    axios
      .get(`${backendUrl}api/getUserPosts/${props.userInfo.user_id}`)
      .then((response) => {
        const message = response.data.rows;
        console.log("Response from server:", message);
        getPosts(
          message.sort((a, b) => {
            const timeStampA = new Date(a.created_at).getTime();
            const timeStampB = new Date(b.created_at).getTime();
            return timeStampB - timeStampA;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <>
      <NewPostForm userInfo={props.userInfo} getUserPosts={getUserPosts()} />
      <h2>Feed:</h2>
      <div>
        {posts.map((content, index) => (
          <Post key={index} content={content} />
        ))}
      </div>
    </>
  );
}
export default PostFeed;
