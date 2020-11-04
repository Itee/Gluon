import React         from 'react'
import Card          from 'react-bootstrap/Card'
import ErrorBoundary from '../others/ErrorBoundary'

export default class AbstractNode extends React.Component {

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
                    {this.props.children}
                    {/*<Card.Body>*/}
                    {/*    {this.props.children}*/}
                    {/*</Card.Body>*/}

                    {/*<Card.Body onMouseMove={ this.props.onMouseMove }>*/ }
                    {/*    { this.props.name }*/ }
                    {/*</Card.Body>*/ }
                    {/*<Card.Header onMouseMove={ this.props.onMouseMove }>*/ }
                    {/*    { this.props.name }*/ }
                    {/*</Card.Header>*/ }
                    {/*<Card.Body>*/ }
                    {/*    {*/ }
                    {/*        isActive*/ }
                    {/*            ? <Card.Text> I am active </Card.Text>*/ }
                    {/*            : <Card.Text> I am NOT active </Card.Text>*/ }
                    {/*    }*/ }
                    {/*</Card.Body>*/ }
                </Card>
            </ErrorBoundary>
        )
    }

}
