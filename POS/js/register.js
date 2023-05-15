function addStaff() {
    alert('Created Successfully')

    var userName = document.getElementById('userName').value;
    var inputFirstName = document.getElementById('inputFirstName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var role = 'Staff';
    var session = 'True';

    // Retrieve existing accounts from local storage
    var staffs = JSON.parse(localStorage.getItem('staffs')) || [];

    // Get the total row count
    var id = staffs.length + 1;

    var staff = {
        id: id,
        userName: userName,
        inputFirstName: inputFirstName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
        session: session
    };

    // Add new account to the array
    staffs.push(staff);

    // Store updated accounts in local storage
    localStorage.setItem('staffs', JSON.stringify(staffs));

    // Clear input fields
    document.getElementById('userName').value = '';
    document.getElementById('inputFirstName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';
}
