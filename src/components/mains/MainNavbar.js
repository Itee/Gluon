/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @see [IFC Standard]{@link http://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/}
 *
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React               from 'react'
import Nav                 from 'react-bootstrap/Nav'
import Navbar              from 'react-bootstrap/Navbar'
import nodeImageSource     from '../../images/node.png'

function avoidDraggableLink ( event ) {
    event.preventDefault()
}

export default class MainNavbar extends React.Component {

    // Renderers
    render () {
        return (
            <Navbar bg="dark" variant="dark" className="draggable user-select-none" sticky="top">
                <Navbar.Brand className="undraggable">
                    {/*Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>*/ }
                    <img
                        alt="Gluon logo"
                        src={ nodeImageSource }
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{ ' ' }Gluon
                </Navbar.Brand>
                <Nav className="mr-auto undraggable">
                    <Nav.Link
                        href="#home"
                        onDragStart={ avoidDraggableLink }
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link
                        href="#features"
                        onDragStart={ avoidDraggableLink }
                    >
                        Features
                    </Nav.Link>
                    <Nav.Link
                        href="#pricing"
                        onDragStart={ avoidDraggableLink }
                    >
                        Pricing
                    </Nav.Link>
                </Nav>
                <Nav className="ml-auto undraggable">
                    <Nav.Item>
                        <Nav.Link
                            id="window_minimize_link"
                            onDragStart={ avoidDraggableLink }
                        >
                            <FontAwesomeIcon icon="window-minimize" />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            id="window_maximize_link"
                            onDragStart={ avoidDraggableLink }
                        >
                            <FontAwesomeIcon icon="window-maximize" />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            id="window_close_link"
                            onDragStart={ avoidDraggableLink }
                            variant="danger"
                        >
                            <FontAwesomeIcon icon="window-close" />
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }

}
MainNavbar.defaultProps = {
    onError: console.error
}
