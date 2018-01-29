'use strict';

const React = require('react');
const getClass = require('classnames');
const {bind, pure} = require('./decorators');

const DOM_EVENTS = [
    'onKeyDown', 'onKeyPress', 'onKeyUp',
    'onFocus', 'onBlur', 'onSelect',
    'onScroll', 'onWheel',
    'onChange', 'onInput', 'onSubmit',
    'onClick', 'onContextMenu', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit',
    'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave',
    'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp',
    //'onTouchCancel onTouchEnd onTouchMove onTouchStart'
];


class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.___wrapped = {};
    }

    wrap(...args) {
        let fn = args[0] || '';
        if (args.length > 1) fn = [].concat(args);

        if (Array.isArray(fn)) {
            let result = {};

            fn.forEach(key => result[key] = this.wrap(key));

            return result;
        }

        if (!this.___wrapped[fn]) this.___wrapped[fn] = (...args) => {
            if (!this.props[fn]) return;
            return this.props[fn](...args);
        };

        return this.___wrapped[fn];
    }

    wrapEvents(domEvents, exclude) {
        if (arguments.length === 1 && typeof arguments[0] != 'boolean') {
            exclude = arguments[0];
            domEvents = false;
        }

        exclude = exclude || [];

        let events = Object.keys(this.constructor.propTypes || {}).filter(prop => prop.match(/^on[A-Z0-9][A-Za-z0-9]/));

        if (domEvents) events = events.concat(
            DOM_EVENTS.filter(e => (events.indexOf(e) === -1 && exclude.indexOf(e) === -1))
        ).filter(e => exclude.indexOf(e) === -1);

        return this.wrap(events);
    }

    emit(event, ...args) {
        let handler = this.props['on' + (event[0].toUpperCase() + event.substr(1))];
        handler && handler(...args);

        return this;
    }
}


module.exports = Component;
module.exports.Component = Component;
module.exports.pure = pure;
module.exports.bind = bind;
module.exports.getClass = getClass;