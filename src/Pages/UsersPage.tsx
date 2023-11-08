import React, { useEffect, useState } from "react";
import { IFilterParams, IUser } from "../shared/Interfaces";
import FilterComponent from "../Components/FilterComponent";
import UsersTable from "../Components/usersTable/UsersTable";
import CustomPagination from "../Components/CustomPagination";
import { Dialog, Divider, Grid } from "@mui/material";
import UserDialog from "../Components/userDialog/UserDialog";
import { StoreContext } from "../utils/store";
import { baseQueryParams, getUsers } from "../Services/userService";

const UsersPages: React.FC = () => {
  const { usersPages, addPages, setCurrentPage, currentFilter, currentPage } =
    React.useContext<any>(StoreContext);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handlePageUpdate = async (page: number) => {
    if (!usersPages.has(page)) {
      const res = await getUsers(page);
      if (res) {
        addPages(res.info.page, res.results, false);
      }
    } else {
      setCurrentPage(page);
    }
  };

  const handleFilter = async (filterBy: IFilterParams) => {
    const isReset = filterBy !== currentFilter;
    const res = await getUsers(1, filterBy);
    addPages(res.info.page, res.results, isReset);
    setCurrentPage(res.info.page);
  };

  const onUserSelected = (userEmail: string) => {
    const selected = usersPages
      .get(currentPage)
      ?.find((user: IUser) => user.login.username === userEmail);
    selected && setSelectedUser(selected);
  };

  useEffect(() => {
    handlePageUpdate(1);
  }, []);

  return (
    <>
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
    </>
  );
};

export default UsersPages;
