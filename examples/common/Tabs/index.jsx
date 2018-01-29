'use strict';

var React = require('react');
var Tabs = require('../../../src/common/Tabs');
var Tab = require('../../../src/common/Tabs/Tab.jsx');
var TabPanel = require('../../../src/common/Tabs/TabPanel.jsx');

class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: 't1'
        }
    }

    _tabsChangeHandler(value, component) {
        console.log(component);
        console.log('Selected tab:', value);
    }

    _controlledTabsChangeHandler(value, component) {
        this.setState({selected: value});
    }

    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Tabs + Default Selected</h2>

                    <Tabs defaultSelected="t1" onChange={this._tabsChangeHandler.bind(this)}>
                        <Tab name="t1">Tab 1</Tab>
                        <Tab name="t2">Tab 2</Tab>
                        <Tab name="t3">Tab 3</Tab>

                        <TabPanel name="t1">Panel 1</TabPanel>
                        <TabPanel name="t2">Panel 2</TabPanel>
                        <TabPanel name="t3">Panel 3</TabPanel>
                    </Tabs>
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Atrribute</h2>

                    <Tabs className="custom-class" defaultSelected="t1" onChange={this._tabsChangeHandler.bind(this)}>
                        <Tab className="custom-class" style={{color: 'red'}} name="t1">Tab 1</Tab>
                        <Tab className="custom-class" style={{color: 'green'}} name="t2">Tab 2</Tab>
                        <Tab className="custom-class" style={{color: 'blue'}} name="t3">Tab 3</Tab>

                        <TabPanel className="custom-class" style={{color: 'red'}} name="t1">Panel 1</TabPanel>
                        <TabPanel className="custom-class" style={{color: 'green'}} name="t2">Panel 2</TabPanel>
                        <TabPanel className="custom-class" style={{color: 'blue'}} name="t3">Panel 3</TabPanel>
                    </Tabs>
                </div>

                <div className="example">
                    <h2>onChange Callback</h2>

                    <Tabs defaultSelected="t1" onChange={this._tabsChangeHandler.bind(this)}>
                        <Tab name="t1">Tab 1</Tab>
                        <Tab name="t2">Tab 2</Tab>
                        <Tab name="t3">Tab 3</Tab>

                        <TabPanel name="t1">Panel 1</TabPanel>
                        <TabPanel name="t2">Panel 2</TabPanel>
                        <TabPanel name="t3">Panel 3</TabPanel>
                    </Tabs>
                </div>

                <div className="example">
                    <h2>Controlled Tabs</h2>

                    <Tabs selected={this.state.selected} onChange={this._controlledTabsChangeHandler.bind(this)}>
                        <Tab name="t1">Tab 1</Tab>
                        <Tab name="t2">Tab 2</Tab>
                        <Tab name="t3">Tab 3</Tab>

                        <TabPanel name="t1">Panel 1</TabPanel>
                        <TabPanel name="t2">Panel 2</TabPanel>
                        <TabPanel name="t3">Panel 3</TabPanel>
                    </Tabs>
                </div>

                <div className="example">
                    <h2>Allow Closing (Only for non-controlled components)</h2>

                    <Tabs allowClosing>
                        <Tab name="t1">Tab 1</Tab>
                        <Tab name="t2">Tab 2</Tab>
                        <Tab name="t3">Tab 3</Tab>

                        <TabPanel name="t1">Panel 1</TabPanel>
                        <TabPanel name="t2">Panel 2</TabPanel>
                        <TabPanel name="t3">Panel 3</TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}


module.exports = Demo;
