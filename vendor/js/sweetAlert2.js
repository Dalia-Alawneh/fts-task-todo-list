const swalDeleteConfirmation = Swal.mixin({
  customClass: {
    confirmButton: "px-4 py-2 bg-red-400 text-white rounded-lg ms-4",
    cancelButton: "px-4 py-2 border rounded-lg"
  },
  buttonsStyling: false
});

const showConfirmationModal = async (id) => {
  await swalDeleteConfirmation.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTodoItem(id)

      swalDeleteConfirmation.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalDeleteConfirmation.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
}