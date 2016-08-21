import cssmodules from 'react-css-modules';
import React, {Component} from 'react'; // eslint-disable-line
import styles from './NewsFeed.css';

class NewsFeedItem extends Component {
    render() {
        return (
            <div styleName="feedItem">
                <div styleName="time">{this.props.time}</div>
                <div styleName="title">{this.props.title}</div>
            </div>
        );
    }
}

export default cssmodules(NewsFeedItem, styles);