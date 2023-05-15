document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('items')); // Replace 'items' with the key you used to store the data
  
    const container = document.getElementById('container');
    const sumLabel = document.getElementById('sum');
  
    let sum = 0;
  
    for (let i = 0; i < data.length; i++) {
      const earnings = data[i].earnings;
  
      const label = document.createElement('label');
      label.textContent = ` ${i + 1} `;
      label.setAttribute('style', 'display: none;');
      
  
      const textbox = document.createElement('input');
      textbox.type = 'text';
      textbox.value = earnings;
  
      // Add an event listener to calculate the sum
      textbox.addEventListener('input', () => {
        sum = calculateSum();
        sumLabel.textContent = `Sum: ${sum}`;
      });
  
      label.appendChild(textbox);
      container.appendChild(label);
    }
  
    // Calculate the initial sum
    sum = calculateSum();
    sumLabel.textContent = `Sum: ${sum}`;
  
    // Function to calculate the sum of textbox values
    function calculateSum() {
      let total = 0;
  
      const textboxes = document.querySelectorAll('input[type="text"]');
      textboxes.forEach((textbox) => {
        const value = parseFloat(textbox.value);
        if (!isNaN(value)) {
          total += value;
        }
        
      });
      // alert(total);
      const displayTotal = document.getElementById('textEarnings');
    displayTotal.textContent = 'Php' +total; // Set the content of the element to the total
  
  
      return total;
      
    }
  });