import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination
        count={10}
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            bgcolor: "#DEF9EC", // 更改背景顏色
            color: "#747E85", // 更改文字顏色
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            bgcolor: "#50BF8B",
            color: "#fefefe",
            fontWeight: "700",
          },
        }}
      />
      {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
    </Stack>
  );
}
