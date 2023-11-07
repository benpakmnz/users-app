import { TableRow, TableCell, Avatar } from "@mui/material";
import React from "react";
import { IUser } from "../../Interfaces";

const UserRow: React.FC<{ user: IUser; onClick: () => void }> = (props) => {
  const { name, email, phone, gender, location, dob, nat, picture, login } =
    props.user;
  return (
    <TableRow
      hover
      onClick={props.onClick}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>
        <Avatar src={picture["thumbnail"]} />
      </TableCell>
      <TableCell>
        {name.first} {name.last}
      </TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>{location.city}</TableCell>
      <TableCell>{new Date(dob).toDateString()}</TableCell>
      <TableCell>{nat}</TableCell>
    </TableRow>
  );
};

export default UserRow;
