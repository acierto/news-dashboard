import React, {Component} from 'react'; // eslint-disable-line

import NewsFeedItem from './NewsFeedItem';
import ReadFrame from './ReadFrame';

const $ = require('jquery');
const _ = require('lodash');

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {news: []};
    }

    componentDidMount() {
        $.get(this.props.source, (result) => {
            if (this.isMounted()) {
                this.setState({
                    news: result
                });
            }
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
            <div className="dashboard">
                <div className="newsFeed">{items}</div>
                <ReadFrame/>
            </div>
        );
    }
}