import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { usersActions } from '../../actions';
import _ from 'lodash';
import { hashHistory } from 'react-router';

class UsersList extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    this.props.fetchUsers();
  }

  onClickRemove(user) {
    var r = confirm("Confirm to remove user " + user.email + "?");
    if (r == true) {      
      this.props.deleteUser(user._id);
    }
  }

  onClickNew() {
    hashHistory.push('/users/new');
  }

  renderUser(user) {
    return (
      <tr key={user._id}>
        <td className="text-center actions">
          <Link to={"users/" + user._id}>
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
          </Link>
          {
            this.props.authenticatedUser._id !== user._id ? 
            <Link onClick={() => this.onClickRemove(user)}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </Link> :
            _.noop()
          }
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
      <div className="users-list">
        <h3>
          Users List
        </h3>

        <button type="button" onClick={this.onClickNew} className="btn btn-link">
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
        </button>
        
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
  return { 
    users: state.users.list,
    authenticatedUser: state.auth.user
  };
}

export default connect(mapStateToProps, usersActions)(UsersList);
