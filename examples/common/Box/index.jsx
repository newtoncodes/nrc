'use strict';

var React = require('react');
var Box = require('../../../src/common/Box/Box.jsx');


class Demo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {c: 1};

        // this.interval = setInterval(() => {
        //     this.setState({c: this.state.c + 1});
        // }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Box + Size Properties</h2>

                    <Box
                        xs={{width: '100%'}}
                        sm={{width: '100%'}}
                        md={{width: '50%'}}
                        lg={{width: '33%'}}
                    >
                        Responsive Box
                    </Box>
                </div>

                <div className="example">
                    <h2>Basic Box + Scrollable</h2>

                    <Box wrapper>
                        <Box scroll lg={1/2} style={{height: '200px'}}>
                            1 Scrollable Box Scrollable Box<br />
                            2 Scrollable Box Scrollable Box<br />
                            3 Scrollable Box Scrollable Box<br />
                            4 Scrollable Box Scrollable Box<br />
                            5 Scrollable Box Scrollable Box<br />
                            6 Scrollable Box Scrollable Box<br />
                            7 Scrollable Box Scrollable Box<br />
                            8 Scrollable Box Scrollable Box<br />
                            9 Scrollable Box Scrollable Box<br />
                            0 Scrollable Box Scrollable Box<br />
                            1 Scrollable Box Scrollable Box<br />
                            2 Scrollable Box Scrollable Box<br />
                            3 Scrollable Box Scrollable Box<br />
                            4 Scrollable Box Scrollable Box<br />
                            5 Scrollable Box Scrollable Box<br />
                            6 Scrollable Box Scrollable Box<br />
                            7 Scrollable Box Scrollable Box<br />
                            8 Scrollable Box Scrollable Box<br />
                            9 Scrollable Box Scrollable Box<br />
                            0 Scrollable Box Scrollable Box<br />
                            1 Scrollable Box Scrollable Box<br />
                        </Box>

                        <Box scroll={'x'} lg={1/2} style={{height: '200px'}}>
                            <div style={{width: '1000px'}}>
                                Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box
                                Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box Scrollable Box
                            </div>
                        </Box>
                    </Box>
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <Box className="custom-class" style={{color: 'red'}}>
                        Styled <div>{this.state.c}</div>
                    </Box>
                </div>

                <div className="example">
                    <h2>Size Properties Values</h2>

                    <Box lg={75}>75%</Box><br />
                    <Box lg={1/2}>50%</Box><br />
                    <Box lg="25%">25%</Box><br />
                    <Box lg="200px">200px</Box><br />
                    <Box lg={{color: 'green', width: '200px'}}>Style Object</Box><br />
                </div>

                <div className="example">
                    <h2>Grid</h2>

                    <Box wrapper>
                        <Box lg={50}>Box 1 (50%)</Box>
                        <Box lg={50}>Box 2 (50%)</Box>
                        <Box lg={100}>Box 3 (100%)</Box>
                    </Box>
                </div>

                <div className="example">
                    <h2>Responsive Grid</h2>

                    <Box wrapper>
                        <Box sm={50} lg={33.33}>Box 1</Box>
                        <Box sm={50} lg={33.33}>Box 2</Box>
                        <Box sm={50} lg={33.33}>Box 3</Box>
                        {/*<Box sm={100} md={50} lg={100}>Box 4</Box>*/}
                    </Box>
                </div>

                <div className="example">
                    <h2>Responsive Content</h2>

                    <Box>
                        <div className="Box-content-xs">XS</div>
                        <div className="Box-content-sm">SM</div>
                        <div className="Box-content-md">MD</div>
                        <div className="Box-content-lg">LG</div>
                        <div className="Box-content-xl">XL</div>
                    </Box>
                </div>
            </div>
        );
    }

}


module.exports = Demo;
