'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const Demos = {
    common: require('../common'),
    controls: require('../controls')
};

require('./Demo.less');


class DemoComponent extends React.Component {
    constructor(){
        super();

        let storage = window.sessionStorage.getItem('Demo-menu');
        let active = window.location.hash.replace('#', '');

        this.state = {
            active: active || null,
            menu: storage !== 'false'
        };

        this._toggleMenuHandler = this._toggleMenuHandler.bind(this);

        window.onhashchange = () => {
            let active = window.location.hash.replace('#', '');
            this.setState({active: active || null});
        };
    }

    _toggleMenuHandler() {
        window.sessionStorage.setItem('Demo-menu', this.state.menu ? 'false' : 'true');
        this.setState({menu: !this.state.menu});
    }

    render() {
        let active = this.state.active;
        let demo = <div style={{fontSize: '20px', fontWeight: 'bold', paddingTop: '10px'}}>Please select a demo from the lest on the left.</div>;

        if (active && Demos[active.split('/')[0]] && Demos[active.split('/')[0]][active.split('/')[1]]) demo = React.createElement(Demos[active.split('/')[0]][active.split('/')[1]]);

        return (
            <div className="Demo">
                <div className={'Demo-menu ' + (this.state.menu ? '' : 'Demo-menu-closed')}>
                    <div className="Demo-menu-toggle" onClick={this._toggleMenuHandler}><span>TOGGLE MENU</span></div>

                    <div className="Demo-menu-content">
                        <div>
                            <label>Common</label>

                            <a href={'#common/Accordion'} className={'common/Accordion' === active ? 'active' : ''}>Accordion</a>
                            <a href={'#common/Alert'} className={'common/Alert' === active ? 'active' : ''}>Alert</a>
                            <a href={'#common/Box'} className={'common/Box' === active ? 'active' : ''}>Box</a>
                            <a href={'#common/Button'} className={'common/Button' === active ? 'active' : ''}>Button</a>
                            <a href={'#common/Chart'} className={'common/Chart' === active ? 'active' : ''}>Chart</a>
                            <a href={'#common/ControlGroup'} className={'common/ControlGroup' === active ? 'active' : ''}>ControlGroup</a>
                            <a href={'#common/Dropdown'} className={'common/Dropdown' === active ? 'active' : ''}>Dropdown</a>
                            <a href={'#common/Icon'} className={'common/Icon' === active ? 'active' : ''}>Icon</a>
                            <a href={'#common/Modal'} className={'common/Modal' === active ? 'active' : ''}>Modal</a>
                            <a href={'#common/Pager'} className={'common/Pager' === active ? 'active' : ''}>Pager</a>
                            <a href={'#common/ProgressBar'} className={'common/ProgressBar' === active ? 'active' : ''}>ProgressBar</a>
                            <a href={'#common/ScrollBar'} className={'common/ScrollBar' === active ? 'active' : ''}>ScrollBar</a>
                            <a href={'#common/Social'} className={'common/Social' === active ? 'active' : ''}>Social</a>
                            <a href={'#common/Spinner'} className={'common/Spinner' === active ? 'active' : ''}>Spinner</a>
                            <a href={'#common/Table'} className={'common/Table' === active ? 'active' : ''}>Table</a>
                            <a href={'#common/Tabs'} className={'common/Tabs' === active ? 'active' : ''}>Tabs</a>
                            <a href={'#common/Tooltip'} className={'common/Tooltip' === active ? 'active' : ''}>Tooltip</a>
                            <a href={'#common/Video'} className={'common/Video' === active ? 'active' : ''}>Video</a>
                        </div>

                        <div>
                            <label>Controls</label>

                            <a href={'#controls/Captcha'} className={'controls/Captcha' === active ? 'active' : ''}>Captcha</a>
                            <a href={'#controls/Checkbox'} className={'controls/Checkbox' === active ? 'active' : ''}>Checkbox</a>
                            <a href={'#controls/DateTime'} className={'controls/DateTime' === active ? 'active' : ''}>DateTime</a>
                            <a href={'#controls/Form'} className={'controls/Form' === active ? 'active' : ''}>Form</a>
                            <a href={'#controls/Input'} className={'controls/Input' === active ? 'active' : ''}>Input</a>
                            <a href={'#controls/Radio'} className={'controls/Radio' === active ? 'active' : ''}>Radio</a>
                            <a href={'#controls/Select'} className={'controls/Select' === active ? 'active' : ''}>Select</a>
                            <a href={'#controls/Slider'} className={'controls/Slider' === active ? 'active' : ''}>Slider</a>
                            <a href={'#controls/Textarea'} className={'controls/Textarea' === active ? 'active' : ''}>Textarea</a>
                        </div>
                    </div>
                </div>

                <div className="Demo-content" style={{paddingLeft: this.state.menu ? '220px' : '20px'}}>
                    <div>{demo}</div>
                </div>

                <div style={{clear: 'both'}}></div>
            </div>
        );
    }
}


class Demo {
    constructor() {
        ReactDOM.render(React.createElement(DemoComponent, {}), document.getElementById('app'));
    }
}


module.exports = Demo;
