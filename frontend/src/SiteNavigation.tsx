import React, { useState } from "react";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Drawer,
  Box,
  IconButton,
  Backdrop,
  Tooltip,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./styles";

const SiteNavigation: React.FC = () => {
  const classes = useStyles()();
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOnClick = (address: string) => {
    history.push(address);
    handleDrawerClose();
  };

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item container xs alignItems="center">
              <Box
                onClick={() => history.push("/")}
                display="flex"
                className={classes.appBarLogo}
              >
                <Typography
                  color="textPrimary"
                  variant="h6"
                  noWrap
                  style={{ marginLeft: 8 }}
                >
                  Aiven Assignment
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Tooltip title="Navigation menu">
                <IconButton
                  aria-label="toggle drawer"
                  onClick={handleDrawerToggle}
                  style={{ marginRight: -18 }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerPaperOpen]: open,
          [classes.drawerPaperClose]: !open,
        })}
        variant="persistent"
        anchor="right"
        classes={{
          paper: clsx({
            [classes.drawerPaperOpen]: open,
            [classes.drawerPaperClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolBar} />
        <Button
          size="large"
          className={classes.navigationButton}
          startIcon={<HomeIcon />}
          onClick={() => handleOnClick("/")}
        >
          Home
        </Button>
        <Button
          size="large"
          className={classes.navigationButton}
          startIcon={<SearchIcon />}
          onClick={() => handleOnClick("/search")}
        >
          Search
        </Button>
      </Drawer>
      <Backdrop
        open={open}
        onClick={handleDrawerClose}
        className={classes.drawerBackdrop}
      />
    </>
  );
};

export default SiteNavigation;
