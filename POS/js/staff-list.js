$(document).ready(function() {
    // Retrieve data from local storage
    var staffData = JSON.parse(localStorage.getItem('accounts'));
  
    // Initialize the DataTable
    var table = $('#datatablesSimple1').DataTable({
      data: staffData,
      columns: [
        { data: 'userName' },
        { data: 'firstName' },
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
        
        // Retrieve accounts data from localStorage
        var accounts = JSON.parse(localStorage.getItem('accounts')) || [];
      
        // Find the index of the staff object to be deleted
        var index = accounts.findIndex(function(account) {
          return account.id === id;
        });
    
        // Remove the staff object from the accounts array
        if (index !== -1) {
          accounts.splice(index, 1);
      
          // Update localStorage with modified accounts data
          localStorage.setItem('accounts', JSON.stringify(accounts));
      
          // Delete the row from DataTable
          var table = $('#datatablesSimple1').DataTable();
          table.row($(this).closest('tr')).remove().draw();
      
          alert('Delete ID: ' + id);
        } else {
          alert('Account not found!');
        }
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
  