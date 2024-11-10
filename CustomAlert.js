import Swal from 'sweetalert2';

const CustomAlert = {
  success: (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      confirmButtonColor: '#4CAF50', // Green color
    });
  },
  error: (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#F44336', // Red color
    });
  },
  info: (message) => {
    Swal.fire({
      icon: 'info',
      title: 'Information',
      text: message,
      confirmButtonColor: '#2196F3', // Blue color
    });
  },
  warning: (message) => {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: message,
      confirmButtonColor: '#FF9800', // Orange color
    });
  },
};

export default CustomAlert;
