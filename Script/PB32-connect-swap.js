// Get references to elements
var modal = document.getElementById("myModal");
var walletSupportSection = document.querySelector('.wallet-support');

// Function to toggle modal-open class on wallet-support section
function toggleModalEffect() {
  walletSupportSection.classList.toggle('modal-open');
}

// Event listeners to toggle class on modal open/close
btns.forEach(function (btn) {
  btn.onclick = function () {
    modal.style.display = "block";
    toggleModalEffect();
    openVortex();
  }
});

span.onclick = function () {
  modal.style.display = "none";
  toggleModalEffect();
  revertVortex();
}

buttonSpan.onclick = function () {
  modal.style.display = "none";
  toggleModalEffect();
  revertVortex();
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    toggleModalEffect();
    revertVortex();
  }
}
