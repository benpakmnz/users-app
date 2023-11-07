import React from "react";
import { IUser } from "../../Interfaces";
import {
  Avatar,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import FaceIcon from "@mui/icons-material/Face";
import Face2Icon from "@mui/icons-material/Face2";
import "./user-dialog-styles.scss";

const UserDialog: React.FC<{ selectedUser: IUser; onClose: () => void }> = (
  props
) => {
  const { name, email, phone, gender, nat, location, dob } = props.selectedUser;
  const setInfoItem = (key: string, value: string | React.ReactNode) => {
    return (
      <Grid item xs={4}>
        <Paper variant="outlined" className="user-info-container">
          <Typography variant="body2">{key}</Typography>
          <Typography variant="body1">
            <span className="bold">{value}</span>
          </Typography>
        </Paper>
      </Grid>
    );
  };

  return (
    <Grid container spacing={3} p={3}>
      <Grid item xs={12} className="flex-item end">
        <IconButton onClick={props.onClose}>
          <CloseOutlined />
        </IconButton>
      </Grid>
      <Grid item xs={12} className="flex-item center">
        <Avatar
          src={props.selectedUser.picture["large"]}
          className="user-avatar"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" className="flex-item center">
          <span className="capitalize">
            {name.first} {name.last}
          </span>
        </Typography>
      </Grid>
      {setInfoItem("EMAIL", email)}
      {setInfoItem("PHONE", phone)}
      {setInfoItem(
        "GENDER",
        <Tooltip title={gender}>
          {gender === "male" ? <FaceIcon /> : <Face2Icon />}
        </Tooltip>
      )}
      {setInfoItem("NATIONALITY", nat)}
      {setInfoItem("CITY", <span className="capitalize">{location.city}</span>)}
      {setInfoItem("DATE OF BIRTH", new Date(dob).toDateString())}
    </Grid>
  );
};

export default UserDialog;
