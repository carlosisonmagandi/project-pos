$(document).ready(function() {
    // Retrieve data from local storage
    var staffData = JSON.parse(localStorage.getItem('staffs'));
  
    // Initialize the DataTable
    var table = $('#datatablesSimple1').DataTable({
      data: staffData,
      columns: [
        { data: 'userName' },
        { data: 'inputFirstName' },
        { data: 'email' },
        { data: 'password' },
        { data: 'role' },
        {
          data: null,
          render: function(data, type, row) {
            // Generate delete and update icons
            var deleteIcon = '<i  class="fa fa-trash delete-icon text-danger" data-id="' + data.id + '"></i> Delete';
             
            // Combine icons into a single column
            return deleteIcon ;
          }
        }
      ]
    });
    // Event listener for delete icon
    $(document).ready(function() {
        $('#datatablesSimple1').on('click', '.delete-icon', function() {
          var id = $(this).data('id');
          
          // Retrieve staffs data from localStorage
          var staffs = JSON.parse(localStorage.getItem('staffs')) || [];
      
          // Find the index of the staff object to be deleted
          var index = -1;
          for (var i = 0; i < staffs.length; i++) {
            if (staffs[i].id === id) {
              index = i;
              break;
            }
          }
          // Remove the staff object from the staffs array
          if (index !== -1) {
            staffs.splice(index, 1);
          }
      
          // Update localStorage with modified staffs data
          localStorage.setItem('staffs', JSON.stringify(staffs));
      
          // Delete the row from DataTable
          var table = $('#datatablesSimple1').DataTable();
          table.row($(this).closest('tr')).remove().draw();
      
          alert('Delete ID: ' + id);
        });
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
  