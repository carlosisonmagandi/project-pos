//Create new Staff
$(document).ready(function() {
   
    // Function to check the state value and hide #main-content
    
    $("#createStaff").click(function() {
        
        window.location.href = 'register.html';
    });
  });
//---------------------------------------
//Staff List
$(document).ready(function() {
   
    // Function to check the state value and hide #main-content
    
    $("#staffList").click(function() {
        window.location.href = 'staff-list.html';
    });
  });
// --------------------------------------
//manage-items
$(document).ready(function() {
   
    // Function to check the state value and hide #main-content
    
    $("#insertItem").click(function() {
         window.location.href = 'manage-items.html';
       
    });
  });

// --------------------------------------
//Logout
function Logout(){
   
    var accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    if (accounts.length > 0) {
        accounts[0].session = 'False'; // Set the session field to True
        localStorage.setItem('accounts', JSON.stringify(accounts));
       
    }


    window.location.href = 'login.html';
}

//-----------------------------------------
// Display username on sidebar
 // Retrieve Array account data from localStorage
 document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here
    var accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  
    // Get a reference to the <div> element
    var divElement = document.querySelector('.sb-sidenav-footer');
  
    // Check account
    if (accounts.length > 0) {
      // Update the HTML content of the <div> element with the account data
      divElement.innerHTML = '<div class="small">Logged in as:</div>' + accounts[0].userName;
    }
  });
  
  
 

  
  