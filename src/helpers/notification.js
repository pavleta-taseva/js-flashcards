import { store } from 'react-notifications-component';

function notification(title, message) {
    return (
        store.addNotification({
            title:  title,
            message: message,
            type: "info",
            insert: "bottom-center",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        })

    )
}

export default notification
