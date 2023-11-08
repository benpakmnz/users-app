import React, { useState, createContext } from "react";
import { IFilterParams, IUser } from "../shared/Interfaces";

export const StoreContext = createContext({
  usersPages: new Map(),
  addPages: (page: number, data: IUser, filter: IFilterParams) => {},
  currentPage: 1,
  currentFilter: {},
  setCurrentPage: (page: number) => {},
});

const StoreContextProvider = (props: { children: React.ReactElement }) => {
  const [usersPages, setUsersPages] = useState<Map<number, IUser[]>>(new Map());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFilter, setCurrentFilter] = useState<IFilterParams>({});

  const addPages = (page: number, data: IUser, filter: IFilterParams) => {
    if (filter !== currentFilter) {
      setUsersPages(() => {
        const newUsersList = new Map();
        return newUsersList.set(page, data);
      });
      setCurrentFilter(filter);
    } else {
      setUsersPages((map: any) => new Map(map.set(page, data)));
    }
    setCurrentPage(page);
  };

  return (
    <StoreContext.Provider
      value={{
        usersPages,
        addPages,
        setCurrentPage,
        currentFilter,
        currentPage,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
