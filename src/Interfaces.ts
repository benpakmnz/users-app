export interface IUserName {
  title: string;
  first: string;
  last: string;
}

export interface IUser {
  login: { username: string };
  name: IUserName;
  email: string;
  phone: string;
  gender: TGender;
  location: {
    city: string;
  };
  dob: number;
  nat: TNat;
  picture: { [key: string]: string };
}

export interface IBaseQueryParams {
  seed: string;
  results: number;
  maxPages: number;
}

export interface IFilterParams {
  gender: TGender | null;
  nat: TNat | null;
}

export const genderOptions = ["male", "female"] as const;
export type TGender = (typeof genderOptions)[number];
export const nationalityOptions = [
  "AU",
  "BR",
  "CA",
  "CH",
  "DE",
  "DK",
  "ES",
  "FI",
  "FR",
  "GB",
  "IE",
  "IN",
  "IR",
  "MX",
  "NL",
  "NO",
  "NZ",
  "RS",
  "TR",
  "UA",
  "US",
] as const;

export type TNat = (typeof nationalityOptions)[number];
