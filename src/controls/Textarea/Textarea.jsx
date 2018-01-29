'use strict';

const React = require('react');
const {Component, bind, pure, getClass} = require('../../Component');

require('./Textarea.less');

@pure
@bind
class Textarea extends Component {
    @pure static propTypes = {
        autoFocus: React.PropTypes.bool,
        autoSize: React.PropTypes.bool,
        className: React.PropTypes.string,
        defaultValue: React.PropTypes.any,
        disabled: React.PropTypes.bool,
        maxLength: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.number]),
        name: React.PropTypes.string,
        placeholder: React.PropTypes.any,
        readOnly: React.PropTypes.bool,
        style: React.PropTypes.object,
        tabIndex: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        value: React.PropTypes.any
    };

    static defaultProps = {
        autoFocus: false,
        autoSize: false,
        className: '',
        defaultValue: '',
        disabled: false,
        maxLength: false,
        name: '',
        placeholder: null,
        readOnly: false,
        style: {},
        tabIndex: null,
        value: null
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.value !== null ? props.value : props.defaultValue
        };

        this._textarea = null;
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            this._textarea.focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== null) this.setState({value: nextProps.value});
    }

    render() {
        let {onBlur, onFocus, onSelect, onScroll, onWheel, ...otherEvents} = this.wrapEvents(true, ['onChange']);

        return (
            <div
                className={getClass(
                    'Textarea', this.props.className, {
                        'Textarea-autosize': this.props.autoSize,
                        'Textarea-disabled': this.props.disabled,
                        'Textarea-readonly': this.props.readOnly
                    }
                )}
                style={this.props.style}

                {...otherEvents}
            >
                <textarea
                    ref={textarea => this._textarea = textarea}

                    cols="0"
                    disabled={this.props.disabled}
                    maxLength={this.props.maxLength}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    rows="0"
                    tabIndex={this.props.tabIndex}
                    value={this.state.value}

                    onChange={this._changeHandler}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    onScroll={onScroll}
                    onWheel={onWheel}
                />
            </div>
        );
    }

    _changeHandler(event) {
        var value = this._textarea.value;

        if (this.props.value === null) this.setState({value: value});

        if (this.props.autoSize) {
            this._textarea.style.height = 'auto';
            this._textarea.style.height = (this._textarea.scrollHeight) + 'px';
        }

        this.emit('change', value, event);
    }

    getValue() {
        return this.state.value;
    }
}


module.exports = Textarea;
