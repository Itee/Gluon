/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

//import { ipcRenderer } from 'electron'
import '@babel/polyfill'
import React       from 'react'
import ReactDOM    from 'react-dom'
import Application from './components/Application'
import './styles/index.scss'

console.log( 'Renderer Loaded' )
ReactDOM.render( <Application />, document.getElementById( 'root' ) )


/////////////////////////////// Validators //////////////////////////////////

function isNullOrUndefined ( value ) {
    return ( value === null || value === undefined )
}


/////////////////////////////// Utils //////////////////////////////////

function addEventListenerTo ( id, eventName, handler ) {
    if ( isNullOrUndefined( id ) ) { throw new ReferenceError( 'Id cannot be null or undefined !' ) }
    if ( isNullOrUndefined( eventName ) ) { throw new ReferenceError( 'Id cannot be null or undefined !' ) }
    if ( isNullOrUndefined( handler ) ) { throw new ReferenceError( 'Id cannot be null or undefined !' ) }

    const element = document.getElementById( id )
    if ( isNullOrUndefined( element ) ) { throw new ReferenceError( `Unable to found element with id [${ id }] !` ) }

    element.addEventListener( eventName, handler )
}

/////////////////////////////// LIFE CYCLE & Events //////////////////////////////////


function onDOMContentLoaded () {

    try {

        addEventListenerTo( 'window_minimize_link', 'click', minimizeWindow )
        addEventListenerTo( 'window_maximize_link', 'click', maximizeWindow )
        addEventListenerTo( 'window_close_link', 'click', closeWindow )

    } catch ( error ) {

        onError( error )

    }

}

function minimizeWindow () {
//async function minimizeWindow () {
//    await window.ipcRenderer.invoke( 'window-minimize' )

    window.api.request( 'rendererRequest', 'window-minimize' )
}

function maximizeWindow () {
//async function maximizeWindow () {
//    await window.ipcRenderer.invoke( 'window-maximize' )
    window.api.request( 'rendererRequest', 'window-maximize' )
}

function closeWindow () {
//async function closeWindow () {
//    await window.ipcRenderer.invoke( 'window-close' )
    window.api.request( 'rendererRequest', 'window-close' )
}

function onError ( error ) {
    alert( error )
    console.error( error )
}

window.addEventListener( 'DOMContentLoaded', onDOMContentLoaded )

window.api.response( 'mainResponse', ( data ) => {
    console.log( `Renderer: Received ${ data } from main process` )
} )


