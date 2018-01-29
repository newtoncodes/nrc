'use strict';

var React = require('react');
var DateTime = require('../../../src/controls/DateTime/DateTime.jsx');

// TODO: better demo

class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: null
        }
    }

    _changeHandler(e) {
        console.log('Changed: ', e.value);
    }

    _controlledChangeHandler(e) {
        this.setState({value: e.value});
        console.log('Changed controlled: ', e.value);
    }

    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic DateTime</h2>

                    <form>
                        <input type="text" />

                        <DateTime
                            style={{width: '250px'}}

                            name="dateTime-1"

                            placeholder="bla"
                            clearButton={<span>clear</span>}

                            //autoFocus
                            //readOnly
                            //disabled

                            //date={false}
                            seconds={true}
                            //hours={12}
                            //minutes={12}
                            //seconds={2}

                            //month={new Date()}
                            //min={new Date()}
                            //max={new Date()}

                            //defaultValue={new Date()} onChange={this._changeHandler}
                            //value={this.state.value} onChange={this._controlledChangeHandler}

                            defaultMonth={new Date()}
                            //month={new Date(2016, 1, 1, 0, 0, 0)}

                            min={new Date(2015, 10, 30, 11, 17, 0)}
                            max={new Date(2016, 1, 5, 20, 30, 0)}
                            minTime={new Date(0, 0, 1, 9, 7)}
                            maxTime={new Date(0, 0, 1, 22, 40, 59)}
                        />
                    </form>
                </div>
            </div>
        );
    }
}


module.exports = Demo;
