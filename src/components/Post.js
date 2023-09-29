import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

function Post(props) {
  console.log("In Post: " + props.content);
  return (
    <Card style={{ maxWidth: "100%" }}>
      <CardContent>
        {/*<Typography gutterBottom variant="h5" component="div">
            //User Name
           </Typography>*/}
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
