import React from 'react';

const NewsFeedItem = React.createClass({
    render: function() {
        return (
            <div className="feedItem">
                <div className="time">{this.props.time}</div>
                <div className="title">{this.props.title}</div>
            </div>
        );
    }
});

export { NewsFeedItem };
