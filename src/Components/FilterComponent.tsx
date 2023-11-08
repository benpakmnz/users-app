import React, { useState } from "react";
import {
  IFilterParams,
  genderOptions,
  nationalityOptions,
} from "../shared/Interfaces";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";

const FilterComponent: React.FC<{
  onSubmit: (filterBy: IFilterParams) => void;
}> = (props) => {
  const [filterBy, setFilterBy] = useState<IFilterParams>({});

  return (
    <Grid container spacing={2} className="flex-item end">
      <Grid item>
        <Autocomplete
          disablePortal
          size="small"
          id="gender-combo-box"
          options={genderOptions}
          sx={{ width: 300 }}
          onChange={(_event, value) =>
            setFilterBy({ ...filterBy, gender: value ? value : undefined })
          }
          renderInput={(params) => <TextField {...params} label="Gender" />}
        />
      </Grid>
      <Grid item>
        <Autocomplete
          disablePortal
          size="small"
          id="nat-combo-box"
          options={nationalityOptions}
          sx={{ width: 300 }}
          onChange={(_event, value) =>
            setFilterBy({ ...filterBy, nat: value ? value : undefined })
          }
          renderInput={(params) => (
            <TextField {...params} label="Nationality" />
          )}
        />
      </Grid>
      <Grid item>
        <Button onClick={() => props.onSubmit(filterBy)} variant="contained">
          FILTER
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterComponent;
