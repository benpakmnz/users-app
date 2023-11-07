import React from "react";
import { IUser } from "../Interfaces";
import {
  Avatar,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

const UserDialog: React.FC<{ selectedUser: IUser; onClose: () => void }> = (
  props
) => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <IconButton onClick={props.onClose}>
          <CloseOutlined />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Avatar
          src={props.selectedUser.picture["large"]}
          sx={{ width: "100px", height: "100px" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3">
          {props.selectedUser.name.first} {props.selectedUser.name.last}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Paper variant="outlined">
          <Typography variant="body2">EMAIL</Typography>
          <Typography variant="body1">{props.selectedUser.email}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper variant="outlined">
          <Typography variant="body2">PHONE</Typography>
          <Typography variant="body1">{props.selectedUser.phone}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper variant="outlined">
          <Typography variant="body2">GENDER</Typography>
          <Typography variant="body1">{props.selectedUser.gender}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper variant="outlined">
          <Typography variant="body2">NATIONNALITY</Typography>
          <Typography variant="body1">{props.selectedUser.nat}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper variant="outlined">
          <Typography variant="body2">CITY</Typography>
          <Typography variant="body1">
            {props.selectedUser.location.city}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper variant="outlined">
          <Typography variant="body2">DATE OF BIRTH</Typography>
          <Typography variant="body1">
            {new Date(props.selectedUser.dob).toDateString()}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserDialog;
