import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import UserRow from "./UserRow";
import { IUser } from "../../shared/interfaces";

const UsersTable: React.FC<{
  usersList?: IUser[];
  onUserSelected: (userName: string) => void;
}> = (props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Email address</TableCell>
            <TableCell>Phone #</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Date of birth</TableCell>
            <TableCell>Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.usersList?.map((user) => (
            <UserRow
              key={user.login.username}
              user={user}
              onClick={() => props.onUserSelected(user.login.username)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
