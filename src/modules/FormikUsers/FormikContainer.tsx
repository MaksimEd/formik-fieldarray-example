import * as React from 'react';
import { withFormik, Form, FormikProps, FieldArray } from 'formik';

import withStyles, { WithStyles, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import { compose } from 'redux';
import FormikExpansion from './FormikExpansion';
import * as yup from 'yup';

const styles: StyleRulesCallback = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

interface FormValues {
  users: {
    tel: string[];
    address: string[];
  }[];
}

interface Props extends WithStyles<typeof styles> { }

const Formik = ({ classes, values, errors }: Props & FormikProps<FormValues>) => {
  // const [ expanded, setExpanded] = React.useState<string | false>(false);
  // tslint:disable-next-line:no-console
  console.log('values', JSON.stringify(values, null, 2));
  // tslint:disable-next-line:no-console
  console.log('errors', JSON.stringify(errors, null, 2));
  return (
    <Form style={{maxWidth: 800, margin: '20px auto'}}>
      <FieldArray
        name="users"
        render={arrayUsers => (
          <>
            {values.users && values.users.map((user, index) => (
              <FormikExpansion key={index} classes={classes} user={user} index={index} arrayUsers={arrayUsers} />
            ))}
            <button type="button" onClick={() => arrayUsers.push({address: [], tel: []})}>Add a user</button>
          </>
        )}
      />
      <div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
};

const schema = yup.object().shape({
  users: yup.array()
  .of(
    yup.object().shape({
      address: yup.array().of(yup.string().min(2, '2 минимум')).required('Required'),
      tel: yup.array().of(yup.string().min(2)).required('Required')
    })
  )
  .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
  .min(3, 'Minimum of 3 friends'),
});

export default compose(
  withStyles(styles),
  withFormik<{}, FormValues>({
    mapPropsToValues: () => ({ users: [] }),

    // Custom sync validation
    validationSchema: schema,

    handleSubmit: (values, { setSubmitting }) => {
      setTimeout(
        () => {
          // tslint:disable-next-line:no-console
          console.log('submit', values);
          setSubmitting(false);
        }, 
        1000
      );
    },

    displayName: 'BasicFormFormik',
  })
)(Formik) as any;