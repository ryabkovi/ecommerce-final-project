import { toast } from "react-toastify";

export function toastSuccess(msg) {
  toast.success(msg, {
    position: "top-center",
    autoClose: 1000,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  });
}

export function toastError(msg) {
  toast.error(msg, {
    position: "top-center",
    autoClose: 1000,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  });
}
