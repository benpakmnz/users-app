import React, { useState, createContext } from "react";
import { IFilterParams, IUser } from "../shared/Interfaces";

export interface ctx {
  usersPages: Map<number, IUser[]>;
  addPages: (page: number, data: IUser, filter?: IFilterParams) => void;
  currentPage: number;
  currentFilter: IFilterParams;
  setCurrentPage: (page: number) => void;
}

export const StoreContext = createContext<ctx>({
  usersPages: new Map(),
  addPages: (page: number, data: IUser, filter?: IFilterParams) => {},
  currentPage: 1,
  currentFilter: {},
  setCurrentPage: (page: number) => {},
});

const StoreContextProvider = (props: { children: React.ReactElement }) => {
  const [usersPages, setUsersPages] = useState<Map<number, IUser[]>>(new Map());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentFilter, setCurrentFilter] = useState<IFilterParams>({});

  const addPages = (page: number, data: IUser, filter?: IFilterParams) => {
    if (filter && filter !== currentFilter) {
      setUsersPages(() => {
        const newUsersList = new Map();
        return newUsersList.set(page, data);
      });
    } else {
      setUsersPages((map: any) => new Map(map.set(page, data)));
    }
    setCurrentPage(page);
    filter && setCurrentFilter(filter);
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
