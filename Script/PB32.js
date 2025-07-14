document.addEventListener('DOMContentLoaded', () => {
    function animateCounter(id, endValue, incrementFn, interval = 38, formatFn = Math.floor) {
      const element = document.getElementById(id);
      let currentValue = 0;
      const increment = endValue / 100;
  
      const counterInterval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= endValue) {
          currentValue = endValue;
          clearInterval(counterInterval);
          if (incrementFn) {
            setInterval(() => {
              const randomIncrement = Math.abs(incrementFn()); // Ensure only positive increments
              currentValue += randomIncrement;
              element.textContent = formatFn(currentValue).toLocaleString();
            }, Math.floor(Math.random() * 3000) + 2000); // random interval between 1000ms to 3000ms (2-3 seconds)
          }
        }
        element.textContent = formatFn(currentValue).toLocaleString();
      }, interval);
    }
  
    // Function to get random values within a range
    function getRandomInRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    // Initial animations
    animateCounter('totalWebsockets', 1846910);
    animateCounter('activeWebsockets', 982578);
    animateCounter('apps', 728, null, 20, (val) => `${Math.floor(val)}`); // Use string interpolation for apps to include "+"
  
    // Random initial values for messages and wallets
    const initialMessages = getRandomInRange(26000, 37700);
    const initialWallets = getRandomInRange(17210, 18441);
  
    animateCounter('messages', initialMessages, () => {
      return Math.floor(Math.random() * 9) + 1; // only positive increments for messages
    }, 20);
  
    animateCounter('wallets', initialWallets, () => {
      return Math.floor(Math.random() * 4) + 1; // only positive increments for wallets
    }, 20);
  });
