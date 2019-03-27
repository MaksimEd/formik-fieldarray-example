import * as React from 'react';
import { Field, FieldArray, FieldArrayRenderProps } from 'formik';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
  user: {
    tel: string[];
    address: string[];
  };
  index: number;
  classes: any;
  arrayUsers: FieldArrayRenderProps;
}

const FormikExpansion = ({classes, user, index, arrayUsers}: Props) => {
  return (
    <ExpansionPanel 
      expanded={true} 
      // onChange={(event, exp) => setExpanded(exp ? 'panel1' : false)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>General settings</Typography>
        <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div style={{marginLeft: 50}}>
          <FieldArray
            name={`users.${index}.address`}
            // tslint:disable-next-line:jsx-no-lambda
            render={arrayUser => (
              <div>
                {user.address && user.address.length > 0 ? (
                  <>
                   {user.address.map((adress, indA) => (
                      <div key={indA}>
                        <Field name={`users.${index}.address.${indA}`} />
                        <button type="button" onClick={() => arrayUser.remove(indA)}>
                          - adress
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => arrayUser.push('')}>
                      + adress
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => arrayUser.push('')}>Add a adress</button>
                )}
              </div>
            )}
          />
          <button type="button" onClick={() => arrayUsers.remove(index)}>
            - user
          </button>
        </div>  
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default FormikExpansion;