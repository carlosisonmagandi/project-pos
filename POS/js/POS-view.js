// Assuming the records are stored in localStorage under the key 'records'
const records = JSON.parse(localStorage.getItem('items'));
    
// Select the 'record-details' element
const recordDetailsElement = document.getElementById('record-details');
const DetailsEimagelement = document.getElementById('image-details');

// Function to filter records based on the search input
function filterRecords(searchCode, searchTitle) {
    // Clear the previous results
    recordDetailsElement.innerHTML = '';
    DetailsEimagelement.innerHTML = '';

    // Filter the records array based on the search input
    const filteredRecords = records.filter(record => {
        const codeMatch = record.code.toLowerCase().includes(searchCode.toLowerCase());
        const titleMatch = record.title.toLowerCase().includes(searchTitle.toLowerCase());
        return codeMatch || titleMatch;
    });

    
    if (filteredRecords.length > 0) {
        
        // Iterate over the filtered records array
        filteredRecords.forEach(record => {
            // Create dynamic HTML elements to display the record details
            const recordContainer = document.createElement('div');
            recordContainer.style.paddingBottom = '20px';
            recordContainer.style.borderBottom = '1px solid gray';

            const titleLabel = document.createElement('td');
            titleLabel.textContent = 'Title: ';
            titleLabel.style.fontWeight = 'bold';

            const titleValue = document.createElement('td');
            titleValue.textContent = record.title;
            titleValue.style.marginBottom = '8px';

            const codeLabel = document.createElement('a');
            codeLabel.textContent = 'Code: ';
            codeLabel.style.fontWeight = 'bold';

            const codeValue = document.createElement('a');
            codeValue.textContent = record.code;
            // codeValue.style.position = 'absolute';

            const qty = document.createElement('input');
            qty.type='number';
            qty.min='1';
            qty.placeholder='Enter quantity';
            qty.style.marginLeft='40%';
            qty.style.width='120px';
            qty.style.float='right';

            const addBtn = document.createElement('button');
            addBtn.className='btn btn-primary';
            addBtn.textContent='Add';
            //addBtn.style.marginLeft='20px';
            addBtn.id='addBtn';
            
            
            // Attach event listener to the button
            addBtn.addEventListener('click', function() {
                if(qty.value==''){
                    alert('please enter value for quantity')
                }
                else{
                    // Retrieve existing items from local storage
                    var storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

                    // Check if the category and code already exist in any item
                    var existingOrder = storedOrders.find(function(order) {
                    return order.category === record.category && order.code === record.code;
                    });

                    if (existingOrder) {
                    alert('This item already exists. Please update the quantity of '+existingOrder.title);
                    return; // Exit the function without adding the item
                    }
                    else{
                        const currentIdValue = idValue.textContent;
                        const currentEarningsValue = earningsValue.textContent;
                        
                        var image=record.imagePath;
                        var category = record.category;
                        var code=record.code;
                        var title=record.title;
                        var price=record.price;
                        var earnings=record.earnings;
                        var quantity=qty.value;
                        // get current date
                        var currentDate = new Date();

                        // Extracting individual date components
                        var year = currentDate.getFullYear();
                        var month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
                        var day = currentDate.getDate();
                    
                        // Formatting the date as desired
                        var formattedDate = year + '-' + month + '-' + day;

                        var date=formattedDate;
                        var fKeyId=record.id;

                        var currentOrderNo = parseInt(localStorage.getItem("orderNo"));

                        if (currentOrderNo !== null && !isNaN(currentOrderNo)) {
                        // There is a record for orderNo
                        var orderNo = currentOrderNo.toString();
                        var paddedOrderNo = orderNo.padStart(10, '0');
                        // Additional code logic for handling the existing orderNo record
                        }

                        // Retrieve existing items from local storage
                        var storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
                        //var id=storedOrders[storedOrders.length-1].id+1;
                        var id=1;
                        // Generate a new ID if there are existing items
                        if (storedOrders.length > 0) {
                        id = storedOrders[storedOrders.length - 1].id + 1;
                        }

                        var newItem = {
                            id: id,
                            image:image,
                            category:category,
                            code: code,
                            title:title,
                            price:price,
                            earnings:earnings,
                            quantity:quantity,
                            date:date,
                            fKeyId:fKeyId,
                            orderNo:paddedOrderNo
                        };

                        // Add new item to the array
                        storedOrders.push(newItem);
                        // Store updated items in local storage
                        localStorage.setItem('orders', JSON.stringify(storedOrders));

                        qty.value=''

                        // Retrieve existing items from local storage
                        var existingRecordItems = JSON.parse(localStorage.getItem('items'));
                        var itemIndex = existingRecordItems.findIndex(function(item) {
                        return item.code === code;
                        });

                       
                        displayOrders();
                    }
                    
                }
            });


            const priceLabel = document.createElement('td');
            priceLabel.textContent = 'Price: ';
            priceLabel.style.fontWeight = 'bold';

            const priceValue = document.createElement('td');
            const totalPrice = parseFloat(record.price) + parseFloat(record.earnings);
            priceValue.textContent = totalPrice.toFixed(2);
            priceValue.style.marginBottom = '15px';

            const idLabel = document.createElement('a');
            idLabel.textContent = 'Id: ';
            idLabel.style.fontWeight = 'bold';
            idLabel.style.display='none';

            const idValue = document.createElement('a');
            idValue.textContent = record.id;
            idValue.style.position = 'absolute';
            idValue.style.display='none';

            const earningsLabel = document.createElement('td');
            earningsLabel.textContent = 'Earning: ';
            earningsLabel.style.fontWeight = 'bold';
            earningsLabel.style.display='none';

            const earningsValue = document.createElement('td');
            earningsValue.textContent = record.earnings;
            earningsValue.style.marginBottom = '8px';
            earningsValue.style.display='none';

            // Assign earningsValue to the outer variable
            earningsValueOuter = earningsValue;

            const imageElement = document.createElement('img');
            imageElement.src = record.imagePath;
            imageElement.alt = 'Image';
            imageElement.style.marginBottom = '15px';
            imageElement.style.border='2px solid black';
            imageElement.style.boxShadow=' box-shadow: 0 px 4px rgba(0, 0, 0, .5);';
            imageElement.style.borderRadius='6px';
            imageElement.style.opacity='.8';
            imageElement.style.width = '150px'; // Set the width to 100 pixels
            imageElement.style.height = '120px'; // Set the height to 90 pixels
             

            // Append the dynamically created elements to the 'record-details' element
            recordContainer.appendChild(titleLabel);
            recordContainer.appendChild(titleValue);
            recordContainer.appendChild(codeLabel);
            recordContainer.appendChild(codeValue);
            
            
            recordContainer.appendChild(priceLabel);
            recordContainer.appendChild(priceValue);    
            recordContainer.appendChild(idLabel);
            recordContainer.appendChild(idValue);  
            recordContainer.appendChild(earningsLabel);
            recordContainer.appendChild(earningsValue);
            recordContainer.appendChild(addBtn); 
            recordContainer.appendChild(qty); 

            DetailsEimagelement.appendChild(imageElement);
            recordDetailsElement.appendChild(recordContainer);

            

        });
    } else {
        // Display a message if no records are found
        recordDetailsElement.textContent = 'No records found.';
    }
   
}

// Event listener for the search inputs
document.getElementById('codeInput').addEventListener('input', function (event) {
    const searchCode = event.target.value;
    const searchTitle = document.getElementById('codeInput').value;
    filterRecords(searchCode, searchTitle);
});

document.getElementById('titleInput').addEventListener('input', function (event) {
    const searchCode = document.getElementById('titleInput').value;
    const searchTitle = event.target.value;
    filterRecords(searchCode, searchTitle);
});

// Filter records initially with empty search inputs
filterRecords('', '');

const button = document.getElementById('addBtn');


// -----------------------------------------------------------------------------------------------
//Receipt order view
function displayOrders() {
        var records = JSON.parse(localStorage.getItem('orders'));
        var totalSum = 0;
        var orderNoLabel1 = document.getElementById('orderNoLabel');

        
        
        if (records && records.length > 0) 
        {

            var tbody = document.getElementById('receipt-items-body');
            tbody.innerHTML = '';
            
            records.forEach(function(record, index) 
            {
                var row = document.createElement('tr');

                var titleCell = document.createElement('td');
                titleCell.textContent = record.title;
                row.appendChild(titleCell);

                var quantityCell = document.createElement('td');
                quantityCell.textContent = record.quantity;
                row.appendChild(quantityCell);

                var price = parseFloat(record.price) + parseInt(record.earnings);
                var priceCell = document.createElement('td');
                priceCell.textContent = price;
                row.appendChild(priceCell);

                var total =
                    (parseFloat(record.price) + parseFloat(record.earnings)) *
                    parseInt(record.quantity);
                var totalCell = document.createElement('td');
                totalCell.textContent = 'Php ' + total.toFixed(2);
                row.appendChild(totalCell);

                var actionCell = document.createElement('td');

                var updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.className = 'btn btn-warning';
                updateButton.addEventListener('click', function() {
                    updateRecord(index);
                });
                actionCell.appendChild(updateButton);

                var deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'btn btn-danger';
                deleteButton.style.marginLeft='10px';
                deleteButton.addEventListener('click', function() {
                    deleteRecord(index);
                });
                actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                tbody.appendChild(row);
                totalSum += total;
            });
        }

    document.querySelector('.receipt-total strong').textContent =
    'Php ' + totalSum.toFixed(2);

    function deleteRecord(index) {
        var records = JSON.parse(localStorage.getItem('orders'));
        records.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(records));
        displayOrders(); // Refresh the displayed orders after deletion
    }

    function updateRecord(index) {
        var records = JSON.parse(localStorage.getItem('orders'));
        var updatedRecord = records[index];

        var newQuantity = prompt('Enter the updated quantity:', updatedRecord.quantity);
        var newDate = prompt('Enter the updated date:', updatedRecord.date);
        
        if (newQuantity !== null || newDate !== null) {
            // Validate the new quantity (optional)
            var parsedQuantity = parseInt(newQuantity);
            if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
                alert('Invalid quantity. Please enter a positive number.');
                return; // Exit the function if the quantity is invalid
            }

            // Update the record with the new quantity and date
            updatedRecord.quantity = parsedQuantity;
            updatedRecord.date = newDate;
            
            localStorage.setItem('orders', JSON.stringify(records));
            displayOrders(); // Refresh the displayed orders after updating
        }
    }

   
     // get current date
     var currentDate = new Date();

    // Extracting individual date components
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    var day = currentDate.getDate();

    // Formatting the date as desired
    var formattedDate = year + '-' + month + '-' + day;

    var date=formattedDate;
    // Add an event listener to the button
   


    // ------------------------------------------------------------------------------------------
    // Order view display date
    // Get the label element
    var label = document.getElementById("dateLabel");

    // Clear the contents of the label before appending the new date
    label.innerHTML = '';

    var boldText = document.createElement("strong");
    boldText.textContent = "Date: ";

    // Append the bold text and the current date to the label
    label.appendChild(boldText);
    label.appendChild(document.createTextNode(date));
    //------------------------------------------------------------------------------------------- 
    //Order number view display
    // Get the button element by its ID
    const button = document.getElementById('newTransactionBtn');
    
    // Add event listener to the button
    button.addEventListener('click', function() {
         // Retrieve the current value of orderNo from local storage
         let orderNo = localStorage.getItem('orderNo');
         //let orderNo='0000000001';

        // Convert the orderNo to a number and increment it by 1
        orderNo = Number(orderNo) +1;

        // Pad the orderNo with leading zeros to make it 10 digits long
        orderNo = orderNo.toString().padStart(10, '0');

        // Update the value in local storage
        localStorage.setItem('orderNo', orderNo);

        // Update the display in the HTML
        document.getElementById('orderNoLabel').textContent = orderNo;

        localStorage.setItem('orderNo', orderNo);
        updateLabelValue();
        
    });   
    
    // Get the label element by its ID
    const orderNoLabel = document.getElementById('orderNoLabel');

    // Function to update the label value
    function updateLabelValue() {
    // Get the orderNo value from the localStorage
    const orderNo = localStorage.getItem('orderNo');

    // Update the label value
    orderNoLabel.textContent = orderNo;
    // Hide the button if orderNo has a value
        if (orderNo) {
            button.style.display = 'none';
        } else {
            button.style.display = 'none';
        }
    }

    // Call the updateLabelValue function initially to set the initial value
    updateLabelValue();

    // Listen for changes in the localStorage
    window.addEventListener('storage', function(event) {
    // Check if the changed item is the 'orderNo' key
    if (event.key === 'orderNo') {
        // Call the updateLabelValue function to update the label value
        updateLabelValue();
    }
    });
    //------------------------------------------------------------------------
    //generated order number on page load
    window.addEventListener('DOMContentLoaded', function() {
    var randomValue = Math.floor(1000000000 + Math.random() * 9000000000);
    document.getElementById('orderNoLabel').textContent = randomValue;
    localStorage.setItem("orderNo", JSON.stringify(randomValue));

    document.getElementById('compleBtn').addEventListener('click', function() {
      var randomValue = Math.floor(1000000000 + Math.random() * 9000000000);
      document.getElementById('orderNoLabel').textContent = randomValue;
      localStorage.setItem("orderNo", JSON.stringify(randomValue));
    });
  });
    // ------------------------------------------------------------------------
    //Update recordNo table
    const compleBtn = document.getElementById('compleBtn');


    compleBtn.addEventListener('click', function() {
      // ----------------------------------------------------------------------------------
      //stock computation
      const orders = JSON.parse(localStorage.getItem('orders'));
      const items = JSON.parse(localStorage.getItem('items'));

      if (!orders || !items) {
        console.log('No data found in local storage');
        return;
      }

      orders.forEach(order => {
        const item = items.find(item => item.id === order.fKeyId);
        if (item) {
          const quantity = parseInt(order.quantity);
          const stock = parseInt(item.stock);

          if (quantity > stock) {
            console.log(`Insufficient stock for order ID ${order.id}`);
          } else {
            item.stock = (stock - quantity).toString();
            console.log(`Stock updated for order ID ${order.id}`);
          }
        } else {
          console.log(`Item not found for order ID ${order.id}`);
        }
      });

      localStorage.setItem('items', JSON.stringify(items));
      //-------------------------------------------------------------------------------------
     
      // Assuming you have an array of data records stored in the local storage key named "keyOrders"
      var keyOrders = JSON.parse(localStorage.getItem("orders"));

      // Assuming you have an array in the "allOrders" key to store all the orders
      var allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];

      // Push the data records from "keyOrders" to "allOrders"
      allOrders.push(...keyOrders);

      // Store the updated "allOrders" array back to the local storage key "allOrders"
      localStorage.setItem("allOrders", JSON.stringify(allOrders));

      // Clear the "keyOrders" key
      localStorage.removeItem("orders");
      
      //clear the view
      alert('Transaction complete!');
      var ordersContainer = document.getElementById("receipt-items-body");
      ordersContainer.innerHTML = "";

      var totalSumVal = document.getElementById("total");
      totalSumVal.innerHTML = "";

      updateStock();
      console.log(items);
    });
    document.getElementById('compleBtn').addEventListener('click', function() {
var randomValue = Math.floor(1000000000 + Math.random() * 9000000000);
document.getElementById('orderNoLabel').textContent = randomValue;
localStorage.setItem("orderNo", JSON.stringify(randomValue));

// Deduct quantity from stock
// Retrieve data from local storage
const items = localStorage.getItem('items');
const allOrders = localStorage.getItem('orders');

// Convert data to JavaScript objects
let itemsData = JSON.parse(items);
const allOrdersData = JSON.parse(allOrders);

// Loop through all orders
for (const order of allOrdersData) {
// Find the matching item in the "items" collection
const matchingItem = itemsData.find(item => item.id === order.id);

if (matchingItem) {
// Parse stock and quantity to numbers
matchingItem.stock = Number(matchingItem.stock);
order.quantity = Number(order.quantity);

// Subtract the quantity from the stock of the matching item
matchingItem.stock -= order.quantity;
}
}

// Save the updated item records back to local storage
localStorage.setItem('items', JSON.stringify(itemsData));
});

    
}

 // Call the displayOrders function initially to show the existing records
    displayOrders();

