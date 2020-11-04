import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React               from 'react'
import Accordion           from 'react-bootstrap/Accordion'
import Card                from 'react-bootstrap/Card'
import { v4 as uuid }      from 'uuid'
import ErrorBoundary       from '../others/ErrorBoundary'

export default class NodesLibrary extends React.Component {

    constructor ( props ) {
        super( props )

        this.state = {
            categories: [
                {
                    id:     uuid(),
                    name:   'Conditional',
                    active: false,
                    nodes:  [
                        {
                            id:   uuid(),
                            name: 'if'
                        },
                        {
                            id:   uuid(),
                            name: 'for'
                        },
                        {
                            id:   uuid(),
                            name: 'switch'
                        }
                    ]
                },
                {
                    id:     uuid(),
                    name:   'Classes',
                    active: false,
                    nodes:  [
                        {
                            id:   uuid(),
                            name: 'Foo'
                        },
                        {
                            id:   uuid(),
                            name: 'Bar'
                        }
                    ]
                }
            ]
        }

        this.handleDragStart        = this.handleDragStart.bind( this )
        this.handleAccordionOnClick = this.handleAccordionOnClick.bind( this )
    }

    // Handlers
    handleDragStart ( dragEvent ) {

        const dragData = {
            id:            dragEvent.target.id,
            mousePosition: {
                x: dragEvent.clientX,
                y: dragEvent.clientY
            }
        }

        dragEvent
            .dataTransfer
            .setData( 'text/plain', JSON.stringify( dragData ) )

    }

    handleAccordionOnClick ( event ) {
        event.preventDefault()

        const categories = this.state.categories.slice()
        const category   = categories.filter( category => ( category.id === event.target.id ) )[ 0 ]
        category.active  = !category.active

        this.setState( {
            categories
        } )
    }

    // Renderers
    render () {
        return (
            <div>
                { this.renderCategories( this.state.categories ) }
            </div>
        )
    }

    renderCategories ( categories ) {

        return categories.map( ( category, index ) =>
            <ErrorBoundary key={ category.id }>
                <Accordion className="pb-1">
                    <Card className="bg-dark text-light">
                        <Accordion.Toggle
                            id={ category.id }
                            as={ Card.Header }
                            eventKey={ index.toString( 10 ) }
                            className="d-flex align-items-center justify-content-between user-select-none"
                            onClick={ this.handleAccordionOnClick }
                        >
                            { category.name }
                            {
                                category.active
                                    ? <FontAwesomeIcon icon="chevron-down" />
                                    : <FontAwesomeIcon icon="chevron-right" />
                            }
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={ index.toString( 10 ) }>
                            <Card.Body className="bg-secondary p-2">

                                { this.renderNodes( category.nodes ) }

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </ErrorBoundary>
        )

    }

    renderNodes ( nodes ) {

        return nodes.map( ( node ) =>
            <ErrorBoundary key={ node.id }>
                <div
                    id={ node.id }
                    className="btn btn-block btn-dark mr-1"
                    draggable="true"
                    onDragStart={ this.handleDragStart }
                >
                    { node.name }
                </div>
            </ErrorBoundary>
        )

    }

}
NodesLibrary.defaultProps = {
    onError: console.error
}
