import React        from 'react'
import FormControl  from 'react-bootstrap/FormControl'
import InputGroup   from 'react-bootstrap/InputGroup'
import CircleButton from '../../../others/CircleButton'
import AbstractNode from '../../AbstractNode'

export default class OutNode extends React.Component {

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
                {/*{ this.props.children}*/ }

                <CircleButton className="output-btn" style={ {
                    position: 'absolute',
                    top:    '10px',
                    right:  '-10px',
                    zIndex: '99999'
                } } onClick={(event)=>{event.preventDefault()}} />
                Log

            </AbstractNode>
        )
    }

}
