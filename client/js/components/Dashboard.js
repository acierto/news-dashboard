import React from 'react';

import { NewsFeedItem } from './NewsFeedItem';

const $ = require('jquery');
const _ = require('lodash');

const Dashboard = React.createClass({

    getInitialState: function () {
        return {
            news: []
        };
    },

    componentDidMount: function () {
        $.get(this.props.source, function (result) {
            if (this.isMounted()) {
                this.setState({
                    news: result
                });
            }
        }.bind(this));
    },

    render: function () {

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
                <div className="readFrame"></div>
            </div>
        );
    }
});

export { Dashboard };
