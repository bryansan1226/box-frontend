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
import TextField from "@mui/material/TextField";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Comment from "./Comment";

function Post(props) {
  const [userInfo, setUserInfo] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentText = (event) => {
    const inputValue = event.target.value;
    setCommentText(inputValue);
  };
  const handleNewComment = async () => {
    const currentTimestamp = new Date().toISOString();
    axios
      .post(`${backendUrl}api/newComment`, {
        post_id: props.content.post_id,
        user_id: props.userInfo.user_id,
        content: commentText,
        created_at: currentTimestamp,
      })
      .then((response) => {
        const { message } = response.data;
        console.log("Response from server:", message);
        //  props.getUserPosts();
        setCommentText("");
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
      });
  };
  const getComments = async () => {
    axios
      .get(`${backendUrl}api/getComments/${props.content.post_id}`)
      .then((response) => {
        const message = response.data.rows;
        console.log(message);
        setComments(message);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

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
    getComments();
  }, []);
  return (
    <Card style={{ maxWidth: "100%" }}>
      <CardContent>
        {
          <Typography gutterBottom variant="h5" component="div">
            {userInfo.first_name} {userInfo.last_name}
          </Typography>
        }
        <Typography variant="body1" color="text.secondary">
          {props.content.content}
        </Typography>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <div>
              <Button size="small" {...bindToggle(popupState)}>
                View comments ({comments.length})
              </Button>
              <Popper {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <div>
                        {comments.map((content, index) => (
                          <Comment key={index} content={content} />
                        ))}
                      </div>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          )}
        </PopupState>
      </CardContent>
      <CardActions>
        <TextField variant="filled" fullWidth onChange={handleCommentText} />
        <Button size="small" onClick={handleNewComment}>
          Comment
        </Button>
        <Button size="small">Like</Button>
      </CardActions>
    </Card>
  );
}
export default Post;
