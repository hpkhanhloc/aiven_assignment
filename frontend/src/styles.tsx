import { makeStyles, createMuiTheme, Theme } from "@material-ui/core/styles";

const drawerWidth = 120;
const useStyles = () => {
  return makeStyles((theme: Theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position: "fixed",
      background: theme.palette.primary.light,
    },
    drawer: {
      width: drawerWidth,
      position: "fixed",
      zIndex: theme.zIndex.drawer,
      flexShrink: 0,
    },
    drawerBackdrop: {
      zIndex: theme.zIndex.drawer - 1,
    },
    drawerPaperOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      width: theme.spacing(8),
      whiteSpace: "nowrap",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolBar: {
      height: 80,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    appBarLogo: {
      "&:hover": {
        cursor: "pointer",
      },
      margin: theme.spacing(1),
      flexDirection: "row",
      alignItems: "center",
    },
    navigationButton: {
      justifyContent: "flex-start",
      margin: theme.spacing(1),
    },
    tableHead: {
      head: {
        backgroundColor: "black",
        color: "white",
      },
    },
  }));
};

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    error: {
      main: "#eb3b5a",
    },
    warning: {
      main: "#fa8231",
    },
    info: {
      main: "#2d98da",
    },
    success: {
      main: "#20bf6b",
    },
  },
  typography: {
    fontFamily: "Merriweather",
    h6: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h4: {
      fontWeight: "bold",
    },
    subtitle1: {
      fontWeight: "bold",
    },
    button: {
      fontWeight: "bold",
    },
  },
});

export { useStyles, lightTheme };
