import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { usersActions } from '../../actions';
import { hashHistory } from 'react-router';
import diff from 'object-diff';

class UserDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isNew: true
    };
  }

  handleFormSubmit(user, dispatch, props) {console.log("submitted", this.state.isNew, user);
    if (this.state.isNew) {
      // save user
      this.props.createUser(user);

      // go back to users list
      hashHistory.push('/users');
    } else {
      // get only touched fields
      const changedValues = diff(props.initialValues, user);

      // save user
      this.props.updateUser(user._id, changedValues);

      // go back to users list
      hashHistory.push('/users');
    }
  }

  componentWillMount() {
    if (this.props.params.id) {
      this.setState({
        isNew: false
      });
      this.props.fetchUser(this.props.params.id);
    } else {
      this.props.newUser();
    }
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

  renderField({ input, label, type, meta: { touched, error }, disabled }) {
    let disabledAttr =  {};
    if (disabled === true) disabledAttr =  { disabled: true };
    return (
      <fieldset className="form-group">
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} className="form-control" {...disabledAttr} />
          {touched && (error && <div className="error">{error}</div>)}
        </div>
      </fieldset>
    );
  }

  onClickBack() {
    hashHistory.push('/users');
  }

  render() {
    const { handleSubmit } = this.props;

    if (!this.props.user ) return <div>Loading</div>;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="username" disabled={!this.state.isNew} component={this.renderField} type="text" value={this.props.user.username} label="Username" />
        <Field name="email" disabled={!this.state.isNew} component={this.renderField} type="text" value={this.props.user.email} label="Mail" />
        <Field name="first_name" component={this.renderField} type="text" value={this.props.user.first_name} label="First Name" />
        <Field name="family_name" component={this.renderField} type="text" value={this.props.user.family_name} label="Family Name" />
        <Field name="password" component={this.renderField} type="password" label="Password" />
        <Field name="confirm_password" component={this.renderField} type="password" label="Confirm Password" />
        
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary" disabled={this.props.pristine}>{ this.state.isNew ? "Create" : "Save" }</button>
        <button onClick={this.onClickBack} className="btn btn-default">Back</button>
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