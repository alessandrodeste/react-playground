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
      <tr key={user._id}>
        <td className="text-center">
          <Link to={"users/" + user._id}>
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          </Link>
        </td>
        <td>{user.email}</td>
        <td>{user.first_name}</td>
        <td>{user.family_name}</td>
      </tr>
    );
  }

  render() {
    if (!this.props.users)
      return (
        <div>Loading...</div>
      );
      
    return (
      <div>
        <h3>Users List</h3>

        <table className="table table-striped table-hover">
          <thead>
          <tr>  
            <th></th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          </thead>
          <tbody>
          {_.map(this.props.users, this.renderUser.bind(this))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users.list };
}

export default connect(mapStateToProps, usersActions)(UsersList);
