import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import {
  requiredTitle,
  requiredDescription,
  minLength10,
  minLength20,
} from '../validators';

class StreamForm extends Component {
  renderInput = ({ input, label, meta: { touched, error } }) => {
    const className = `field ${touched && error ? 'error' : ''}`;
    return (
      <div className={className}>
        <label htmlFor="title" type="text">{label}</label>
        <input id="title" type="text" {...input} autoComplete="off" />
        {touched && error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form
        name="create-form"
        className="ui form error"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field
          name="title"
          component={this.renderInput}
          label="title"
          validate={[requiredTitle, minLength10]}
        />
        <Field
          name="description"
          component={this.renderInput}
          label="description"
          validate={[requiredDescription, minLength20]}
        />
        <button type="submit" className="ui button primary">Submit</button>
      </form>
    );
  }
}

StreamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'streamForm' })(StreamForm);
