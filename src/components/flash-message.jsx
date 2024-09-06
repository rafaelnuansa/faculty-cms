import Swal from "sweetalert2";

const FlashMessage = (type, message) => {
  Swal.fire({
    icon: type,
    title: type.charAt(0).toUpperCase() + type.slice(1),
    text: message,
    timer: 4000,
    showConfirmButton: true,
  });
};

export default FlashMessage;
