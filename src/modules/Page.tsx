import * as React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';

const Page = ({
  match,
  history
}: RouteComponentProps) => {
  return (
    <div>
      <Link to="/login" children={<div>login</div>} />
      <Link to="/object"  children={<div>object</div>} />
      components Page
      <div onClick={() => history.push('/login')}>PUSH</div>
    </div>
  );
};

export default withRouter(Page);