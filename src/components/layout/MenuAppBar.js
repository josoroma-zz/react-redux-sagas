import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

function MenuAppBar(props) {
  const { classes } = props;

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Sagas
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
