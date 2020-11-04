/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @see [IFC Standard]{@link http://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/}
 *
 */

import React  from 'react'
import Navbar from 'react-bootstrap/Navbar'

export default class MainFooter extends React.Component {

    // Renderers
    render () {
        return (
            <Navbar
                bg="dark"
                variant="dark"
                sticky="bottom"
                onError={ this.props.onError }
            ></Navbar>
        )
    }

}
MainFooter.defaultProps = {
    onError: console.error
}
