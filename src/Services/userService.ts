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
  if (filterBy?.nat) {
    updatedQueryParams = `${updatedQueryParams}&nat=${filterBy.nat}`;
  }
  if (filterBy?.gender) {
    updatedQueryParams = `${updatedQueryParams}&gender=${filterBy.gender}`;
  } else {
    // bug in API - when filtering by gender and adding seed - false results
    // only pass seed if no filter by gender
    updatedQueryParams = `${updatedQueryParams}&seed=users_ls`;
  }
  return updatedQueryParams;
};
