import React from 'react';

const Dashboard = React.createClass({
  render: function() {
    return (
      <div className="dashboard">
        <div className="newsFeed"></div>
        <div className="readFrame"></div>
      </div>
    );
  }
});

export { Dashboard };
