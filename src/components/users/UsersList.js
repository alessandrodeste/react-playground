import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { usersActions } from '../../actions';
import _ from 'lodash';

class UsersList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  renderUser(user) {
    return (
      <li className="list-group-item" key={user._id}>
        <Link to={"users/" + user._id}>
          <h4 className="list-group-item-heading">{user.first_name} {user.family_name}</h4>
          <p className="list-group-item-text">{user._id} - {user.username} {user.email}</p>
        </Link>
      </li>
    );
  }

  render() {
    if (!this.props.users)
      return (
        <div>Loading...</div>
      );
      
    return (
    <ul className="list-group">
      {_.map(this.props.users, this.renderUser.bind(this))}
    </ul>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users.list };
}

export default connect(mapStateToProps, usersActions)(UsersList);
