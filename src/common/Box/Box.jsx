'use strict';

const React = require('react');
const dom = require('ndom');
const {Component, bind, pure, getClass} = require('../../Component');

const ScrollBar = require('../ScrollBar/ScrollBar');

require('./Box.less');

let isBrowser = (typeof window !== 'undefined' && window && window.document && window.document.createElement);


@pure
@bind
class Box extends Component {
    @pure static propTypes = {
        className: React.PropTypes.string,
        style: React.PropTypes.object,
        xs: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string, React.PropTypes.object]),
        sm: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string, React.PropTypes.object]),
        md: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string, React.PropTypes.object]),
        lg: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string, React.PropTypes.object]),
        xl: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string, React.PropTypes.object]),
        wrapper: React.PropTypes.bool,

        scroll: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(['x', 'y'])])
    };

    static defaultProps = {
        className: '',
        style: {},
        xs: null,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        wrapper: false,
        scroll: false
    };

    constructor(props) {
        super(props);

        let width = isBrowser ? (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) : 1280;
        let size = 0;

        if (width >= 480) size = 1;
        if (width >= 768) size = 2;
        if (width >= 992) size = 3;
        if (width >= 1420) size = 4;

        this.state = {
            size: size,

            contentWidth: 0,
            contentHeight: 0,

            containerWidth: 0,
            containerHeight: 0
        };

        if (isBrowser) dom(window).on('resize', this._windowResizeHandler);
    }

    componentWillUnmount() {
        if (isBrowser) dom(window).off('resize', this._windowResizeHandler);
    }

    componentDidMount() {
        if (!this.props.scroll) return;

        let size = this._getSize();

        this.setState({
            containerWidth: size.width,
            containerHeight: size.height,

            contentTop: this._contentDiv.scrollTop,
            contentLeft: this._contentDiv.scrollLeft,
            contentWidth: this._contentDiv.scrollWidth,
            contentHeight: this._contentDiv.scrollHeight
        });

        setTimeout(() => this._updateSizes(), 50);
        setTimeout(() => this._updateSizes(), 100);
        setTimeout(() => this._updateSizes(), 500);
        setTimeout(() => this._updateSizes(), 1000);
    }

    componentDidUpdate() {
        if (!this.props.scroll) return;

        this._updateSizes();
    }

    render() {
        let events = this.wrapEvents(true);

        let xsSize = this.state.size >= 0;
        let smSize = this.state.size >= 1;
        let mdSize = this.state.size >= 2;
        let lgSize = this.state.size >= 3;
        let xlSize = this.state.size >= 4;

        let xsProp = this._formatSizeProp(this.props.xs);
        let smProp = this._formatSizeProp(this.props.sm);
        let mdProp = this._formatSizeProp(this.props.md);
        let lgProp = this._formatSizeProp(this.props.lg);
        let xlProp = this._formatSizeProp(this.props.xl);

        let boxStyles = this.props.style;
        if (xsSize && xsProp) boxStyles = Object.assign({}, boxStyles, xsProp);
        if (smSize && smProp) boxStyles = Object.assign({}, boxStyles, smProp);
        if (mdSize && mdProp) boxStyles = Object.assign({}, boxStyles, mdProp);
        if (lgSize && lgProp) boxStyles = Object.assign({}, boxStyles, lgProp);
        if (xlSize && xlProp) boxStyles = Object.assign({}, boxStyles, xlProp);

        let scrollable = !!this.props.scroll;

        let isFF = (isBrowser && !!window.sidebar);
        let width = 'calc(100% + ' + (isFF ? 17 : 0) + 'px)';
        let height = 'calc(100% + ' + (isFF ? 17 : 0) + 'px)';

        let contentX = this.state.contentWidth > 0 ? Math.min(1, this.state.containerWidth / this.state.contentWidth) * 100 : 0;
        let contentY = this.state.contentHeight > 0 ? Math.min(1, this.state.containerHeight / this.state.contentHeight) * 100 : 0;
        let offsetX = this.state.contentWidth > 0 ? Math.min(1, this.state.contentLeft / this.state.contentWidth) * 100 : 0;
        let offsetY = this.state.contentHeight > 0 ? Math.min(1, this.state.contentTop / this.state.contentHeight) * 100 : 0;

        return (
            <div
                ref={c => this._containerDiv = c}
                className={getClass(
                    'Box', this.props.className, {
                        'Box-scrollable': scrollable,
                        'Box-wrapper': this.props.wrapper === true,
                        'Box-size-xs': this.state.size == 0,
                        'Box-size-sm': this.state.size == 1,
                        'Box-size-md': this.state.size == 2,
                        'Box-size-lg': this.state.size == 3,
                        'Box-size-xl': this.state.size == 4
                    }
                )}
                style={boxStyles}
                {...events}
            >
                {this.props.wrapper === true ? this.props.children : (
                    scrollable ? (
                        <div className="Box-scroll">
                            <div ref={c => this._contentDiv = c} style={{width, height}} onScroll={this._scrollHandler}>
                                <div className="Box-content">{this.props.children}</div>
                            </div>
                            {this.props.scroll === true || this.props.scroll === 'x' ? <ScrollBar type="x" content={contentX} offset={offsetX} onScroll={this._scrollXHandler} /> : null}
                            {this.props.scroll === true || this.props.scroll === 'y' ? <ScrollBar type="y" content={contentY} offset={offsetY} onScroll={this._scrollYHandler} /> : null}
                        </div>
                    ) : (
                        <div ref={c => this._contentDiv = c} className="Box-content">
                            {this.props.children}
                        </div>
                    )
                )}
            </div>
        );
    }

    _getSize() {
        let node = this._containerDiv;
        let width, height, style;

        width = node.offsetWidth;
        height = node.offsetHeight;

        style = node.currentStyle || getComputedStyle(node);
        width -= (parseInt(style.paddingLeft) + parseInt(style.paddingRight) + parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth));
        height -= (parseInt(style.paddingTop) + parseInt(style.paddingBottom) + parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth));

        return {width, height};
    }

    _scrollHandler(e) {
        this._updateSizes();
    }

    _scrollXHandler(offsetX) {
        this._contentDiv.scrollLeft = offsetX * this._contentDiv.scrollWidth / 100;
        dom(this._contentDiv).emit('scroll');
    }

    _scrollYHandler(offsetY) {
        this._contentDiv.scrollTop = offsetY * this._contentDiv.scrollHeight / 100;
        dom(this._contentDiv).emit('scroll');
    }

    _windowResizeHandler() {
        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (width <= 480) this.setState({size: 0});
        else if (width <= 768) this.setState({size: 1});
        else if (width <= 992) this.setState({size: 2});
        else if (width <= 1420) this.setState({size: 3});
        else this.setState({size: 4});

        if (this.props.scroll) this._updateSizes();
    }

    _updateSizes() {
        if (!this._containerDiv) return;

        let size = this._getSize();

        let newState = {
            containerWidth: size.width,
            containerHeight: size.height,

            contentTop: this._contentDiv.scrollTop,
            contentLeft: this._contentDiv.scrollLeft,
            contentWidth: this._contentDiv.scrollWidth,
            contentHeight: this._contentDiv.scrollHeight
        };

        if (
            newState.containerWidth === this.state.containerWidth &&
            newState.containerHeight === this.state.containerHeight &&
            newState.contentTop === this.state.contentTop &&
            newState.contentLeft === this.state.contentLeft &&
            newState.contentWidth === this.state.contentWidth &&
            newState.contentHeight === this.state.contentHeight
        ) return;

        this._updates = this._updates || 0;
        this._updates ++;

        this.setState(newState);
    }

    _formatSizeProp(prop) {
        if (prop === null || typeof prop === 'object') {
            return prop;
        }

        if (typeof prop === 'string') {
            return {width: prop};
        }

        if (typeof prop === 'number') {
            return {width: (Math.floor((prop < 1 ? prop * 100 : prop) * 100) / 100) + '%'}
        }
    }

}


module.exports = Box;
