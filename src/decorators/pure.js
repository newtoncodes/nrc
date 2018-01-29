'use strict';

const shallowEqual = require('fbjs/lib/shallowEqual');


function shouldComponentUpdateProps(current, next, types) {
    if (!types) return !shallowEqual(current, next);

    let currentNew = {};
    let nextNew = {};

    let props = Object.keys(types).filter(prop => types[prop]['__isPure']);

    props.forEach(prop => {
        currentNew[prop] = (current[prop] instanceof Date) ? current[prop].valueOf() : current[prop];
        nextNew[prop] = (next[prop] instanceof Date) ? next[prop].valueOf() : next[prop];
    });

    currentNew.children = current.children;
    nextNew.children = next.children;

    return !shallowEqual(currentNew, nextNew);
}

function shouldComponentUpdate(nextProps, nextState) {
    let should = false;
    let anyway = this['shouldComponentUpdateAnyway'] || false;

    should = should || shouldComponentUpdateProps(this.props, nextProps, this.constructor.propTypes);
    should = should || !shallowEqual(this.state, nextState);
    should = should || (anyway && anyway(nextProps, nextState));

    return should;
}


function pureClass(Component) {
    Component.prototype.shouldComponentUpdate = shouldComponentUpdate;

    return Component;
}

function pureProp(target, key, descriptor) {
    descriptor = Object.assign({}, descriptor);

    let init = descriptor.initializer;

    descriptor.initializer = function () {
        let fn = init().bind(null);
        fn.__isPure = true;

        return fn;
    };

    return descriptor;
}

function pureProps(target, key, descriptor) {
    descriptor = Object.assign({}, descriptor);

    let init = descriptor.initializer;

    descriptor.initializer = function () {
        let props = init();

        Object.keys(props).forEach(prop => {
            if (!props[prop] && props[prop] !== '') return console.error('Component propType for ' + target.name + '#' + prop + ' is null or undefined.');
            props[prop].__isPure = true;
        });

        return props;
    };

    return descriptor;
}


module.exports = function pure(...args) {
    if (args.length === 1) return pureClass(...args);
    else if (typeof args[0] === 'function') return pureProps(...args);
    else return pureProp(...args);
};

module.exports.pureClass = pureClass;
