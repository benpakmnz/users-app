import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IFilterParams,
  IBaseQueryParams,
  IUser,
  TGender,
  TNat,
} from "./shared/interfaces";
import FilterComponent from "./Components/FilterComponent";
import UsersTable from "./Components/usersTable/UsersTable";
import CustomPagination from "./Components/CustomPagination";
import { Dialog, Divider, Grid } from "@mui/material";
import UserDialog from "./Components/userDialog/UserDialog";
import "./theme/index.scss";

const App: React.FC = () => {
  const [usersPages, setUsersPages] = useState<Map<number, IUser[]>>(new Map());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFilter, setCurrentFilter] = useState<{
    gender: TGender | null;
    nat: TNat | null;
  }>({ gender: null, nat: null });
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const baseQueryParams: IBaseQueryParams = {
    results: 10,
    maxPages: 1000,
    seed: "users_ls",
  };

  const handleQueryParams = (page: number, filterBy: IFilterParams): string => {
    let updatedQueryParams = `?results=${baseQueryParams.results}&page=${page}`;
    if (filterBy?.gender) {
      updatedQueryParams = `${updatedQueryParams}&gender=${filterBy.gender}`;
    }

    if (filterBy?.nat) {
      updatedQueryParams = `${updatedQueryParams}&nat=${filterBy.nat}`;
    }
    if (!filterBy.gender && !filterBy.nat) {
      updatedQueryParams = `${updatedQueryParams}&seed=users_ls`;
    }

    return updatedQueryParams;
  };

  const handlePageUpdate = (page: number) => {
    if (!usersPages.has(page)) {
      getUsers(page);
    } else {
      setCurrentPage(page);
    }
  };

  const handleFilter = (filterBy: IFilterParams) => {
    setCurrentFilter(filterBy);
    getUsers(1, filterBy);
  };

  const getUsers = async (page: number, newFilter?: IFilterParams) => {
    let params = handleQueryParams(page, newFilter || currentFilter);
    try {
      const res = await axios.get(`https://randomuser.me/api/1.0/${params}`);
      if (newFilter && newFilter !== currentFilter) {
        setUsersPages(() => {
          const newUsersList = new Map();
          return newUsersList.set(res.data.info.page, res.data.results);
        });
      } else {
        setUsersPages(
          (map) => new Map(map.set(res.data.info.page, res.data.results))
        );
      }

      setCurrentPage(res.data.info.page);
    } catch (err) {
      console.error(err);
    }
  };

  const onUserSelected = (userEmail: string) => {
    const selected = usersPages
      .get(currentPage)
      ?.find((user) => user.login.username === userEmail);
    selected && setSelectedUser(selected);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  return (
    <Grid container p={6}>
      <Grid item xs={12}>
        <FilterComponent onSubmit={handleFilter} />
      </Grid>
      <Grid item xs={12} my={3}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <UsersTable
          usersList={usersPages.get(currentPage)}
          onUserSelected={onUserSelected}
        />
      </Grid>
      <Grid item xs={12} my={3} className="flex-item center">
        <CustomPagination
          count={baseQueryParams.maxPages}
          currentPage={currentPage}
          onChange={handlePageUpdate}
        />
      </Grid>
      {selectedUser && (
        <Dialog
          onClose={() => setSelectedUser(null)}
          open={!!selectedUser}
          fullWidth
          maxWidth="md"
        >
          <UserDialog
            selectedUser={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        </Dialog>
      )}
    </Grid>
  );
};

export default App;
