/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @see [IFC Standard]{@link http://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/}
 *
 */

/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @see [IFC Standard]{@link http://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/}
 *
 */

import React  from 'react'
import Button from 'react-bootstrap/Button'

export default class CircleButton extends React.Component {

    computeStyle () {
        return {
            borderRadius: '50%',
            width:        this.props.radius * 2 + 'px',
            height:       this.props.radius * 2 + 'px',
            padding:      0
        }
    }

    render () {

        const style = this.computeStyle()
        return (
            <Button style={ style }>
                { this.props.children }
            </Button>
        )

    }
}
CircleButton.defaultProps = {
    radius: 10
}
