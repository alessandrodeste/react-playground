import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { usersActions } from '../../actions';

class UsersList extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.params.id);
  }
 
  render() {
    // TODO
    if (!this.props.user) return <div>empty</div>;
    return (
        <div>{this.props.params.id} - {this.props.user.first_name} {this.props.user.family_name}</div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.users.selected };
}

export default connect(mapStateToProps, usersActions)(UsersList);
