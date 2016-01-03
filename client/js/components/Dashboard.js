import React from 'react';

const Dashboard = React.createClass({
  render: function() {
    return (
      <h1 className="hello">{this.props.message}</h1>
    );
  }
});

export { Dashboard };
