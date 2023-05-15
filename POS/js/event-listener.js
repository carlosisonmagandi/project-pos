document.addEventListener("DOMContentLoaded", function() {
    // Load the content from another HTML page
    var layoutSidenavNav = document.getElementById("layoutSidenav_nav");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            layoutSidenavNav.innerHTML = xhr.responseText;
            // Add event listener to the "Create User" link
            var createStaffLink = document.getElementById("createStaff");
            createStaffLink.addEventListener("click", function(event) {
                event.preventDefault(); // Prevent the default link behavior

                // Call your existing jQuery function for the "Create User" action
                $("#createStaff").click();
                window.location.href = 'register.html';
            });

            var staffListLink = document.getElementById("staffList");
            staffListLink.addEventListener("click", function(event) {
                event.preventDefault(); // Prevent the default link behavior

                // Call your existing jQuery function for the "Create User" action
                $("#staffList").click();
                window.location.href = 'staff-list.html';
            });
            
            var createItemsLink = document.getElementById("createItems");
            createItemsLink.addEventListener("click", function(event) {
                event.preventDefault(); // Prevent the default link behavior

                // Call your existing jQuery function for the "Create User" action
                $("#createItems").click();
                window.location.href = 'manage-items.html';
            });

        }
    };
    xhr.open("GET", "master.html", true);
    xhr.send();
});