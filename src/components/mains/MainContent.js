import React         from 'react'
import Col           from 'react-bootstrap/Col'
import Row           from 'react-bootstrap/Row'
import NodesBoard    from '../nodes/NodesBoard'
import NodesLibrary  from '../nodes/NodesLibrary'
import ErrorBoundary from '../others/ErrorBoundary'

export default class MainContent extends React.Component {

    // Renderers
    render () {

        return (
            <Row noGutters className="flex-fill mh-0 bg-dark" style={ { border: '4px solid #343a40' } }>
                <Col md={ 2 } className="mh-100 overflow-auto nodes-library p-1 bg-secondary">
                    <ErrorBoundary>
                        <NodesLibrary onError={ this.props.onError } />
                    </ErrorBoundary>
                </Col>
                <Col md={ 10 } className="mh-100 overflow-auto nodes-board p-1 bg-secondary">
                    <ErrorBoundary>
                        <NodesBoard onError={ this.props.onError } />
                    </ErrorBoundary>
                </Col>
            </Row>
        )
    }

}
MainContent.defaultProps = {
    onError: console.error
}
