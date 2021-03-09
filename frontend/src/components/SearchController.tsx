import React from "react";
import { Paper, Box, Grid } from "@material-ui/core";

const SearchController = () => {
  return (
    <Paper>
      <Box p={2}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        ></Grid>
      </Box>
    </Paper>
  );
};

export default SearchController;
