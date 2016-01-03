import React from 'react';

const NewsFeedItem = React.createClass({
    render: function() {
        return (
            <div>{this.props.title}</div>
        );
    }
});

export { NewsFeedItem };
