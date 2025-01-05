import Swal from "sweetalert2"
import './Alert.css'

export const Alert = (title, msg, type) => {
    return (
        Swal.fire({
            title: title,
            text: msg,
            icon: type
        })
    )
}

export const AlertConfirm = (title, msg, type, confirmCallback) => {
    return (
        Swal.fire({
            title: title,
            text: msg,
            icon: type,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                confirmCallback();
            } 
        })
    );
};