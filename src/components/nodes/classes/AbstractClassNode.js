import React         from 'react'
import Card          from 'react-bootstrap/Card'
import ErrorBoundary from '../../others/ErrorBoundary'

export default class AbstractClassNode extends React.Component {

    // Renderers
    computeStyle () {

        return {
            top:    this.props.position.y || 0,
            left:   this.props.position.x || 0,
            zIndex: this.props.position.z || 1000
        }

    }

    render () {

        const isActive  = this.props.active
        const className = ( isActive ) ? 'node active' : 'node'
        const style     = this.computeStyle()
        return (
            <ErrorBoundary>
                <Card
                    id={ this.props.id }
                    onMouseDown={ this.props.onMouseDown }
                    onMouseUp={ this.props.onMouseUp }
                    onMouseLeave={ this.props.onMouseLeave }
                    className={ className }
                    style={ style }
                >

                    <Card.Header onMouseMove={ this.props.onMouseMove }>
                        { this.props.name }
                    </Card.Header>
                    <Card.Body onMouseMove={ this.props.onMouseMove }>
                        { this.renderMembers( this.props.members ) }
                        { this.renderMethods( this.props.methods ) }
                    </Card.Body>
                </Card>
            </ErrorBoundary>
        )
    }

    renderMembers ( members ) {}

    renderMethods ( methods ) {}

}
