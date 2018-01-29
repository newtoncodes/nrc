'use strict';

require('./Avatar.less');

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');


@pure
@bind
class Avatar extends Component {
    @pure static propTypes = {
        className: React.PropTypes.string,
        name: React.PropTypes.string,
        placeholder: React.PropTypes.bool,
        size: React.PropTypes.string,
        style: React.PropTypes.object,
        url: React.PropTypes.string
    };

    static defaultProps = {
        className: null,
        name: null,
        placeholder: false,
        size: '50x50',
        style: {},
        url: '{name}.{size}.jpg'
    };

    render() {
        let {name, size, url} = this.props;

        let tmp = size.split('x');
        let width = parseInt(tmp[0]);
        let height = parseInt(tmp[1]);

        let style = Object.assign({}, this.props.style);
        style.width = width + 'px';
        style.height = height + 'px';

        if (this.props.placeholder) {
            return (
                <div className={getClass('Avatar', 'Avatar-placeholder', this.props.className)} style={style} />
            );
        }
        else {
            if (width <= 50 && height <= 50) size = '50x50';
            if (width <= 100 && height <= 100) size = '100x100';
            if (width <= 200 && height <= 200) size = '200x200';
            if (width <= 300 && height <= 300) size = '300x300';

            url = url.replace(/\{size}/g, size).replace(/\{name}/g, name);
            url = url.toLowerCase();

            return (
                <div className={getClass('Avatar', this.props.className)} style={style}>
                    <img src={name ? url : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
                </div>
            );
        }
    }
}


module.exports = Avatar;
