document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('allOrders')); // Replace 'items' with the key you used to store the data

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
    displayTotal.textContent = 'Php. ' + total; // Set the content of the element to the total


    return total;

  }

});
// ------------------------------------------------------------------------------------------
    //TOTAL SALE
  document.addEventListener('DOMContentLoaded', function() {

    const data2 = JSON.parse(localStorage.getItem('allOrders'));
    let totalSum = 0.0;

    for (let i = 0; i < data2.length; i++) {
      const earnings = parseFloat(data2[i].earnings);
      const price = parseFloat(data2[i].price);
      const rowTotal = earnings + price;
      totalSum += rowTotal;
    }

    document.getElementById('textTotalSale').textContent = 'Php. '+ totalSum.toFixed(2);
  });

  // ---------------------------------------------------------------------------------------------
  //STOCKS
  document.addEventListener('DOMContentLoaded', function() {
    const allOrders = JSON.parse(localStorage.getItem("items"));

    
  });

  //----------------------------------------------------------------------------------------------
  //modals
  $(document).ready(function() {

    
    // Retrieve data from local storage
    var data = JSON.parse(localStorage.getItem('items'));
    var tableBody = document.getElementById('table-body');

    // Check if data exists in local storage
    if (data && data.length > 0) {
      var rowCount = 0; // Counter for filtered rows
      
      for (var i = 0; i < data.length; i++) {
        // Filter rows with a value of 10
        if (parseInt(data[i].stock) <= 10) {
          var row = document.createElement('tr');
          var cell1 = document.createElement('td');
          var cell2 = document.createElement('td');
          var cell3 = document.createElement('td');

          cell1.textContent = data[i].title;
          cell2.textContent = data[i].stock;

          var image = document.createElement('img');
          image.src = data[i].imagePath;
          image.alt = data[i].title;
          image.style.width = '100px';
          image.style.height = '100px';

          cell3.appendChild(image);

          row.appendChild(cell3);
          row.appendChild(cell1);
          row.appendChild(cell2);

          tableBody.appendChild(row);
          rowCount++; // Increment row count
        }
      }
      var stock = document.getElementById('stockLabel');
      
      stock.textContent = rowCount;
      //alert('Total filtered rows: ' + rowCount);
    } else {
      console.log('No data found in local storage or empty data.');
    }

  });
  // --------------------------------------------------------------------------
  function printDivContent(id) {
    var data=document.getElementById(id).innerHTML;
            var myWindow = window.open('', 'my div', 'height=400,width=600');
            myWindow.document.write('<html><head><title>my div</title>');
            /*optional stylesheet*/ //myWindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
            myWindow.document.write('</head><body >');
            myWindow.document.write(data);
            myWindow.document.write('</body></html>');
            myWindow.document.close(); // necessary for IE >= 10

            myWindow.onload=function(){ // necessary if the div contain images

                myWindow.focus(); // necessary for IE >= 10
                myWindow.print();
                myWindow.close();
            };
        }
  
  
  


  // -------------------------------------------------------------------------
  //printing whole page
  // function printChartContent() {
  //   var printContents = document.getElementById('myChart').innerHTML;
  //   var printWindow = window.open('', '_blank');
    
  //   printWindow.document.open();
  //   printWindow.document.write('<html><head><title>Print</title></head><body>');
  //   printWindow.document.write(printContents);
  //   printWindow.document.write('</body></html>');
  //   printWindow.document.close();
    
  //   printWindow.print();
  //   printWindow.close();
  // }
  
  // // Call the function when the chart content is ready
  // window.addEventListener('load', function() {
  //   // Assuming the chart content is ready at this point
  //   printChartContent();
  // });
  
  