import React             from 'react'
import { v4 as uuid }    from 'uuid'
import AbstractNode      from './AbstractNode'
import AbstractInOutNode from './fluxs/AbstractInOutNode'
import OutNode           from './fluxs/out/OutNode'

export default class NodesBoard extends React.Component {

    constructor ( props ) {
        super( props )

        this.state = {
            nodes:                 [
                {
                    id:        uuid(),
                    type:      'InOut',
                    active:    false,
                    name:      'MyNodeOne',
                    position:  {
                        x: 0,
                        y: 0,
                        z: 1000
                    },
                    dimension: {
                        width:  200,
                        height: 200
                    }
                },
                {
                    id:        uuid(),
                    type:      'default',
                    active:    false,
                    name:      'MyNodeTwo',
                    position:  {
                        x: 200,
                        y: 200,
                        z: 1000
                    },
                    dimension: {
                        width:  200,
                        height: 200
                    }
                },
                {
                    id:        uuid(),
                    type:      'OutNode',
                    active:    false,
                    name:      'MyNodeTwo',
                    position:  {
                        x: 500,
                        y: 500,
                        z: 1000
                    },
                    dimension: {
                        width:  200,
                        height: 200
                    }
                }
            ],
            previousMousePosition: {
                x: 0,
                y: 0
            },
            zoom:                  {
                value:    1.0,
                step:     0.1,
                min:      0.1,
                max:      5.0,
                position: {
                    x: 0,
                    y: 0
                }
            }
        }

        // Handlers
        this.handleNodeMouseDown = this.handleNodeMouseDown.bind( this )
        this.handleNodeMouseMove = this.handleNodeMouseMove.bind( this )
        this.handleNodeMouseUp   = this.handleNodeMouseUp.bind( this )

        this.handleMouseMove  = this.handleMouseMove.bind( this )
        this.handleMouseUp    = this.handleMouseUp.bind( this )
        this.handleMouseWheel = this.handleMouseWheel.bind( this )

        this.handleDragOver = this.handleDragOver.bind( this )
        this.handleDrop     = this.handleDrop.bind( this )


    }

    // Methods
    getNodeWithId ( nodes, id ) {

        return nodes.filter( node => ( node.id === id ) )[ 0 ]

    }

    zoomIn ( zoomPosition ) {

        const zoom          = Object.assign( this.state.zoom, {} )
        const zoomMax       = this.state.zoom.max
        const nextZoomValue = this.state.zoom.value + this.state.zoom.step

        zoom.value    = ( nextZoomValue < zoomMax ) ? nextZoomValue : zoomMax
        zoom.position = zoomPosition

        this.setState( { zoom } )

    }

    zoomOut ( zoomPosition ) {

        const zoom          = Object.assign( this.state.zoom, {} )
        const zoomMin       = this.state.zoom.min
        const nextZoomValue = this.state.zoom.value - this.state.zoom.step

        zoom.value    = ( nextZoomValue > zoomMin ) ? nextZoomValue : zoomMin
        zoom.position = zoomPosition

        this.setState( { zoom } )

    }

    // Util
    computeStyle () {

        return {
            transform:       `scale(${ this.state.zoom.value })`,
            transformOrigin: `center center`
            //            transformOrigin: `${ this.state.zoom.position.x }% ${ this.state.zoom.position.y }%`
            //            transformOrigin: `${ this.state.zoom.position.x }px ${ this.state.zoom.position.y }px`
        }

    }

    // Handlers
    handleNodeMouseDown ( nodeId, mouseEvent ) {

        const nodes   = this.state.nodes.slice()
        const node    = this.getNodeWithId( nodes, nodeId )
        node.active   = true
        node.position = {
            ...node.position,
            z: 1010
        }

        this.setState( {
            nodes:                 nodes,
            previousMousePosition: {
                x: mouseEvent.clientX,
                y: mouseEvent.clientY
            }
        } )

    }

    handleNodeMouseMove ( nodeId, mouseEvent ) {

        const nodes = this.state.nodes.slice()
        const node  = this.getNodeWithId( nodes, nodeId )
        if ( !node.active ) { return }

        const mousePosition = {
            x: mouseEvent.clientX,
            y: mouseEvent.clientY
        }

        const deltaTop  = mousePosition.y - this.state.previousMousePosition.y
        const deltaLeft = mousePosition.x - this.state.previousMousePosition.x

        this.setState( {
            nodes:                 nodes.map(
                ( node ) => {
                    return ( node.id === nodeId ) ? {
                        ...node,
                        position: {
                            ...node.position,
                            y: node.position.y + deltaTop,
                            x: node.position.x + deltaLeft
                        }
                    } : node
                }
            ),
            previousMousePosition: mousePosition
        } )

    }

    handleMouseMove ( mouseEvent ) {

        const nodes      = this.state.nodes.slice()
        const activeNode = nodes.filter( node => ( node.active === true ) )[ 0 ]
        if ( !activeNode ) { return }

        this.handleNodeMouseMove( activeNode.id, mouseEvent )

    }

    handleNodeMouseUp ( nodeId/*, mouseEvent*/ ) {

        const nodes   = this.state.nodes.slice()
        const node    = this.getNodeWithId( nodes, nodeId )
        node.active   = false
        node.position = {
            ...node.position,
            z: 1000
        }

        this.setState( {
            nodes: nodes
        } )

    }

    handleMouseUp ( /*mouseEvent*/ ) {

        const nodes = this.state.nodes.slice()
        for ( let nodeIndex = 0, numberOfNodes = nodes.length ; nodeIndex < numberOfNodes ; nodeIndex++ ) {
            let node      = nodes[ nodeIndex ]
            node.active   = false
            node.position = {
                ...node.position,
                z: 1000
            }
        }

        this.setState( {
            nodes
        } )

    }

    handleMouseWheel ( wheelEvent ) {
        if ( !wheelEvent.ctrlKey ) { return }

        //        const nodesBoardBounds       = document.getElementById( 'nodes-board' ).getBoundingClientRect()
        const nodesBoardBounds       = wheelEvent.target.getBoundingClientRect()
        const normalizedZoomPosition = {
            x: wheelEvent.clientX / nodesBoardBounds.width,
            y: wheelEvent.clientY / nodesBoardBounds.height
        }

        if ( wheelEvent.deltaY < 0 ) {
            this.zoomIn( normalizedZoomPosition )
        } else {
            this.zoomOut( normalizedZoomPosition )
        }

    }

    handleDragOver ( dragEvent ) {
        dragEvent.preventDefault()
    }

    handleDrop ( dropEvent ) {

        const dropTextData = dropEvent.dataTransfer.getData( 'text' )
        const dropData     = JSON.parse( dropTextData )
        const targetBounds = dropEvent.target.getBoundingClientRect()
        const dropPosition = {
            x: dropEvent.clientX - targetBounds.left,
            y: dropEvent.clientY - targetBounds.top
        }

        let node = null
        switch ( dropData.id ) {

            case 'cond_node_2':
                node = {
                    id:       'Node_' + this.state.nodes.length,
                    active:   false,
                    name:     'Mycond_node_2',
                    position: {
                        x: dropPosition.x,
                        y: dropPosition.y
                    }
                    //                    dimension: {
                    //                        width:  200,
                    //                        height: 200
                    //                    }
                }
                break

            case 'cond_node_3':
                node = {
                    id:       'Node_' + this.state.nodes.length,
                    active:   false,
                    name:     'Mycond_node_3',
                    position: {
                        x: dropPosition.x,
                        y: dropPosition.y
                    }
                    //                    dimension: {
                    //                        width:  50,
                    //                        height: 100
                    //                    }
                }
                break

            default:
                throw new RangeError( `Invalid switch parameter: ${ id }` )

        }

        // Recenter node position to drop position
        //        node.position.x -= node.dimension.width / 2
        //        node.position.y -= node.dimension.height / 2

        const nodes = this.state.nodes.slice()
        nodes.push( node )

        this.setState( {
            nodes
        } )

        dropEvent.dataTransfer.clearData()
    }


    // Renderers
    render () {

        const style = this.computeStyle()
        return (
            <div
                id="nodes-board"
                className="user-select-none h-100 w-100"
                onMouseMove={ this.handleMouseMove }
                onMouseUp={ this.handleMouseUp }
                onWheel={ this.handleMouseWheel }
                //                onMouseLeave={ this.handleMouseUp }
                onDragOver={ this.handleDragOver }
                onDrop={ this.handleDrop }
            >
                <div className="user-select-none h-100 w-100 border-primary" style={ style }>
                    { this.renderNodes( this.state.nodes ) }
                </div>
            </div>
        )
    }

    renderNodes ( nodes ) {

        return nodes.map( ( node ) => {

            switch ( node.type ) {

                case 'default':
                    return <AbstractNode
                        id={ node.id }
                        key={ node.id }
                        name={ node.name }
                        active={ node.active }
                        position={ node.position }
                        dimension={ node.dimension }
                        onMouseDown={ this.handleNodeMouseDown.bind( this, node.id ) }
                        onMouseMove={ this.handleNodeMouseMove.bind( this, node.id ) }
                        onMouseUp={ this.handleNodeMouseUp.bind( this, node.id ) }
                        onMouseLeave={ this.handleNodeMouseMove.bind( this, node.id ) }
                    />

                case 'InOut':
                    return <AbstractInOutNode
                        id={ node.id }
                        key={ node.id }
                        name={ node.name }
                        active={ node.active }
                        position={ node.position }
                        dimension={ node.dimension }
                        onMouseDown={ this.handleNodeMouseDown.bind( this, node.id ) }
                        onMouseMove={ this.handleNodeMouseMove.bind( this, node.id ) }
                        onMouseUp={ this.handleNodeMouseUp.bind( this, node.id ) }
                        onMouseLeave={ this.handleNodeMouseMove.bind( this, node.id ) }
                    />

                case 'OutNode':
                    return <OutNode
                        id={ node.id }
                        key={ node.id }
                        name={ node.name }
                        active={ node.active }
                        position={ node.position }
                        dimension={ node.dimension }
                        onMouseDown={ this.handleNodeMouseDown.bind( this, node.id ) }
                        onMouseMove={ this.handleNodeMouseMove.bind( this, node.id ) }
                        onMouseUp={ this.handleNodeMouseUp.bind( this, node.id ) }
                        onMouseLeave={ this.handleNodeMouseMove.bind( this, node.id ) }
                    />

                default:
                    throw new RangeError( `Invalid switch parameter: ${ node.type }` )

            }

        } )

    }

}
NodesBoard.defaultProps = {
    onError: console.error
}
