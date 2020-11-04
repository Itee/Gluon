/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @see [IFC Standard]{@link http://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/}
 *
 */

import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faChevronDown,
    faChevronRight,
    faWindowClose,
    faWindowMaximize,
    faWindowMinimize
}                  from '@fortawesome/free-solid-svg-icons'
import React       from 'react'
import MainContent from './mains/MainContent'
import MainFooter  from './mains/MainFooter'
import MainNavbar  from './mains/MainNavbar'
import Toaster     from './toasts/Toaster'

library.add( faWindowMinimize, faWindowMaximize, faWindowClose, faChevronDown, faChevronRight )

export default class Application extends React.Component {

    constructor ( props ) {
        super( props )

        this._toaster = React.createRef()

        // Handlers
        this.handleRuntimeError = this.handleRuntimeError.bind( this )
    }

    componentDidCatch ( error, errorInfo ) {

        if ( this._toaster.current ) {
            this._toaster.current.toastError( error.message )
        } else {
            alert( error )
        }

    }

    // Handlers
    handleRuntimeError ( error ) {

        if ( this._toaster.current ) {
            this._toaster.current.toastError( error.message )
        } else {
            alert( error )
        }

    }

    // Renderers
    render () {

        return (
            <div className="d-flex flex-column h-100 overflow-hidden">
                <MainNavbar onError={ this.handleRuntimeError } />
                <MainContent onError={ this.handleRuntimeError } />
                <Toaster ref={ this._toaster } onError={ this.handleRuntimeError } />
                <MainFooter onError={ this.handleRuntimeError } />
            </div>
        )
    }
}
