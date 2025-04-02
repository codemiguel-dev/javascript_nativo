

// Get all menu from document
document.querySelectorAll('.buttonTrigger').forEach(attachMenuEvent);

// Menu Open and Close function
function attachMenuEvent(menuButton) {
  menuButton.addEventListener('click', function (e) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định
    this.parentElement.classList.toggle('active');
    this.classList.toggle('active');
  });
}
