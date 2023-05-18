function addStaff() {
    

    var userName = document.getElementById('userName').value;
    var firstName = document.getElementById('firstName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var role = 'Staff';
    var session = 'True';

    if(!userName || !firstName || !email || !password || !confirmPassword ){
        alert('Please fill the required fields')
    }
    else{
        // Check if the password and confirm password match
    if (password !== confirmPassword) {
        alert('Password and Confirm Password do not match');
        return;
        }
    
        // Retrieve existing accounts from local storage
        var accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    
        var id=1;
        if (accounts.length > 0) {
          id = accounts[accounts.length - 1].id + 1;
          }
    
        var account = {
            id: id,
            userName: userName,
            firstName: firstName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            role: role,
            session: session
        };
    
        // Add new account to the array
        accounts.push(account);
    
        // Store updated accounts in local storage
        localStorage.setItem('accounts', JSON.stringify(accounts));
    
        // Clear input fields
        document.getElementById('userName').value = '';
        document.getElementById('firstName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
        alert('Created Successfully')
    }

     
}
