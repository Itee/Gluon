import React from 'react'
import Card  from 'react-bootstrap/Card'

export default class ErrorBoundary extends React.Component {

    constructor ( props ) {
        super( props )

        this.state = {
            error: null
        }
    }

    static getDerivedStateFromError ( error ) {
        return {
            error
        }
    }

    // Renderers
    render () {

        if ( this.state.error ) {
            return (
                <div className="error-boundary">
                    <Card className="error-boundary-body" bg="danger" text="white">
                        <Card.Header>
                            <strong>Component Error</strong>
                        </Card.Header>
                        <Card.Body>
                            { this.state.error.stack }
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        return this.props.children
    }
}
