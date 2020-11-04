const { app, BrowserWindow, ipcMain } = require( 'electron' )
const path                            = require( 'path' )

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if ( require( 'electron-squirrel-startup' ) ) { // eslint-disable-line global-require
    app.quit()
}

let mainWindow = null

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow( {
        minWidth:       600,
        width:          1280,
        minHeight:      260,
        height:         720,
        icon:           path.join( __dirname, 'images', 'favicon.ico' ),
        frame:          false,
        show:           false,
        webPreferences: {
            worldSafeExecuteJavaScript: true,
            nodeIntegration:            false, // is default value after Electron v5
            contextIsolation:           true, // protect against prototype pollution
            enableRemoteModule:         false, // turn off remote
            preload:                    path.join( __dirname, 'scripts', 'preload.js' ) // use a preload script
            //            preload: path.join(app.getAppPath(), 'scripts', 'preload.js') // use a preload script
        }
    } )

    // Display window after all content loaded
    mainWindow.on( 'ready-to-show', () => {
        mainWindow.show()
    } )

    // and load the index.html of the app.
    mainWindow.loadURL( MAIN_WINDOW_WEBPACK_ENTRY )

    // Clean on close
    mainWindow.on( 'closed', () => {
        mainWindow = null
    } )

    // Open the DevTools.
    mainWindow.webContents.openDevTools( {
        mode: 'detach'
    } )
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on( 'ready', createWindow )
   .on( 'activate', () => {
       // On OS X it's common to re-create a window in the app when the
       // dock icon is clicked and there are no other windows open.
       if ( BrowserWindow.getAllWindows().length === 0 ) {
           createWindow()
       }
   } )
   .on( 'error', ( error ) => {
       console.error( error )
   } )
   .on( 'window-all-closed', () => {
       // Quit when all windows are closed, except on macOS. There, it's common
       // for applications and their menu bar to stay active until the user quits
       // explicitly with Cmd + Q.
       if ( process.platform !== 'darwin' ) {
           app.quit()
       }
   } )
   .on( 'quit', ( quitEvent, exitCode ) => {
       console.log( `Exit with status code: ${ exitCode }` )
   } )

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on( 'rendererRequest', ( event, args ) => {

    switch ( args ) {

        case 'window-minimize':
            mainWindow.minimize()
            break

        case 'window-maximize':
            if ( !mainWindow.isMaximized() ) {
                mainWindow.maximize()
            } else {
                mainWindow.unmaximize()
            }
            break

        case 'window-close':
            mainWindow.close()
            break

        default:
            throw new RangeError( `Invalid switch parameter: ${ args }` )

    }

    // Send result back to renderer process
    //    mainWindow.webContents.send( 'toRenderer', 'This is a response from main' )

} )
