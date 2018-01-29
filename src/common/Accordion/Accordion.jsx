'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');

const AccordionPanel = require('./AccordionPanel.jsx');

require('./Accordion.less');


@pure
@bind
class Accordion extends Component {
    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure defaultExpanded: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]),
        @pure expanded: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]),
        @pure multiple: React.PropTypes.bool,
        @pure style: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        defaultExpanded: [],
        expanded: null,
        multiple: false,
        onChange: () => {},
        style: {}
    };

    constructor(props) {
        super(props);

        let expanded = props.expanded;
        if (expanded !== null && typeof expanded === 'string') expanded = [expanded];

        let defaultExpanded = props.defaultExpanded;
        if (typeof defaultExpanded === 'string') defaultExpanded = [defaultExpanded];

        this.state = {
            expanded: props.expanded !== null ? expanded : defaultExpanded
        };
    }

    componentWillReceiveProps(nextProps) {
        let expanded = nextProps.expanded;
        if (expanded !== null && typeof expanded === 'string') expanded = [expanded];

        if (nextProps.expanded !== null) this.setState({expanded: expanded});
    }

    render() {
        return (
            <div className={getClass('Accordion', this.props.className)} style={this.props.style} {...this.wrapEvents(true, ['onChange'])}>
                {this._mapChildren(this.props.children)}
            </div>
        );
    }

    _mapChildren(children) {
        return React.Children.map(children, (child) => {
            if (!child) {
                return null;
            }

            if (child.type === AccordionPanel) {
                if (!child.props.name) {
                    console.error('No name is defined for one of the AccordionPanels.');
                }

                return React.cloneElement(child, {
                    onClick: this._accordionButtonClickHandler,
                    expanded: this.state.expanded.indexOf(child.props.name) !== -1
                });
            } else {
                if (child.props && child.props.children) {
                    return React.cloneElement(child, {
                        children: this._mapChildren(child.props.children)
                    });
                } else {
                    return child;
                }
            }
        }, this);
    }

    _accordionButtonClickHandler(name, event) {
        let expanded = this.state.expanded.concat();
        let isExpanded = expanded.includes(name);

        if (!this.props.multiple) {
            expanded = isExpanded ? [] : [name];

            if (this.props.expanded === null) this.setState({expanded: expanded});
        } else {
            if (isExpanded) expanded.splice(expanded.indexOf(name), 1);
            else expanded.push(name);

            if (this.props.expanded === null) this.setState({expanded: expanded});
        }

        this.emit('change', (this.props.multiple) ? expanded : (expanded[0] ? [expanded[0]] : []), event);
    }
}


module.exports = Accordion;
module.exports.Panel = AccordionPanel;
