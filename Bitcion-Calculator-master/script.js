const button = document.querySelector('.investment__btn');
button.addEventListener('click', () => {
  // 1. Select and read from the UI
    const priceBought = document.querySelector('.price__input--bought').value;
    const priceNow = document.querySelector('.price__input--now').value;
    const investment = document.querySelector('.investment__btc').value;
    const result = document.querySelector('.result'); 


  if (!priceBought || !priceNow || !investment) {

    result.textContent = 'Pls fill out all fields';
  } else {
        // 2. Calculate the Profits
        const moneySpent = investment * priceBought;
        const btcToday = priceNow * investment;
        const btcProfit = btcToday - moneySpent;
        const percentage = Math.round(btcProfit / btcToday * 100);
          
      // 3. Write to the UI
      if (btcProfit > 0 ) {
        result.classList.add('middle');
        result.classList.add('loss');
        result.classList.remove('middle');
        result.classList.remove('loss');
        result.classList.add('profit');
        result.textContent = `You bought ${investment}btc at ${moneySpent}$ when the price was ${priceBought}$/btc. The current price is ${priceNow}$/btc. You profit ${btcProfit}$. Youve made ${percentage}% Profit`;
    
      } else if (btcProfit < 0) {
        result.classList.add('middle');
        result.classList.add('profit');
        result.classList.remove('middle');
        result.classList.remove('profit');
        result.classList.add('loss');
        result.textContent = `You bought ${investment}btc at ${moneySpent}$ when the price was ${priceBought}$/btc. The current price is ${priceNow}$/btc. You Lost ${btcProfit}$. Youve made ${percentage}% Loss`;
    
      } else {
        result.classList.add('profit');
        result.classList.add('loss');
        result.classList.remove('profit');
        result.classList.remove('loss');
        result.classList.add('middle');
        result.textContent = `You bought ${investment}btc at ${moneySpent}$ when the price was ${priceBought}$/btc. The current price is still ${priceNow}$/btc. You niether loss nor gain`;
    
      }
    
  }
  
})

