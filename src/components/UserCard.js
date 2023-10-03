import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

function UserCard(props) {
  return (
    <Card style={{ maxWidth: "100%" }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {props.result.first_name + " " + props.result.last_name}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {props.result.username}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Follow</Button>
      </CardActions>
    </Card>
  );
}
export default UserCard;
