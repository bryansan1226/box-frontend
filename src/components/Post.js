import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import backendUrl from "../config";
import axios from "axios";
import { useEffect } from "react";

function Post(props) {
  const [userInfo, setUserInfo] = useState([]);
  const findByUserID = async () => {
    axios
      .get(`${backendUrl}api/findByUserID/${props.content.user_id}`)
      .then((response) => {
        const message = response.data;
        setUserInfo(message);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  useEffect(() => {
    findByUserID();
  }, []);
  return (
    <Card style={{ maxWidth: "100%" }}>
      <CardContent>
        {
          <Typography gutterBottom variant="h5" component="div">
            {userInfo.first_name} {userInfo.last_name}
          </Typography>
        }
        <Typography variant="body2" color="text.secondary">
          {props.content.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Like</Button>
      </CardActions>
    </Card>
  );
}
export default Post;
