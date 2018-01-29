'use strict';


class Column {
    key = null;
    header = '';
    width= null;
    sorting = true;
    sorted = false;
    className = null;

    constructor(key, header, width, sorting, render, sort, className) {
        this.key = key;
        if (header) this.header = header;
        if (width) this.width = width;
        if (render) this.render = render;
        if (typeof sorting !== 'undefined') this.sorting = sorting;
        if (sort) this.sort = sort;
        if (className) this.className = className;
        this.sort = this.sort.bind(this);
        this.render = this.render.bind(this);
    }

    render (cell, data, key) {
        return cell;
    }

    sort (row1, row2) {
        if (!this.key) return 0;

        let data1 = row1[this.key];
        let data2 = row2[this.key];

        let type = (typeof data1);

        switch (type) {
            case 'number':
                return data1 - data2;
            case 'boolean':
                return (data1 ? 1 : 0) - (data2 ? 1 : 0);
            case 'object':
                if (data1 instanceof Date) return data1.getTime() - data2.getTime();
                return 0;
        }

        return data1.localeCompare(data2);
    }
}


module.exports = Column;