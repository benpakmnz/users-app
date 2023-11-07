import { Stack, Pagination } from "@mui/material";
import React from "react";

const CustomPagination: React.FC<{
  count: number;
  currentPage: number;
  onChange: (page: number) => void;
}> = (props) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={props.count}
        variant="outlined"
        color="primary"
        onChange={(_event, page) => props.onChange(page)}
        page={props.currentPage}
      />
    </Stack>
  );
};

export default CustomPagination;
