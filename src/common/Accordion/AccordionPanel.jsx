'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');


@pure
@bind
class AccordionPanel extends Component {
    static propTypes = {
        @pure className: React.PropTypes.string,
        @pure expanded: React.PropTypes.bool,
        @pure name: React.PropTypes.string.isRequired,
        @pure section: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]),
        @pure style: React.PropTypes.object,
        onClick: React.PropTypes.func
    };

    static defaultProps = {
        className: '',
        expanded: false,
        name: null,
        section: null,
        style: {}
    };

    _sectionClickHandler(event) {
        this.emit('click', this.props.name, event);
    }

    render() {
        let events = this.wrapEvents(true, ['onClick']);

        return (
            <div
                className={getClass(
                    'Accordion-panel', {
                        'Accordion-panel-expanded': this.props.expanded
                    }, this.props.className
                )}
                style={this.props.style}
                {...events}
            >
                <div className="Accordion-panel-section" onClick={this._sectionClickHandler}>{this.props.section}</div>
                <div className="Accordion-panel-content">{this.props.children}</div>
            </div>
        );
    }
}


module.exports = AccordionPanel;
