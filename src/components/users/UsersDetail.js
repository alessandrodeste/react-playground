import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { usersActions } from '../../actions';

class UserDetail extends Component {

  handleFormSubmit(user) {
    // TODO: how to have only touched fields?
    this.props.updateUser(user._id, _.pickBy(user, function(value, key) {
        return _.includes(['first_name', 'family_name'], key) || (key === 'password' && !!value);
      })
    );
  }

  componentWillMount() {
    this.props.fetchUser(this.props.params.id);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <fieldset className="form-group">
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} className="form-control" />
          {touched && (error && <div className="error">{error}</div>)}
        </div>
      </fieldset>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    
    if (!this.props.user) return <div>empty</div>;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="first_name" component={this.renderField} type="text" value={this.props.user.first_name} label="First Name" />
        <Field name="family_name" component={this.renderField} type="text" value={this.props.user.family_name} label="Family Name" />
        <Field name="password" component={this.renderField} type="password" label="Password" />
        <Field name="confirm_password" component={this.renderField} type="password" label="Confirm Password" />
        
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary" disabled={this.props.pristine}>Sign in</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.first_name) {
    errors.first_name = 'Please enter a first name';
  }

  if (!formProps.family_name) {
    errors.family_name = 'Please enter a family name';
  }

  if (formProps.password && formProps.password !== formProps.confirm_password) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

const extendedComponent = reduxForm({
  form: 'userdetail',
  validate
})(UserDetail);

function mapStateToProps(state) {
  return { 
    errorMessage: state.users.error,
    user: state.users.selected,
    initialValues: state.users.selected
  };
}

export default connect(mapStateToProps, usersActions)(extendedComponent);