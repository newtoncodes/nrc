'use strict';

const React = require('react');
const Accordion = require('../../../src/common/Accordion/Accordion.jsx');
const AccordionPanel = require('../../../src/common/Accordion/AccordionPanel.jsx');


class Demo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: []
        };
    }

    _accordionChangeHandler(expanded) {
        console.log('Expanded panels:', expanded);
    }

    _controlledAccordionChangeHandler(expanded) {
        this.setState({expanded: expanded});
    }

    render() {
        return (
            <div>
                <div className="example">
                    <h2>Basic Accordion</h2>

                    <Accordion>
                        <AccordionPanel section="Section 1" name="p1">Panel 1</AccordionPanel>
                        <AccordionPanel section="Section 2" name="p2">Panel 2</AccordionPanel>
                        <AccordionPanel section="Section 3" name="p3">Panel 3</AccordionPanel>
                    </Accordion>
                </div>

                <div className="example">
                    <h2>Custom Class Name + Style Attribute</h2>

                    <Accordion className="custom-class" style={{border: '1px solid #f1f1f1'}}>
                        <AccordionPanel className="custom-class" style={{color: 'red'}} section="Section 1" name="p1">Panel 1</AccordionPanel>
                        <AccordionPanel className="custom-class" style={{color: 'green'}} section="Section 2" name="p2">Panel 2</AccordionPanel>
                        <AccordionPanel className="custom-class" style={{color: 'blue'}} section="Section 3" name="p3">Panel 3</AccordionPanel>
                    </Accordion>
                </div>

                <div className="example">
                    <h2>Multiple Expanded + Default Expanded</h2>

                    <Accordion multiple defaultExpanded={['p1', 'p2']}>
                        <AccordionPanel section="Section 1" name="p1">Panel 1</AccordionPanel>
                        <AccordionPanel section="Section 2" name="p2">Panel 2</AccordionPanel>
                        <AccordionPanel section="Section 3" name="p3">Panel 3</AccordionPanel>
                    </Accordion>
                </div>

                <div className="example">
                    <h2>onChange Callback</h2>

                    <Accordion multiple onChange={this._accordionChangeHandler.bind(this)}>
                        <AccordionPanel section="Section 1" name="p1">Panel 1</AccordionPanel>
                        <AccordionPanel section="Section 2" name="p2">Panel 2</AccordionPanel>
                        <AccordionPanel section="Section 3" name="p3">Panel 3</AccordionPanel>
                    </Accordion>
                </div>

                <div className="example">
                    <h2>Controlled Accordion</h2>

                    <Accordion expanded={this.state.expanded} onChange={this._controlledAccordionChangeHandler.bind(this)}>
                        <AccordionPanel section="Section 1" name="p1">Panel 1</AccordionPanel>
                        <AccordionPanel section="Section 2" name="p2">Panel 2</AccordionPanel>
                        <AccordionPanel section="Section 3" name="p3">Panel 3</AccordionPanel>
                    </Accordion>
                </div>
            </div>
        );
    }
}


module.exports = Demo;