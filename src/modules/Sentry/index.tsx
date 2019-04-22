import * as React from 'react';
import * as Sentry from '@sentry/browser';

interface State {
  error: null | Error;
  eventId: null | string;
}

class SentryReport extends React.Component<{}, State> {
  
  state = { 
    error: null, 
    eventId: null 
  };

  componentDidCatch(error: Error, errorInfo: object) {
    this.setState({ error });
    Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({eventId});
    });
  }

  handleClickReport = () => {
    const { eventId } = this.state;
    if (eventId) {
      Sentry.showReportDialog({ eventId });
    }
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <a onClick={this.handleClickReport}>Report feedback</a>
      );
    } else {
      // when there's not an error, render children untouched
      return this.props.children;
    }
  }
}

export default SentryReport;