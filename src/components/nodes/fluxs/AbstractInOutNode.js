import React          from 'react'
import Card           from 'react-bootstrap/Card'
import { v4 as uuid } from 'uuid'
import CircleButton   from '../../others/CircleButton'
import ErrorBoundary  from '../../others/ErrorBoundary'
import AbstractNode  from '../AbstractNode'

export default class AbstractInOutNode extends React.Component {

    constructor ( props ) {
        super( props )

        // Handlers
        this.handleInputMouseDown = this.handleInputMouseDown.bind( this )
        this.handleInputMouseMove = this.handleInputMouseMove.bind( this )
        this.handleInputMouseUp   = this.handleInputMouseUp.bind( this )

    }

    // Handlers
    handleInputMouseDown ( nodeId, mouseEvent ) {

        console.log( 'AbstractInOutNode.handleInputMouseDown' )

    }

    handleInputMouseMove ( nodeId, mouseEvent ) {

        console.log( 'AbstractInOutNode.handleInputMouseMove' )

    }

    handleInputMouseUp ( nodeId/*, mouseEvent*/ ) {

        console.log( 'AbstractInOutNode.handleInputMouseUp' )

    }


    // Renders
    render () {

        return (
            <AbstractNode
                id={ this.props.id }
                name={ this.props.name }
                active={ this.props.active }
                position={ this.props.position }
                dimension={ this.props.dimension }
                onMouseDown={ this.props.onMouseDown }
                onMouseMove={ this.props.onMouseMove }
                onMouseUp={ this.props.onMouseUp }
                onMouseLeave={ this.props.onMouseLeave }
            >
                <div>
                    { this.renderInputs( this.props.inputs ) }
                    { this.renderProperties( this.props.properties ) }
                    { this.renderOutputs( this.props.outputs ) }
                </div>
            </AbstractNode>
        )
    }

    renderInputs ( inputs ) {

        return inputs.map( ( input ) =>
            <CircleButton
                id={ input.id }
                key={ input.id }
                className="input-btn"
                onMouseDown={ this.handleInputMouseDown.bind( this, input.id ) }
                //                onMouseMove={ this.handleInputMouseMove.bind( this, input.id ) }
                //                onMouseUp={ this.handleInputMouseUp.bind( this, input.id ) }
                //                onMouseLeave={ this.handleInputMouseMove.bind( this, input.id ) }
            />
        )

    }

    renderProperties ( properties ) {}

    renderOutputs ( outputs ) {}

}
AbstractInOutNode.defaultProps = {
    inputs:     [
        {
            id:     uuid(),
            active: false
        }
    ],
    properties: [],
    outputs:    []
}
