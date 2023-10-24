import { useLocation } from "react-router-dom";
import AppBar from "../components/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import { useState } from "react";

function Messages() {
  const { params } = useLocation();
  const userInfo = new URLSearchParams(params);
  const user_id = userInfo.get("userInfo");
  const [newMessageValue, setNewMessageValue] = useState("");

  return (
    <>
      <AppBar />
      <PopupState variant="popper" popupId="demo-popup-popper">
        {(popupState) => (
          <div>
            <Button
              variant="contained"
              {...bindToggle(popupState)}
              style={{ margin: "15px" }}
            >
              New Message
            </Button>
            <Popper {...bindPopper(popupState)} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper sx={{ width: "75vw", height: "40vh", p: 2 }}>
                    <Typography style={{ margin: "10px", display: "flex" }}>
                      To:
                      <PopupState variant="popper" popupId="demo-popup-popper">
                        {(popupState) => (
                          <div>
                            <Button {...bindToggle(popupState)}>
                              Select from following:
                            </Button>
                            <Popper {...bindPopper(popupState)} transition>
                              {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                  <Paper>
                                    <Typography sx={{ p: 2 }}>
                                      The content of the Popper.
                                    </Typography>
                                  </Paper>
                                </Fade>
                              )}
                            </Popper>
                          </div>
                        )}
                      </PopupState>
                    </Typography>
                    <TextField
                      id="standard-multiline-static"
                      label="Message"
                      multiline
                      rows={4}
                      defaultValue=""
                      variant="filled"
                      fullWidth
                      max
                      onChange={(e) => {
                        setNewMessageValue(e.target.value);
                        console.log(newMessageValue);
                      }}
                    />
                    <Typography sx={{ p: 2 }}>
                      <Button variant="contained">Send</Button>
                      <Button {...bindToggle(popupState)}>Cancel</Button>
                    </Typography>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        )}
      </PopupState>
    </>
  );
}
export default Messages;
