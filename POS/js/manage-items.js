function addItem() {
    // Retrieve input values
    var category = document.getElementById('category').value;
    var code = document.getElementById('code').value;
    var title = document.getElementById('title').value;
    var price = document.getElementById('price').value;
    var earnings = document.getElementById('earnings').value;
    var stock = document.getElementById('stock').value;
  
    // Check if any of the fields are empty
    if (!category || !code || !title || !price || !earnings || !stock) {
      alert('Please fill in all the fields.');
      return; // Exit the function without adding the item
    }
    // Retrieve existing items from local storage
    var storedItems = JSON.parse(localStorage.getItem('items')) || [];

    // Check if the category, code, and title already exist
    var existingItem = storedItems.find(function(item) {
        return item.category === category && item.code === code ;
    });

    if (existingItem) {
        alert('This item already exists. Please enter unique values for category, code, and title.');
        return; // Exit the function without adding the item
    }
  
    var currentDate = new Date();
  
    // Extracting individual date components
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    var day = currentDate.getDate();
  
    // Formatting the date as desired
    var formattedDate = year + '-' + month + '-' + day;
  
    console.log(formattedDate); // Output: "2023-05-12" (assuming current date is May 12, 2023)
  
    var date = formattedDate;
  
    // File path of the image
    var fileInput = document.getElementById('myFileInput');
    var imagePath = 'assets/img/' + getFileNameFromPath(fileInput.value); // Adjust the file path accordingly
  
    // Retrieve existing items from local storage
    var storedItems = JSON.parse(localStorage.getItem('items')) || [];
  
    // Get the total row count
    var id = storedItems.length + 1;
  
    var newItem = {
      id: id,
      imagePath: imagePath,
      category: category,
      code: code,
      title: title,
      price: price,
      earnings: earnings,
      stock: stock,
      date: date,
    };
  
    // Add new item to the array
    storedItems.push(newItem);
  
    // Store updated items in local storage
    localStorage.setItem('items', JSON.stringify(storedItems));
  
    // Clear input fields
    document.getElementById('category').value = '';
    document.getElementById('code').value = '';
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('earnings').value = '';
    document.getElementById('stock').value = '';
  
    alert('Created Successfully');
    // Add the new item to the DataTable
     var table = $('#datatablesSimple1').DataTable();
    table.row.add(newItem).draw(false);
  }
  //create this function because by defailt if we alert the value of fileInput, the value is C:\fakepath\<image>
  // Helper function to extract file name from the file path
  function getFileNameFromPath(path) {
    var startIndex = path.lastIndexOf('\\') + 1;
    var endIndex = path.length;
    var fileName = path.substring(startIndex, endIndex);
    return fileName;
  }
  

// ---------------------------------------------------------------------------------------
// Display of items

$(document).ready(function() {
  

    // Retrieve data from local storage
    var itemData = JSON.parse(localStorage.getItem('items'));
  
    // Initialize the DataTable
    var table = $('#datatablesSimple1').DataTable({
      data: itemData,
      columns: [
        { data: 'id' },
        { 
            data: 'imagePath',
            render: function(data, type, row) {
              // Generate image tag with the image path as the source
              return '<img src="' + data + '" alt="Image" style="width: 100px; height: 100px;">'
              ;
            }
          },
        { data: 'category' },
        { data: 'code' },
        { data: 'title' },
        { data: 'price' },
        { data: 'earnings' },
        { data: 'stock' },
        { data: 'date' },
        {
          data: null,
          render: function(data, type, row) {
            // Generate delete and update icons
            var deleteIcon = '<i  class="fa fa-trash delete-icon" data-id="' + data.id + '"></i> ';
            var updateIcon = '<i  class="fa fa-edit edit-icon" data-id="' + data.id + '"></i> ';
            
            
            // Combine icons into a single column
            return deleteIcon + updateIcon ;
          }
        }
      ]
    });

    // Event listener for delete icon
    $(document).ready(function() {
        $('#datatablesSimple1').on('click', '.delete-icon', function() {
          var id = $(this).data('id');
          
          // Retrieve staffs data from localStorage
          var items = JSON.parse(localStorage.getItem('items')) || [];
      
          // Find the index of the staff object to be deleted
          var index = -1;
          for (var i = 0; i < items.length; i++) {
            if (items[i].id === id) {
              index = i;
              break;
            }
          }
          // Remove the item object from the staffs array
          if (index !== -1) {
            items.splice(index, 1);
          }
      
          // Update localStorage with modified staffs data
          localStorage.setItem('items', JSON.stringify(items));
      
          // Delete the row from DataTable
          var table = $('#datatablesSimple1').DataTable();
          table.row($(this).closest('tr')).remove().draw();
      
          alert('Delete ID: ' + id);
        });
      });

      // -------------------------------------------------
      // Event listener for update icon
      $(document).ready(function() {
        //file input event. Get the value and display the value to hiddent textbox
        const fileInput = document.getElementById('fileInput');
        const textBox = document.getElementById('textBox');
        const alertButton = document.getElementById('alertButton');

        fileInput.addEventListener('change', function () {
          if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            textBox.value = file.name;
          }
        });

        fileInput.addEventListener('change', function() {
          if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            textBox.value = file.name;
          }
        });
        
        alertButton.addEventListener('click', function() {
          const textBoxValue = textBox.value;
        
          if (textBoxValue.includes('assets/img')) {
            alert('The value contains "assets/img"');
            var fileName = textBoxValue.replace('assets/img/', 'assets/img/');
            updateImage(fileName);
          } else {
            alert('The value does not contain "assets/img"');
            var fileName = 'assets/img/' + textBox.value;
            updateImage(fileName);
          }
        });
        


        var id; // Declare the id variable outside the event listener
      
        $('#datatablesSimple1').on('click', '.edit-icon', function() {
          id = $(this).data('id'); // Assign the value to the id variable
      
          // Retrieve item data from localStorage
          var items = JSON.parse(localStorage.getItem('items')) || [];
      
          // Find the index of the item object to be updated
          var index = -1;
          for (var i = 0; i < items.length; i++) {
            if (items[i].id === id) {
              index = i;
              break;
            }
          }
      
          // Update the item object from the items array
          if (index !== -1) {
            var item = items[index];
      
            // Set the value of the textbox
            document.getElementById('txtBoxId').value = item.id;
            document.getElementById('textBox').value = item.imagePath;
            //document.getElementById('txtBoxImage').value = item.imagePath;
            document.getElementById('txtBoxCategory').value = item.category;
            document.getElementById('txtBoxCode').value = item.code;
            document.getElementById('txtBoxTitle').value = item.title;
            document.getElementById('txtBoxPrice').value = item.price;
            document.getElementById('txtBoxEarnings').value = item.earnings;
            document.getElementById('txtBoxStock').value = item.stock;
            document.getElementById('txtBoxDate').value = item.date;
      
            // Event listener for the update button
            //document.getElementById('updateBtn1').addEventListener('click', updateItem);
            document.getElementById('updateBtn2').addEventListener('click', updateItem);
            document.getElementById('updateBtn3').addEventListener('click', updateItem);
            document.getElementById('updateBtn4').addEventListener('click', updateItem);
            document.getElementById('updateBtn5').addEventListener('click', updateItem);
            document.getElementById('updateBtn6').addEventListener('click', updateItem);
            document.getElementById('updateBtn7').addEventListener('click', updateItem);
            document.getElementById('updateBtn8').addEventListener('click', updateItem);
            
          }
        });
        //Update image
        function updateImage(fileName){
          var newFileInput =fileName;


          // Retrieve item data from localStorage
          var items = JSON.parse(localStorage.getItem('items')) || [];
          // Find the index of the item object to be updated
          var index = -1;
          for (var i = 0; i < items.length; i++) {
            if (items[i].id === id) {
              index = i;
              break;
            }
          }
           // Update the item object with the new category
           if (index !== -1) {
            items[index].imagePath = newFileInput;
            localStorage.setItem('items', JSON.stringify(items));
            alert('Item updated successfully!');
            // Redraw the DataTable
            table.clear().rows.add(items).draw();
          }
          

        }
        // Function to update the item
        function updateItem() {
          

          //var newImage = document.getElementById('txtBoxImage').value;
          var newCategory = document.getElementById('txtBoxCategory').value;
          var newCode = document.getElementById('txtBoxCode').value;
          var newTitle = document.getElementById('txtBoxTitle').value;
          var newPrice = document.getElementById('txtBoxPrice').value;
          var newEarnings = document.getElementById('txtBoxEarnings').value;
          var newStock = document.getElementById('txtBoxStock').value;
          var newDate = document.getElementById('txtBoxDate').value;
      
          // Retrieve item data from localStorage
          var items = JSON.parse(localStorage.getItem('items')) || [];
          
          // Find the index of the item object to be updated
          var index = -1;
          for (var i = 0; i < items.length; i++) {
            if (items[i].id === id) {
              index = i;
              break;
            }
          }
      
          // Update the item object with the new category
          if (index !== -1) {
            // items[index].imagePath = newFileInput;
            items[index].category = newCategory;
            items[index].code = newCode;
            items[index].title = newTitle;
            items[index].price = newPrice;
            items[index].earnings = newEarnings;
            items[index].stock = newStock;
            items[index].date = newDate;
            localStorage.setItem('items', JSON.stringify(items));
            alert('Item updated successfully!');
            // Redraw the DataTable
            table.clear().rows.add(items).draw();
          }
        }
      });
      
    
  
    // Enable pagination
    table.DataTable().paginate({
      'pagingType': 'full_numbers'
    });
  
    // Enable sorting
    table.DataTable().order();
  
    // Enable filtering
    table.DataTable().search('').columns().search('').draw();
  
    // Apply the search functionality to each column
    table.DataTable().columns().every(function() {
      var column = this;
  
      $(column.footer()).empty();
  
      var input = $('<input>')
        .appendTo($(column.footer()))
        .on('keyup change', function() {
          column.search($(this).val(), false, false).draw();
        });
  
      $('<i class="fa fa-search"></i>')
        .appendTo($(column.footer()));
    });
  });

//   ------------------------------------------------------------------------------------
//Update modal
$(document).ready(function() {
    // ...
  
    // Event listener for update icon
    $('#datatablesSimple1').on('click', '.edit-icon', function() {
      var id = $(this).data('id');
      
  
      // Retrieve item data from localStorage
      var items = JSON.parse(localStorage.getItem('items')) || [];
  
      // Find the item object with the matching ID
      var item = items.find(function(item) {
        return item.id === id;
      });
  
      if (item) {
        // Populate the modal fields with the item's data
        $('#editModal #id').val(item.id);
        $('#editModal #category').val(item.category);
        $('#editModal #code').val(item.code);
        $('#editModal #title').val(item.title);
        $('#editModal #price').val(item.price);
        $('#editModal #earnings').val(item.earnings);
        $('#editModal #stock').val(item.stock);
        $('#editModal #date').val(item.date);
        // Add additional fields as necessary
        
        // Open the modal
        $('#editModal').modal('show');
      }
    });

      // Event listener for Close button
      $('#editModal').on('click', '.btn-secondary, .close', function() {
        // Close the modal
        $('#editModal').modal('hide');
      });
  
 
  });

  









