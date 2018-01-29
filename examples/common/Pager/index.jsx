'use strict';

var React = require('react');
var Pager = require('../../../src/common/Pager/Pager.jsx');
var Select = require('../../../src/controls/Select');


class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            limit: 20,
            page: 2,
            count: 50
        }
    }
    
    render() {
        return (
            <div>
                <div className="example">
                    <h2>Default</h2>

                    <Pager
                        //className="test"
                        //style={{background: '#ddd'}}

                        count={100}
                        limits={[10, 20, 30]}

                        //limit={10}
                        defaultLimit={10}

                        //page={2}
                        defaultPage={2}

                        onChange={(pager) => console.log('Change:', pager)}
                    />
                </div>

                <div className="example">
                    <h2>Custom layout</h2>

                    <Pager
                        //className="test"
                        //style={{background: '#ddd'}}

                        count={500}
                        limits={[10, 20, 30]}

                        //limit={10}
                        defaultLimit={10}

                        //page={2}
                        defaultPage={2}

                        onChange={(pager) => console.log('Change:', pager)}
                    >
                        <div>
                            Buttons: <Pager.Buttons split={21} style={{display: 'inline-block'}} /><br />
                            Jumper: <Pager.Jumper style={{display: 'inline-block', width: '140px'}}/><br />
                            Limit: <Pager.Limit style={{display: 'inline-block', width: '140px'}}/><br /><br />

                            Count pages: <Pager.Count type="pages" style={{display: 'inline-block'}}/><br />
                            Count page: <Pager.Count type="page" style={{display: 'inline-block'}}/><br />
                            Count limit: <Pager.Count type="limit" style={{display: 'inline-block'}}/><br />
                            Count total: <Pager.Count type="total" style={{display: 'inline-block'}}/><br />
                            Count shown: <Pager.Count type="shown" style={{display: 'inline-block'}}/><br />
                            Count start: <Pager.Count type="start" style={{display: 'inline-block'}}/><br />
                            Count end: <Pager.Count type="end" style={{display: 'inline-block'}}/><br />

                            Count.Pages: <Pager.Count.Pages style={{display: 'inline-block'}}/><br />
                            Count.Page: <Pager.Count.Page style={{display: 'inline-block'}}/><br />
                            Count.Limit: <Pager.Count.Limit style={{display: 'inline-block'}}/><br />
                            Count.Total: <Pager.Count.Total style={{display: 'inline-block'}}/><br />
                            Count.Shown: <Pager.Count.Shown style={{display: 'inline-block'}}/><br />
                            Count.Start: <Pager.Count.Start style={{display: 'inline-block'}}/><br />
                            Count.End: <Pager.Count.End style={{display: 'inline-block'}}/>
                        </div>
                    </Pager>
                </div>

                <div className="example">
                    <h2>Controlled + custom layout</h2>

                    <Pager
                        count={this.state.count}
                        limits={[10, 20, 30]}

                        limit={this.state.limit}
                        page={this.state.page}

                        onChange={(pager) => {
                            this.setState({
                                limit: pager.limit,
                                page: pager.page
                            });
                        }}
                    >
                        <div>
                            Buttons: <Pager.Buttons style={{display: 'inline-block'}} /><br />
                            Jumper: <Pager.Jumper style={{display: 'inline-block', width: '140px'}}/><br />
                            Limit: <Pager.Limit style={{display: 'inline-block', width: '140px'}}/><br /><br />

                            Count.Pages: <Pager.Count.Pages style={{display: 'inline-block'}}/><br />
                            Count.Page: <Pager.Count.Page style={{display: 'inline-block'}}/><br />
                            Count.Limit: <Pager.Count.Limit style={{display: 'inline-block'}}/><br />
                            Count.Total: <Pager.Count.Total style={{display: 'inline-block'}}/><br />
                            Count.Shown: <Pager.Count.Shown style={{display: 'inline-block'}}/><br />
                            Count.Start: <Pager.Count.Start style={{display: 'inline-block'}}/><br />
                            Count.End: <Pager.Count.End style={{display: 'inline-block'}}/>
                        </div>
                    </Pager>

                    <label>Enter count:</label>
                    <input
                        placeholder="Pager size"
                        value={this.state.count}
                        onChange={(e) => {
                            this.setState({
                                count: parseInt(e.target.value)
                            });
                        }}
                    />
                </div>
            </div>
        );
    }

}


module.exports = Demo;
