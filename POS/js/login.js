function login() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    // Retrieve user data from localStorage
    var users = JSON.parse(localStorage.getItem('accounts'));

    if (users) {
        // Find the user with matching email and password
        var user = users.find(function (user) {
            return user.email === email && user.password === password && user.role === 'Admin';
        });

        if (user) {
            // User found, perform login actions
            alert('Login successful!!');

            var accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            if (accounts.length > 0) {
                accounts[0].session = 'True'; // Set the session field to True
                localStorage.setItem('accounts', JSON.stringify(accounts));
            }

            // Redirect to homepage or perform other actions
            window.location.href = 'index.html';

           
    
        } else {
            // User not found or invalid credentials
            alert('Invalid email or password!');
        }
    } else {
        // No user data found in localStorage
        alert('No user data found. Please sign up!');
    }
}