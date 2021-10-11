import React from 'react';
import { Result, Button } from 'antd';

class ErrorHandler extends React.Component {
  state = {
    error: false
  };

  componentDidCatch(error, info) {
    console.error(error, info);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return (
        <Result
          status="error"
          title="Error"
          subTitle={'An error occurred while processing your request. Please try again by refreshing the page'}
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh
            </Button>
          ]}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorHandler;
