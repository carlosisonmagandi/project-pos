//----------------------------------------------------------------------------------------
//order hystory
 // Wait for the DOM to be ready
 jQuery(document).ready(function($) {
    // Initialize the datepicker
    $('#datepicker').datepicker({
      format: 'mm/dd/yyyy',
      autoclose: true,
      todayHighlight: true,
    });
    // -------------------------------------------------------------------------------------
    //function for ordernumber
    // Listen for changes in the order filter textbox
    $('#orderFilter').on('input', function() {
      var orderNumber = $(this).val();

      // Perform filtering based on the order number
      filterRecordsByOrder(orderNumber);
    });

    // Retrieve data from local storage and populate table
    populateTable();
    function filterRecordsByOrder(orderNumber) {

      // Retrieve data from local storage
      var data = localStorage.getItem('allOrders');

      // Parse the JSON data
      var orders = JSON.parse(data);

      // Filter the orders based on the order number
      var filteredOrders = orders.filter(function(order) {
        // Compare the order numbers (case-insensitive)
        return order.orderNo.toLowerCase().includes(orderNumber.toLowerCase());
      });

      // Get a reference to the table body
      var tableBody = document.getElementById('tableBody');

      // Clear existing table rows
      tableBody.innerHTML = '';

      // Loop through the filtered orders and create table rows
      for (var i = 0; i < filteredOrders.length; i++) {
        // Create a new row
        var row = document.createElement('tr');

        // Create orderNo cell
        var orderNoCell = document.createElement('td');
        orderNoCell.textContent = filteredOrders[i].orderNo;
        row.appendChild(orderNoCell);

        // Create title cell
        var titleCell = document.createElement('td');
        titleCell.textContent = filteredOrders[i].title;
        row.appendChild(titleCell);

        // Create date cell
        var dateCell = document.createElement('td');
        dateCell.textContent = filteredOrders[i].date;
        row.appendChild(dateCell);

        // Add the row to the table body
        tableBody.appendChild(row);
      }
    }
    // ----------------------------------------------------------------------------------------------------------------
    // Listen for changes in the datepicker
    $('#datepicker').on('changeDate', function(e) {
      var selectedDate = e.format();

      // Perform filtering based on the selected date
      filterRecordsByDate(selectedDate);
    });

    // Retrieve data from local storage and populate table
    populateTable();

    // Button click event
    $('#slideButton').click(function() {
      var $myDiv = $('#myDiv');
      if ($myDiv.css('left') === '-800px') {
        $myDiv.animate({ left: '0' }, 500);
      } else {
        $myDiv.animate({ left: '-800px' }, 500);
      }

      // Update the table after button click
      populateTable();
    });
  });
  function filterRecordsByDate(selectedDate) {
  // Retrieve data from local storage
  var data = localStorage.getItem('allOrders');

  // Parse the JSON data
  var orders = JSON.parse(data);

  // Filter the orders based on the selected date
  var filteredOrders = orders.filter(function(order) {
    // Create Date objects for comparison
    var orderDate = new Date(order.date);
    var selectedDateObj = new Date(selectedDate);

    // Compare the dates
    return (
      orderDate.getFullYear() === selectedDateObj.getFullYear() &&
      orderDate.getMonth() === selectedDateObj.getMonth() &&
      orderDate.getDate() === selectedDateObj.getDate()
    );
  });

  // Get a reference to the table body
  var tableBody = document.getElementById('tableBody');

  // Clear existing table rows
  tableBody.innerHTML = '';

  // Loop through the filtered orders and create table rows
  for (var i = 0; i < filteredOrders.length; i++) {
    // Create a new row
    var row = document.createElement('tr');


    // Create orderNo cell
    var orderNoCell = document.createElement('td');
    orderNoCell.textContent = filteredOrders[i].orderNo;
    row.appendChild(orderNoCell);

    // Create title cell
    var titleCell = document.createElement('td');
    titleCell.textContent = filteredOrders[i].title;
    row.appendChild(titleCell);

    // Create date cell
    var dateCell = document.createElement('td');
    dateCell.textContent = filteredOrders[i].date;
    row.appendChild(dateCell);

    // Add the row to the table body
    tableBody.appendChild(row);
  }
}


  function populateTable() {
    // Retrieve data from local storage
    var data = localStorage.getItem('allOrders');

    // Parse the JSON data
    var orders = JSON.parse(data);

    // Get a reference to the table body
    var tableBody = document.getElementById('tableBody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Loop through the orders and create table rows
    for (var i = 0; i < orders.length; i++) {
      // Create a new row
      var row = document.createElement('tr');

      // Create OrderNo cell
      var dateCell = document.createElement('td');
      dateCell.textContent = orders[i].orderNo;
      row.appendChild(dateCell);

      // Create title cell
      var titleCell = document.createElement('td');
      titleCell.textContent = orders[i].title;
      row.appendChild(titleCell);

      // Create date cell
      var dateCell = document.createElement('td');
      dateCell.textContent = orders[i].date;
      row.appendChild(dateCell);

      

      // Add the row to the table body
      tableBody.appendChild(row);
    }
    
  }