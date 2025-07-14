document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.form-header');
    const sliders = document.querySelectorAll('.form-slider');
    if (headers.length > 0) {
      headers[0].classList.add('active'); 
    }
    if (sliders.length > 0) {
      sliders[0].classList.add('active'); 
    }
  
    headers.forEach(header => {
      header.addEventListener('click', function () {
        headers.forEach(h => h.classList.remove('active'));
        this.classList.add('active');
        const targetId = header.getAttribute('data-target');
        sliders.forEach(slider => {
          if (slider.id === targetId) {
            slider.classList.add('active');
          } else {
            slider.classList.remove('active');
          }
        });
      });
    });
  });
