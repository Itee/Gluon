/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @see [IFC Standard]{@link http://standards.buildingsmart.org/IFC/RELEASE/IFC4_1/FINAL/HTML/}
 *
 */

const { contextBridge, ipcRenderer } = require( 'electron' )

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
// whitelist channels
const validRequestChannels  = [ 'rendererRequest' ]
const validResponseChannels = [ 'mainResponse' ]
contextBridge.exposeInMainWorld(
    'api', {
        request:  ( channel, data ) => {
            if ( !validRequestChannels.includes( channel ) ) { return }

            ipcRenderer.send( channel, data )
        },
        response: ( channel, func ) => {
            if ( !validResponseChannels.includes( channel ) ) { return }

            ipcRenderer.on( channel, ( event, ...args ) => func( ...args ) )
        }
    }
)
