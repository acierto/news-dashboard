import React from 'react';

const ReadFrame = React.createClass({
    render: function() {
        return (
            <div className="readFrame">
                <object data="http://korrespondent.net/"></object>
            </div>
        );
    }
});

export { ReadFrame };
