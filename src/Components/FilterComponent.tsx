import React, { useState } from "react";
import {
  IFilterParams,
  genderOptions,
  nationalityOptions,
} from "../Interfaces";
import { Autocomplete, Button, TextField } from "@mui/material";

const FilterComponent: React.FC<{
  onSubmit: (filterBy: IFilterParams) => void;
}> = (props) => {
  const [filterBy, setFilterBy] = useState<IFilterParams>({
    gender: null,
    nat: null,
  });

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={genderOptions}
        sx={{ width: 300 }}
        onChange={(_event, value) =>
          setFilterBy({ ...filterBy, gender: value })
        }
        renderInput={(params) => <TextField {...params} label="Gender" />}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={nationalityOptions}
        sx={{ width: 300 }}
        onChange={(_event, value) => setFilterBy({ ...filterBy, nat: value })}
        renderInput={(params) => <TextField {...params} label="Nationality" />}
      />

      <Button onClick={() => props.onSubmit(filterBy)} variant="outlined">
        FILTER
      </Button>
    </>
  );
};

export default FilterComponent;
