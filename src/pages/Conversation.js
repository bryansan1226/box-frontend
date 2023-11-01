import { useLocation } from "react-router-dom";
import AppBar from "../components/AppBar";
import App from "../App";
import axios from "axios";
import backendUrl from "../config";
import { useEffect } from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";

function Conversation() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const user_id = queryParams.get("user_id");
  const conversation_id = queryParams.get("conversation_id");
  const [messages, setMessages] = useState([]);
  const [newMessageValue, setNewMessageValue] = useState("");
  const getConversation = async () => {
    axios
      .get(`${backendUrl}api/getConversation`, {
        params: { user_id: user_id, conversation_id: conversation_id },
      })
      .then((response) => {
        const message = response.data.rows;
        console.log("Response from server:", message);
        setMessages(message);
      })
      .catch((error) => {
        console.error("Error getting data: ", error);
      });
  };
  const handleSendMessage = async () => {
    const currentTimestamp = new Date().toISOString();
    await axios
      .post(`${backendUrl}api/newMessage`, {
        sender_id: user_id,
        receiver_id: conversation_id,
        content: newMessageValue,
        created_at: currentTimestamp,
      })
      .then((response) => {
        const { message } = response.data;
        console.log("Response from server:", message);
        setNewMessageValue("");
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
      });
    setNewMessageValue("");
    getConversation();
  };
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    getConversation();
  }, []);
  return (
    <>
      <AppBar />
      <Container
        fixed
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          minHeight: "75vh",
          maxHeight: "75vh",
          backgroundColor: "rgba(239, 239, 240)",
        }}
      >
        <Container
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.length ? (
            messages.map((message) => (
              <Container
                sx={{
                  display: "flex",
                  justifyContent:
                    message.sender_id == user_id ? "flex-end" : "flex-start",
                  maxWidth: "95%",
                  marginBottom: "8px",
                }}
                key={message.message_id}
              >
                <Card
                  sx={{
                    backgroundColor:
                      message.sender_id == user_id
                        ? "rgba(24,118,210,0.25)"
                        : "white",
                  }}
                  variant="outlined"
                >
                  <CardContent>
                    <Typography variant="h5" sx={{}}>
                      {message.sender_id != user_id
                        ? message.first_name + ": "
                        : null}
                      {message.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Container>
            ))
          ) : (
            <Typography>You have no messages to view</Typography>
          )}
        </Container>
      </Container>
      <Container
        fixed
        sx={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <TextField
          id="standard-multiline-static"
          label="Message"
          multiline
          rows={4}
          defaultValue=""
          value={newMessageValue}
          style={{
            minHeight: "35%",
            marginTop: "10px",
            overflow: "auto",
            minWidth: "100%",
          }}
          onChange={(e) => {
            setNewMessageValue(e.target.value);
          }}
          onKeyDown={handleEnterKeyPress}
        />
        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ maxWidth: "10vw" }}
            onClick={handleSendMessage}
          >
            <Typography>Send</Typography>
          </Button>
        </Container>
      </Container>
    </>
  );
}
export default Conversation;
