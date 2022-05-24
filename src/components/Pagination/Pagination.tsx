import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function BasicPagination() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Current page: {page}</Typography>
      <Pagination count={10}
        variant="outlined"
        shape="rounded"
        color="primary"
        size="large"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}
