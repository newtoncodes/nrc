'use strict';


function bindMethod(target, key, descriptor) {
    if (descriptor.configurable === false) return descriptor;

    let fn = descriptor.value;

    if (typeof descriptor.value !== 'function') {
        throw new Error(`@bind decorator can only be applied to methods not: ${typeof fn}`);
    }

    delete descriptor.writable;
    delete descriptor.value;

    descriptor.configurable = true;
    descriptor.get = function() {
        if (this === target.prototype || this.hasOwnProperty(key)) {
            return fn;
        }

        let boundFn = fn.bind(this);

        Object.defineProperty(this, key, {
            value: boundFn,
            configurable: true,
            writable: true
        });

        return boundFn;
    };

    return descriptor;
}

function bindClass(target) {
    let keys = Object.getOwnPropertyNames(target.prototype);
    if (typeof Object.getOwnPropertySymbols === 'function') {
        keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }

    keys.forEach(key => {
        if (key === 'constructor') return;

        let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

        if (typeof descriptor.value === 'function') {
            Object.defineProperty(target.prototype, key, bindMethod(target, key, descriptor));
        }
    });

    return target;
}


module.exports = function bind(...args) {
    if (args.length === 1) return bindClass(...args);
    else return bindMethod(...args);
};