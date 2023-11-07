import { TableRow, TableCell, Avatar, Tooltip } from "@mui/material";
import React from "react";
import { IUser } from "../../shared/interfaces";
import FaceIcon from "@mui/icons-material/Face";
import Face2Icon from "@mui/icons-material/Face2";

const UserRow: React.FC<{ user: IUser; onClick: () => void }> = (props) => {
  const { name, email, phone, gender, location, dob, nat, picture } =
    props.user;
  return (
    <TableRow hover onClick={props.onClick} sx={{ cursor: "pointer" }}>
      <TableCell>
        <Avatar src={picture["thumbnail"]} />
      </TableCell>
      <TableCell className="capitalize">
        {name.first} {name.last}
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>
        <Tooltip title={gender}>
          {gender === "male" ? <FaceIcon /> : <Face2Icon />}
        </Tooltip>
      </TableCell>
      <TableCell className="capitalize">{location.city}</TableCell>
      <TableCell>{new Date(dob).toDateString()}</TableCell>
      <TableCell>{nat}</TableCell>
    </TableRow>
  );
};

export default UserRow;
