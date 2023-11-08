import axios from "axios";
import { IBaseQueryParams, IFilterParams } from "../shared/Interfaces";

export const getUsers = async (page: number, filterBy?: IFilterParams) => {
  let params = handleQueryParams(page, filterBy);
  try {
    const res = await axios.get(`https://randomuser.me/api/1.0/${params}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const baseQueryParams: IBaseQueryParams = {
  results: 10,
  maxPages: 1000,
  seed: "users_ls",
};

const handleQueryParams = (page: number, filterBy?: IFilterParams): string => {
  let updatedQueryParams = `?results=${baseQueryParams.results}&page=${page}`;
  if (filterBy?.gender) {
    updatedQueryParams = `${updatedQueryParams}&gender=${filterBy.gender}`;
  }

  if (filterBy?.nat) {
    updatedQueryParams = `${updatedQueryParams}&nat=${filterBy.nat}`;
  }
  if (!filterBy?.gender && !filterBy?.nat) {
    updatedQueryParams = `${updatedQueryParams}&seed=users_ls`;
  }

  return updatedQueryParams;
};
