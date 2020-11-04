import React          from 'react'
import Toast          from 'react-bootstrap/Toast'
import { v4 as uuid } from 'uuid'

export default class Toaster extends React.Component {

    constructor ( props ) {
        super( props )

        this.state = {
            max:      7,
            interval: {
                id:      null,
                timeout: 250
            },
            toasts:   []
        }

        // Handlers
        this.handleToastOnClose = this.handleToastOnClose.bind( this )

    }

    // Lifecycle
    componentDidMount () {

        this.toastProcessQueue()

    }

    // Methods
    toast ( data ) {

        const toast = {
            ...{
                id:      uuid(),
                visible: false,
                delay:   4000,
                title:   '',
                message: '',
                variant: 'dark'
            },
            ...data
        }

        this.state.toasts.push( toast )
        this.toastProcessQueue()

    }

    toastInfo ( message ) {
        this.toast( {
            id:       uuid(),
            title:    'Info',
            message:  message,
            variant:  'info',
            delay:    5000,
            autoHide: true,
            visible:  false
        } )
    }

    toastSuccess ( message ) {
        this.toast( {
            id:       uuid(),
            title:    'Success',
            message:  message,
            variant:  'success',
            delay:    5000,
            autoHide: true,
            visible:  false
        } )
    }

    toastWarning ( message ) {
        this.toast( {
            id:       uuid(),
            title:    'Warning',
            message:  message,
            variant:  'warning',
            delay:    7000,
            autoHide: true,
            visible:  false
        } )
    }

    toastError ( message ) {
        this.toast( {
            id:       uuid(),
            title:    'Error',
            message:  message,
            variant:  'danger',
            delay:    8000,
            autoHide: true,
            visible:  false
        } )
    }

    toastProcessQueue () {

        const numberOfToasts = this.state.toasts.length
        if ( numberOfToasts === 0 ) { return }

        let numberOfVisibleToasts = this.state.toasts.filter( toast => toast.visible ).length
        if ( numberOfVisibleToasts < this.state.max && numberOfVisibleToasts < numberOfToasts ) {

            const toasts                            = this.state.toasts.slice()
            toasts[ numberOfVisibleToasts ].visible = true

            this.setState( {
                toasts
            }, this.toastProcessQueue )

        }

    }

    // Handlers
    handleToastOnClose ( id ) {

        setTimeout( () => {

            const toasts = this.state.toasts.filter( toast => ( toast.id !== id ) )

            this.setState( {
                toasts
            }, this.toastProcessQueue )

        }, 2000 )


    }

    // Utils
    computeClassNameFromVariant ( variant ) {

        return 'toast-' + variant

    }

    // Renderers
    render () {
        return (
            <div
                style={ {
                    position: 'absolute',
                    top:      '70px',
                    right:    '15px'
                } }
            >
                { this.renderToasts( this.state.toasts ) }
            </div>
        )

    }

    renderToasts ( toasts ) {

        return toasts.map( ( toast ) =>
            <Toast
                key={ toast.id }
                show={ toast.visible }
                delay={ toast.delay }
                onClose={ this.handleToastOnClose.bind( this, toast.id ) }
                className={ this.computeClassNameFromVariant( toast.variant ) }
                autohide={ toast.autoHide }
            >
                <Toast.Header>
                    <strong className="mr-auto">{ toast.title }</strong>
                </Toast.Header>
                <Toast.Body>
                    { toast.message }
                </Toast.Body>
            </Toast>
        )

    }

}
