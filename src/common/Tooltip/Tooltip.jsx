'use strict';

const React = require('react');
const Trigger = require('rc-trigger');
const classNames = require('classnames');
const {Component, bind, pure} = require('../../Component');

const Placements = require('./Placements');

require('./Tooltip.less');

@pure
@bind
class Tooltip extends Component {
    static propTypes = {
        @pure children: React.PropTypes.any,

        @pure defaultVisible: React.PropTypes.bool,
        @pure visible: React.PropTypes.bool,

        @pure trigger: React.PropTypes.oneOfType([
            React.PropTypes.oneOf([
                'hover', 'click', 'focus'
            ]),
            React.PropTypes.arrayOf(React.PropTypes.oneOf([
                'hover', 'click', 'focus'
            ]))
        ]),

        @pure placement: React.PropTypes.oneOf([
            'left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
        ]),

        @pure className: React.PropTypes.string,
        @pure style: React.PropTypes.object,

        @pure animation: React.PropTypes.string,

        @pure enterDelay: React.PropTypes.number,
        @pure leaveDelay: React.PropTypes.number,
        @pure destroyOnHide: React.PropTypes.bool,

        @pure content: React.PropTypes.node.isRequired,
        @pure arrow: React.PropTypes.any,

        onShow: React.PropTypes.func,
        onHide: React.PropTypes.func,
    };

    static defaultProps = {
        defaultVisible: false,
        visible: null,

        trigger: ['hover'],
        placement: 'top',

        className: '',
        style: {},

        animation: '',
        arrow: null,

        enterDelay: 0,
        leaveDelay: 0.1,
        destroyOnHide: false
    };

    render() {
        let props = {
            ref: 'trigger',
            onPopupVisibleChange: this._changeHandler,

            popupClassName: this.props.className,
            prefixCls: 'Tooltip',

            popup: this._renderPopup(),
            action: this.props.trigger,
            builtinPlacements: Placements,
            popupPlacement: this.props.placement,
            popupAlign: {},
            popupTransitionName: '',
            popupAnimation: this.props.animation,
            defaultPopupVisible: this.props.defaultVisible,
            destroyPopupOnHide: this.props.destroyOnHide,
            popupStyle: this.props.style,
            mouseEnterDelay: this.props.enterDelay,
            mouseLeaveDelay: this.props.leaveDelay
        };

        if (this.props.visible !== null) props.popupVisible = this.props.visible;

        return React.createElement(Trigger, props, this.props.children);
    }

    _changeHandler(visible) {
        if (visible) this.emit('show');
        else this.emit('hide');
    }

    _renderPopup() {
        return [
            <div key="arrow" className="Tooltip-arrow">{this.props.arrow}</div>,
            <div key="content" className="Tooltip-content">{this.props.content}</div>
        ];
    }

    getDomNode() {
        return this.refs.trigger.popupDomNode;
    }

}


module.exports = Tooltip;
