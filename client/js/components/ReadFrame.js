import cssmodules from 'react-css-modules';
import React, {Component} from 'react'; // eslint-disable-line
import styles from './ReadFrame.css';

class ReadFrame extends Component {
    render() {
        return (
            <div styleName="readFrame">
                <object data="http://korrespondent.net/"/>
            </div>
        );
    }
}

export default cssmodules(ReadFrame, styles);