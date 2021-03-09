import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Paper,
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Cloud } from "../types";

interface SearchControllerProps {
  data: Array<Cloud>;
  setFilteredData: Dispatch<SetStateAction<Cloud[]>>;
}

const SearchController: React.FC<SearchControllerProps> = ({
  data,
  setFilteredData,
}) => {
  const [checkedShorted, setCheckedShorted] = useState<boolean>(false);
  const [provider, setProvider] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [userLatitude, setUserLatitude] = useState<number>();
  const [userLongitude, setUserLongitude] = useState<number>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLatitude(position.coords.latitude);
      setUserLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (data) {
      if (!provider && !region && !checkedShorted) {
        setFilteredData(data);
      } else {
        let filteredData = data.filter((cloud) =>
          cloud.cloud_provider.toLowerCase().match(provider.toLowerCase())
        );
        if (region) {
          filteredData = filteredData.filter((cloud) =>
            cloud.geo_region.toLowerCase().match(region.toLowerCase())
          );
        }
        if (checkedShorted) {
          if (
            typeof userLatitude !== "undefined" &&
            typeof userLongitude !== "undefined"
          ) {
            filteredData.sort((a, b) => {
              const subtractBetweenObjects =
                getDistance(
                  a.geo_latitude,
                  a.geo_longitude,
                  userLatitude,
                  userLongitude
                ) -
                getDistance(
                  b.geo_latitude,
                  b.geo_longitude,
                  userLatitude,
                  userLongitude
                );
              if (subtractBetweenObjects > 0) {
                return 1;
              }
              if (subtractBetweenObjects < 0) {
                return -1;
              }
              return 0;
            });
          }
        }
        setFilteredData(filteredData);
      }
    }
  }, [data, provider, region, checkedShorted]);

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const getDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the earth in km
    const distanceLat = deg2rad(lat2 - lat1);
    const distanceLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(distanceLon / 2) *
        Math.sin(distanceLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distance in km
  };

  return (
    <Paper>
      <Box p={2}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs container justify="center">
            <TextField
              label="Provider"
              InputLabelProps={{ shrink: true }}
              onChange={(event) => setProvider(event.target.value)}
            />
          </Grid>
          <Grid item xs container spacing={3}>
            <Grid item>
              <TextField
                label="Region"
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setRegion(event.target.value)}
              />
            </Grid>
            <Grid item xs>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedShorted}
                    onChange={() => setCheckedShorted(!checkedShorted)}
                    name="Shortest Distance"
                  />
                }
                label="Shortest Distance"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SearchController;
