'use strict';

const React = require('react');
const dom = require('ndom');
const {Component, bind, pure, getClass} = require('../../Component');

require('./ScrollBar.less');

let isBrowser = (typeof window !== 'undefined' && window && window.document && window.document.createElement);


@pure
@bind
class ScrollBar extends Component {
    @pure static propTypes = {
        @pure className: React.PropTypes.string,
        @pure style: React.PropTypes.object,
        @pure type: React.PropTypes.oneOf(['x', 'y']).isRequired,
        @pure content: React.PropTypes.number.isRequired,
        @pure offset: React.PropTypes.number.isRequired,

        onScroll: React.PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: '',
        style: {}
    };

    state = {
        dragging: false,
        active: false,
        hover: false
    };

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        clearTimeout(this._timeout);

        if (!this.state.active && this._offset !== this.props.offset && (typeof this._offset !== 'undefined')) {
            this._offset = this.props.offset;
            this.setState({active: true});
        }

        this._offset = this.props.offset;

        this._timeout = setTimeout(() => this.setState({active: false}), 500);
    }

    componentWillUnmount() {
        clearTimeout(this._timeout);
    }

    render() {
        let events = this.wrapEvents(true);
        let type = (this.props.type !== 'x' && this.props.type !== 'y') ? 'y' : this.props.type;
        let styles = {position: 'absolute'};

        if (type === 'x') {
            styles.width = this.props.content + '%';
            styles.left = Math.min(this.props.offset, 100 - this.props.content) + '%';
        } else {
            styles.height = this.props.content + '%';
            styles.top = Math.min(this.props.offset, 100 - this.props.content) + '%';
        }

        let transition = this._transition > 1;
        this._transition = this._transition || 0;
        this._transition ++;

        return (
            <div
                ref={e => this._railDiv = e}
                className={getClass('ScrollBar', this.props.className, 'ScrollBar-' + type, {
                    'ScrollBar-dragging': this.state.dragging,
                    'ScrollBar-active': this.state.active,
                    'ScrollBar-full': this.props.content > 99,
                    'ScrollBar-transition': transition
                })}
                style={this.props.style}
                {...this.wrapEvents(true, ['onScroll', 'onClick'])}
                onClick={this._clickHandler}
            >
                <div
                    ref={e => this._sliderDiv = e}
                    style={styles}
                    onMouseDown={this._downHandler}
                />
            </div>
        );
    }

    _clickHandler(e) {
        if (e.target === this._sliderDiv) return this.wrap('onClick')(e);

        let percent = 0;

        if (this.props.type === 'x') {
            let cx = e.clientX - dom(this._railDiv).offset.left;
            let ex = this._sliderDiv.offsetLeft;
            if (cx > ex) ex += this._sliderDiv.clientWidth;
            else if (cx < ex) ex -= this._sliderDiv.clientWidth;
            percent = (ex / this._railDiv.clientWidth) * 100;
        } else {
            let cy = e.clientY - dom(this._railDiv).offset.top;
            let ey = this._sliderDiv.offsetTop;
            if (cy > ey) ey += this._sliderDiv.clientHeight;
            else if (cy < ey) ey -= this._sliderDiv.clientHeight;
            percent = (ey / this._railDiv.clientHeight) * 100;
        }

        this.wrap('onClick')(e);
        this.props.onScroll && this.props.onScroll(Math.max(Math.min(percent, 100 - this.props.content), 0));
    }

    _downHandler(e) {
        if (!isBrowser) return;

        let w = dom(window);
        w.on('mouseup', this._upHandler);
        w.on('mousemove', this._moveHandler);

        this._mouse = {
            x: e.clientX,
            y: e.clientY
        };
        this._element = {
            x: this._sliderDiv.offsetLeft,
            y: this._sliderDiv.offsetTop
        };

        dom(document.body).addClass('ScrollBar-disable-select');

        this.setState({dragging: true});
    }

    _moveHandler(e) {
        if (!this.state.dragging) return;

        let percent = 0;

        if (this.props.type === 'x') {
            let ex = this._element.x + e.clientX - this._mouse.x;
            percent = (ex / this._railDiv.clientWidth) * 100;
        } else {
            let ey = this._element.y + e.clientY - this._mouse.y;
            percent = (ey / this._railDiv.clientHeight) * 100;
        }

        this.props.onScroll && this.props.onScroll(Math.max(Math.min(percent, 100 - this.props.content), 0));
    }

    _upHandler(e) {
        let w = dom(window);
        w.off('mouseup', this._upHandler);
        w.off('mousemove', this._moveHandler);

        dom(document.body).removeClass('ScrollBar-disable-select');

        this.setState({dragging: false});
    }
}


module.exports = ScrollBar;
