import React, {Component} from 'react'; // eslint-disable-line

export default class NewsFeedItem extends Component {
    render() {
        return (
            <div className="feedItem">
                <div className="time">{this.props.time}</div>
                <div className="title">{this.props.title}</div>
            </div>
        );
    }
}