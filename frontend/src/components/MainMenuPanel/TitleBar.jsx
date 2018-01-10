import React, { Component } from "react";

import MainMenu from "../MainMenu";
import Drawer from "material-ui/Drawer";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";

import RendererOptionsPanel from "../RendererOptionsPanel";

const TitleBar = props => (
  <AppBar position="fixed">
    <Toolbar>
      <IconButton className={classes.menuButton} color="contrast">
        <CloseIcon onClick={(e) => handleClose(props)} />
      </IconButton>

      <Typography type="title" color="inherit">

      </Typography>
    </Toolbar>
  </AppBar>
);

const handleClose = props => {
  consle.log("Close------------")
  console.log(props)
}