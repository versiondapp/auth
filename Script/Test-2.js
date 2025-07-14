var modal = document.getElementById("myModal");
var closeBtn = document.getElementsByClassName("close")[0];
var closeButton = document.querySelector(".close-button");
var items = document.querySelectorAll(".openModalButton .item");

items.forEach(function (item) {
  item.addEventListener("click", function () {
    var logoTitle = this.querySelector(".logo-title").textContent;
    var logoSrc = this.querySelector(".logo").src;

    document.querySelector(".modal-connection-status-2a").textContent = logoTitle;
    document.querySelector(".modal-logo").src = logoSrc;

    modal.style.display = "block";
  });
});

closeBtn.onclick = function () {
  modal.style.display = "none";
}

closeButton.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
