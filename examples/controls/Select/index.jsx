'use strict';

var React = require('react');
var Select = require('../../../src/controls/Select/Select.jsx');

var OPTIONS = [
    {label: 'Value 1', value: 'v1'},
    {label: 'Value 2', value: 'v2'},
    {label: 'Value 3', value: 'v3'}
];

class Demo extends React.Component {
    _optionsProvider(input, callback) {
        input = input.toLowerCase();

        console.log('SEARCH', input);

        var data = {
            options: OPTIONS.filter(function (i) {
                return i.label.toLowerCase().substr(0, input.length) === input;
            }),
            complete: false
        };

        setTimeout(function () {
            callback(null, data);
        }, 1000);
    }

    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Select</h2>

                    <input type="text" />

                    <Select
                        onFocus={console.log.bind(console, 'focus')}
                        onBlur={console.log.bind(console, 'blur')}
                        onChange={function(option) { console.log('new selection:', option); }}

                        placeholder="Select?!"

                        multiple
                        options={[
                            {label: 'Value 1', value: 'v1'},
                            {label: 'Value 2', value: 2},
                            {label: 'Value 3', value: 'v3'}
                        ]}

                        /*optionRenderer={function (option) {

                        }}*/

                        loadingText="Loading 2..."
                        searchingText="Searching 2..."
                        searchPromptText="Type to search 2"
                        noResultsText="No results found 2"
                        addLabelText='Add "{label}" 2?'
                        clearButton="Clear 2"
                        clearAllButton="Clear all 2"

                        // This doesn't work, apparently the react-select component does not implement the feature yet.
                        newOptions
                        newOptionCreator={function (option) {
                            console.log(option);
                        }}

                        //readOnly
                        //disabled
                        //autoFocus
                        //search={false}

                        name="select[]"
                        //clearAllButton={false}
                        //defaultSelected={[2, 'v1']}
                        //selected={'v1'}

                        //href="data.json"
                        //optionsProvider={this._optionsProvider}
                        //cache={false}
                    />
                </div>
            </div>
        );
    }

}


module.exports = Demo;
