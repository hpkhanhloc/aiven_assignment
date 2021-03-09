import React from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  CardContent,
} from "@material-ui/core";

const Home: React.FC = () => {
  return (
    <Container>
      <Paper>
        <Box p={2}>
          <CardContent>
            <Typography variant="h5">
              Web application for Aiven interview assignment
            </Typography>
            <Typography variant="body1">
              Frontend: React, TypeScript, Material-UI
            </Typography>
            <Typography variant="body1">
              Backend: FastAPI, Python deployed on Cloud Run GCP
            </Typography>
            <Typography variant="body1">
              Funtions: Support filter by cloud provider, region, sort by
              distance. Futher more it is possible to sort by click on each
              property in table header. Navigate to Search view for more detail.
            </Typography>
            <Typography variant="body1">
              UI: Show/hide drawer in top left app bar. Support table
              pagination.
            </Typography>
            <Typography variant="body1">
              CI/CD: use Github action for firebase deploy
            </Typography>
            <Typography variant="body1">Author: Loc Hoang - 3.2021</Typography>
          </CardContent>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
