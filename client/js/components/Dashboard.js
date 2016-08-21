import $ from 'jquery';
import _ from 'lodash';
import React, {Component} from 'react'; // eslint-disable-line
import cssmodules from 'react-css-modules';

import NewsFeedItem from './NewsFeedItem';
import ReadFrame from './ReadFrame';
import styles from './Dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {news: []};
    }

    componentDidMount() {
        $.get(this.props.source, (result) => {
            this.setState({
                news: result
            });
        });
    }

    render() {
        const items = [];

        const news = this.state.news;
        if (news && news.collections) {
            _.forEach(news.collections[0].data, (item, index) => {
                items.push(<NewsFeedItem key={index} title={item.title} time={item.time} href={item.href}/>);
            });
        }

        return (
            <div>
                <div styleName="newsFeed">{items}</div>
                <ReadFrame/>
            </div>
        );
    }
}

export default cssmodules(Dashboard, styles);