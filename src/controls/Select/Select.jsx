'use strict';

const React = require('react');
const BaseSelect = require('react-select');
const classNames = require('classnames');
const Fetch = require('isomorphic-fetch');

const {Component, bind, pure, getClass} = require('../../Component');

require('./Select.less');

@pure
@bind
class Select extends Component {
    static propTypes = {
        @pure autoFocus: React.PropTypes.bool,
        @pure className: React.PropTypes.string,
        @pure style: React.PropTypes.object,
        @pure readOnly: React.PropTypes.bool,
        @pure disabled: React.PropTypes.bool,
        @pure multiple: React.PropTypes.bool,
        @pure name: React.PropTypes.string,
        @pure tabIndex: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        @pure search: React.PropTypes.bool,

        @pure minChars: React.PropTypes.number,

        @pure loadingText: React.PropTypes.string,
        @pure searchingText: React.PropTypes.string,
        @pure searchPromptText: React.PropTypes.string,
        @pure noResultsText: React.PropTypes.string,
        @pure addLabelText: React.PropTypes.string,

        @pure placeholder: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]),

        @pure newOptions: React.PropTypes.bool,
        @pure newOptionCreator: React.PropTypes.func,

        @pure clearButton: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]),
        @pure clearAllButton: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string, React.PropTypes.element, React.PropTypes.node]),

        @pure options: React.PropTypes.array,
        @pure optionRenderer: React.PropTypes.func,

        @pure selected: React.PropTypes.any,
        @pure defaultSelected: React.PropTypes.any,

        @pure valueRenderer: React.PropTypes.func,

        @pure href: React.PropTypes.string,
        @pure optionsProvider: React.PropTypes.func,
        @pure cache: React.PropTypes.bool,

        @pure accessoriesLeft: React.PropTypes.arrayOf(React.PropTypes.element),
        @pure accessoriesRight: React.PropTypes.arrayOf(React.PropTypes.element),

        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
    };

    static defaultProps = {
        accessoriesLeft: [],
        accessoriesRight: [],

        className: '',
        style: {},

        name: '',

        selected: null,
        defaultSelected: [],

        href: null
    };

    constructor(props) {
        super(props);

        let selected = props.selected;
        if (selected !== null && !Array.isArray(selected)) selected = [selected];

        let defaultSelected = props.defaultSelected;
        if (defaultSelected !== null && !Array.isArray(defaultSelected)) defaultSelected = [defaultSelected];

        if (props.multiple === true) this.state = {focused: false, selected: props.selected !== null ? selected : defaultSelected};
        else this.state = {focused: false, selected: props.selected !== null ? selected.slice(0, 1) : defaultSelected.slice(0, 1)};

    }

    componentWillReceiveProps(nextProps) {
        let selected = nextProps.selected;
        if (selected !== null && !Array.isArray(selected)) selected = [selected];

        if (nextProps.selected !== null) {
            if (this.props.multiple === true) this.setState({selected: selected});
            else this.setState({selected: selected.slice(0, 1)});
        }
    }

    render() {
        let {onFocus, onBlur, ...events} = this.wrapEvents(true, ['onChange', 'onFocus', 'onBlur']);
        let CurrentBaseSelect = BaseSelect;
        if (this.props.href || this.props.optionsProvider) CurrentBaseSelect = BaseSelect.Async;

        let props = {
            escapeClearsValue: false,
            value: this.props.multiple ? (this.state.selected || null) : (this.state.selected ? this.state.selected[0] : null),
            className: 'Select-inner',
            disabled: (this.props.disabled || this.props.readOnly),

            onChange: this._changeHandler,
            onFocus: this._focusHandler,
            onBlur: this._blurHandler
        };

        if (this.props.autoFocus !== undefined) props.autofocus = this.props.autoFocus;
        if (this.props.cache !== undefined) props.cache = this.props.cache;
        if (this.props.clearButton !== undefined) props.clearable = !!this.props.clearButton;
        if (this.props.clearButton !== undefined) props.clearValueText = this.props.clearButton;
        if (this.props.clearAllButton !== undefined) props.clearAllText = this.props.clearAllButton;
        if (this.props.loadingText !== undefined) props.loadingPlaceholder = this.props.loadingText;
        if (this.props.minChars !== undefined) props.minimumInput = this.props.minChars;
        if (this.props.multiple !== undefined) props.multi = this.props.multiple;
        if (this.props.newOptions !== undefined) props.allowCreate = this.props.newOptions;
        if (this.props.newOptionCreator !== undefined) props.newOptionCreator = this.props.newOptionCreator;
        if (this.props.noResultsText !== undefined) props.noResultsText = this.props.noResultsText;
        if (this.props.options !== undefined) props.options = this.props.options;
        if (this.props.optionRenderer !== undefined) props.optionRenderer = this.props.optionRenderer;
        if (this.props.placeholder !== undefined) props.placeholder = this.props.placeholder;
        if (this.props.search !== undefined) props.searchable = this.props.search;
        if (this.props.addLabelText !== undefined) props.addLabelText = this.props.addLabelText;
        if (this.props.searchingText !== undefined) props.searchingText = this.props.searchingText;
        if (this.props.searchPromptText !== undefined) props.searchPromptText = this.props.searchPromptText;
        if (this.props.tabIndex !== undefined) props.tabIndex = this.props.tabIndex;
        if (this.props.valueRenderer !== undefined) props.valueRenderer = this.props.valueRenderer;
        if (this.props.href || this.props.optionsProvider !== undefined) props.loadOptions = this._optionsProvider;

        let name = this.props.name;
        let multiple = (name && name.substr(-2) === '[]');

        let accessoriesLeft = this._mapAccessories(this.props.accessoriesLeft);
        let accessoriesRight = this._mapAccessories(this.props.accessoriesRight);

        return (
            <div
                className={getClass(
                    'Select', this.props.className, {
                        'Select-accessories': accessoriesLeft.length || accessoriesRight.length,
                        'Select-disabled': this.props.disabled,
                        'Select-readonly': this.props.readOnly,
                        'Select-focused': this.state.focused
                    }
                )}
                 style={this.props.style}
                 {...events}
            >
                {(accessoriesLeft.length) ? (<div className="accessories">
                    {accessoriesLeft}
                </div>) : null}

                <CurrentBaseSelect {...props} />

                {multiple ? this.getValues().map((value, index) => {
                    return <input disabled={this.props.disabled} name={name} key={'input-' + index} readOnly={this.props.readOnly} tabIndex={this.props.tabIndex} type="hidden" value={value} onFocus={onFocus} onBlur={onBlur}/>
                }) : (
                    <input disabled={this.props.disabled} name={name} readOnly={this.props.readOnly} tabIndex={this.props.tabIndex} type="hidden" value={this.getValues().join(',')} onFocus={onFocus} onBlur={onBlur}/>
                )}

                {(accessoriesRight.length) ? (<div className="accessories">
                    {accessoriesRight}
                </div>) : null}
            </div>
        );
    }

    _mapAccessories(accessories) {
        return React.Children.map(accessories, (accessory, index) => {
            return React.cloneElement(accessory, {
                key: 'a-' + index
            });
        }, this);
    }

    _changeHandler(options) {
        if (options === null) options = this.props.multiple ? [] : {value: null};

        let selected = this.props.multiple ? options.map((option) => {
            return option.value;
        }) : options.value;

        if (this.props.selected === null) this.setState({selected: Array.isArray(selected) ? selected : [selected]});

        this.emit('change', {
            component: this,
            value: selected
        });
    }

    _focusHandler(e) {
        this.setState({focused: true});
        this.props.onFocus && this.emit('focus', e);
    }

    _blurHandler(e) {
        this.setState({focused: false});
        this.props.onFocus && this.emit('focus', e);
    }

    _optionsProvider(input, callback) {
        if (this.props.href) {
            let href = this.props.href + (this.props.href.indexOf('?') !== -1 ? '&' : '?') + '_q=' + input;
            Ajax.get(href, 'json', this._optionsLoadHandler.bind(this, callback));

            //TODO :FIX AJAX

            Fetch(href, options)
            .then(response => {
                response.json()
                .then(json => {
                    if (json.error) cb(json.error, json.result || null);
                    else cb(null, json.result);
                })
                .catch(error => cb({status: response.status, message: response.status == 200 ? response.statusText : 'Invalid response.'}, null));
            })
            .catch(error => cb({status: 500, message: error.message}));
        }
        else this.props.optionsProvider(input, this._optionsLoadHandler.bind(this, callback));
    }

    _optionsLoadHandler(callback, error, data) {
        if (error) {
            console && console.error(error);
            return callback(error, {
                options: [],
                complete: false
            });
        }

        if (Array.isArray(data)) return callback(null, {
            options: data,
            complete: false
        });

        callback(null, data);
    }

    getName() {
        return this.props.name;
    }

    getValues() {
        return this.state.selected;
    }
}


module.exports = Select;
