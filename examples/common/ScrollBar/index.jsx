'use strict';

const React = require('react');
const ScrollBar = require('../../../src/common/ScrollBar/ScrollBar.jsx');


class Demo extends React.Component {
    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic ScrollBar</h2>

                    <ScrollBar type={'x'} content={25} offset={20} onScroll={e => {}} />
                </div>

                <div className="example">
                    <h2>Basic ScrollBar</h2>

                    <ScrollBar type={'y'} content={25} offset={75} onScroll={e => {}} style={{height: '300px'}} />
                </div>

                {/*<div className="example">*/}
                    {/*<h2>Progress</h2>*/}

                    {/*<ScrollBar progress={40} />*/}
                {/*</div>*/}

                {/*<div className="example">*/}
                    {/*<h2>Custom Class Name + Style Attribute</h2>*/}

                    {/*<ScrollBar className="custom-class" style={{width: '400px' }} />*/}
                {/*</div>*/}

                {/*<div className="example">*/}
                    {/*<h2>Hidden Label</h2>*/}

                    {/*<ScrollBar label={false} progress={18} />*/}
                {/*</div>*/}

                {/*<div className="example">*/}
                    {/*<h2>Custom Label</h2>*/}

                    {/*<ScrollBar label="Loading (%)" progress={60} />*/}
                {/*</div>*/}
            </div>
        );
    }

}


module.exports = Demo;
