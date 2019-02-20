import * as React from 'react';
import { withFormik, FormikProps, FormikErrors, Form } from 'formik';
import { TextField, InputAdornment, IconButton, Button } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';

interface FormValues {
  email: string;
  password: string;
}

const Login = ({ 
  values,
  touched, 
  errors, 
  isSubmitting,
  handleChange,
  handleBlur
  }: FormikProps<FormValues>) => {
  const [showPassword, toggleShowPassword] = React.useState(false);
  return (
    <div>
      <Link to="/login" children={<div>login</div>} />
      <Link to="/object"  children={<div>object</div>} />
      <Form style={{maxWidth: 400, margin: '20px auto'}}>
        <TextField
          style={{marginBottom: 10}}
          fullWidth
          error={touched.email && !!errors.email}
          variant={'outlined'}
          type={'email'}
          name={'email'}
          label={'email'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          helperText={touched.email && errors.email && errors.email || '\u00A0'}
        />
        <TextField
          style={{marginBottom: 10}}
          fullWidth
          error={touched.password && !!errors.password}
          variant={'outlined'}
          type={showPassword ? 'text' : 'password'}
          name={'password'}
          label={'password'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          helperText={touched.password && errors.password && errors.password || '\u00A0'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => toggleShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type={'submit'} variant={'contained'} color={'primary'} disabled={isSubmitting}>Submit</Button>
      </Form>
    </div>
  );
};
export default withFormik<{}, FormValues>({
  mapPropsToValues: () => ({ email: '', password: '' }),

  // Custom sync validation
  validate: values => {
    const errors: FormikErrors<FormValues>  = {};

    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(
      () => {
        // tslint:disable-next-line:no-console
        console.log(values);
        setSubmitting(false);
      }, 
      1000
    );
  },

  displayName: 'BasicForm',
})(Login);
