import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination
        count={10} //之後根據比數改寫，目前先寫死
        // variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            bgcolor: "#F7F8F5 !important",
            color: "#747E85 !important",
            fontWeight: "700 !important",
            fontSize: "15px !important",
            marginInline: "8px !important",
            marginBottom: "60px",
            "&:hover": {
              bgcolor: "#CCEADD !important",
              color: "#505A60 !important",
            },
          },
          "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
            bgcolor: "#50BF8B !important",
            color: "#FEFEFE !important",
            fontWeight: "700 !important",
            fontSize: "15px !important",
          },
          "& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected:hover": {
            bgcolor: "#36A075 !important",
            color: "#FEFEFE !important",
            fontWeight: "700 !important",
            fontSize: "15px !important",
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "#747E85 !important",
            bgcolor: "transparent !important",
            fontWeight: "700 !important",
            fontSize: "15px !important",
          },
          "& .MuiPaginationItem-ellipsis:hover": {
            color: "#747E85 !important",
            bgcolor: "transparent !important",
            fontWeight: "700 !important",
            fontSize: "15px !important",
          },
        }}
      />
      {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
    </Stack>
  );
}
