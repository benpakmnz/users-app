import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button } from "@mui/material";
import {
  IFilterParams,
  IBaseQueryParams,
  IUser,
  TGender,
  TNat,
} from "./Interfaces";
import FilterComponent from "./FilterComponent";

const App: React.FC = () => {
  const [usersPages, setUsersPages] = useState<Map<number, IUser[]>>(new Map());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFilter, setCurrentFilter] = useState<{
    gender: TGender | null;
    nat: TNat | null;
  }>({ gender: null, nat: null });

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

  useEffect(() => {
    console.log(usersPages);
  }, [usersPages]);

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  useEffect(() => {
    getUsers(1);
  }, []);

  return (
    <>
      <Button
        disabled={currentPage >= baseQueryParams.maxPages}
        onClick={() => handlePageUpdate(currentPage + 1)}
      >
        +1
      </Button>
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageUpdate(currentPage - 1)}
      >
        -1
      </Button>
      <Button
        disabled={currentPage >= baseQueryParams.maxPages}
        onClick={() => handlePageUpdate(currentPage + 100)}
      >
        +100
      </Button>
      <FilterComponent onSubmit={handleFilter} />
      <h1>{currentPage}</h1>
      <ul>
        {usersPages.get(currentPage)?.map((user) => (
          <li key={user.email}>
            <Avatar src={user.picture["large"]} />
            {`${user.name.title} ${user.name.first} ${user.name.last} ${user.nat}`}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
