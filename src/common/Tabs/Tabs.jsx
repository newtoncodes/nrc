'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');
const Tab = require('./Tab.jsx');
const TabPanel = require('./TabPanel.jsx');

require('./Tabs.less');


@pure
@bind
class Tabs extends Component {
    static propTypes = {
        @pure allowClosing: React.PropTypes.bool,
        @pure className: React.PropTypes.string,
        @pure defaultSelected: React.PropTypes.string,
        @pure selected: React.PropTypes.string,
        @pure style: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        allowClosing: null,
        className: '',
        defaultSelected: null,
        selected: null,
        style: {}
    };

    constructor(props) {
        super(props);
        this.state = { selected: null };
    }

    componentWillMount() {
        this.setState({selected: this.props.selected !== null ? this.props.selected : this.props.defaultSelected});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== null) this.setState({selected: nextProps.selected});
    }

    render() {
        let events = this.wrapEvents(true, ['onChange']);
        let children = this._mapChildren(this.props.children);

        return (
            <div
                className={getClass(
                    'Tabs', this.props.className
                )}
                 style={this.props.style}
                 {...events}
            >
                {children}
            </div>
        );
    }

    _mapChildren(children) {
        return React.Children.map(children, (child) => {
            if (!child) {
                return null;
            }

            if (child.type === Tab) {
                return React.cloneElement(child, {
                    onClick: this._tabClickHandler,
                    selected: child.props.name === this.state.selected
                });
            } else if (child.type === TabPanel) {
                return React.cloneElement(child, {
                    visible: child.props.name === this.state.selected
                });
            } else {
                if (child.props && child.props.children) {
                    return React.cloneElement(child, {
                        children: this._mapChildren(child.props.children)
                    });
                }
                else {
                    return child;
                }
            }
        }, this);
    }

    _tabClickHandler(name, component) {
        if (this.props.selected !== null) {
            this.emit('change', name, component);
        }
        else {
            if (this.state.selected !== name) {
                this.setState({ selected: name });
                this.emit('change', name, component);
            }
            else if (this.props.allowClosing) {
                this.setState({ selected: null });
                this.emit('change', name, component);
            }
        }
    }
}


module.exports = Tabs;
