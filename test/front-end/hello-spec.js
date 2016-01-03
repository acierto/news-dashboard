import React from 'react/addons';
import { Dashboard } from '../../client/js/components/Dashboard';
import { expect } from 'chai';

describe('HelloComponent', function () {

    it('runs a test function', function () {
        console.log('test is ok');
    });

    it('passes a quite simple test', function () {
        expect(1 + 4).to.equal(5);
    });

    it('says hello in a class of hello', function () {
        var TestUtils = React.addons.TestUtils;
        var hello = TestUtils.renderIntoDocument(
            <Dashboard message='Hello World'/>
        );

        var helloFound = TestUtils.findRenderedDOMComponentWithClass(hello, 'hello');

        expect(React.findDOMNode(helloFound).textContent).to.equal('Hello World');
    });
});
