import Swal from 'sweetalert2';

// Toast configuration for top-right notifications
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});

export const showSuccessToast = (message: string) => {
    Toast.fire({
        icon: 'success',
        title: message,
    });
};

export const showErrorToast = (message: string) => {
    Toast.fire({
        icon: 'error',
        title: message,
    });
};

export const showInfoToast = (message: string) => {
    Toast.fire({
        icon: 'info',
        title: message,
    });
};

export const showWarningToast = (message: string) => {
    Toast.fire({
        icon: 'warning',
        title: message,
    });
};

export default Toast;
