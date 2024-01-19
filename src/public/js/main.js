function showToast(status, message) {
  let toast = document.getElementById('toastMessage');
  if (toast) {
    toast.classList.remove('bg-success', 'bg-danger', 'show');
  } else {
    toast = document.getElementById('toastMessage');
  }

  toast.querySelector('.toast-body').innerHTML = message;

  if (status == 'success') {
    toast.classList.add('bg-success', 'show');
  } else if (status == 'error') {
    toast.classList.add('bg-danger', 'show');
  }

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}