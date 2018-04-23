import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';

const styles = {
  card: {}
};

const UserDetails = props => {
  const { user } = props;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Card>
      <CardContent>{fullName}</CardContent>
    </Card>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string
  })
};

export default withStyles(styles)(UserDetails);
