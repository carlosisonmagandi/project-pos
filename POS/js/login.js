function login() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    var roleValue = document.getElementById('dropdown').value;
  
    // Retrieve user data from localStorage
    var users = JSON.parse(localStorage.getItem('accounts'));
  
    if (users) {
      // Find the user with matching email, password, and role
      var user = users.find(function (user) {
        return (
          user.email === email &&
          user.password === password &&
          user.role === roleValue
        );
      });
  
    //   // Retrieve session data from localStorage
    //   var userSessions = JSON.parse(localStorage.getItem('sessionValue')) || [];
    //   var userSession = {
    //     value: 'True'
    //   };
    //   userSessions.push(userSession);
  
    //   localStorage.setItem('sessionValue', JSON.stringify(userSessions));

    //---------------------------------------------------------------------------------------------------------
    //update sessionValue
    var sessionValue = localStorage.getItem('sessionValue');

    if (sessionValue) {
        var valueSessions = JSON.parse(sessionValue);

        if (valueSessions.length > 0) {
        var lastSession = valueSessions[valueSessions.length - 1];

        if (lastSession.value === 'False') {
            lastSession.value = 'True';
        }
        } else {
        valueSessions.push({ value: 'True' });
        }

        localStorage.setItem('sessionValue', JSON.stringify(valueSessions));
    }else{
        //Create first row record
        // Retrieve session data from localStorage
        var userSessions = JSON.parse(localStorage.getItem('sessionValue')) || [];
        var userSession = {
            value: 'True'
        };
        userSessions.push(userSession);
    
        localStorage.setItem('sessionValue', JSON.stringify(userSessions));

    }
    //---------------------------------------------------------------------------------------------------------
      if (user) {
        var role = user.role;
  
        // Redirect based on user's role
        if (role === 'Admin') {
          user.session = 'True'; // Update the session field for the user
          localStorage.setItem('accounts', JSON.stringify(users));
  
          // User found, perform login actions
          alert('Login successful!!');
          window.location.href = 'index.html';
        } else {
          user.session = 'True'; // Update the session field for the user
          localStorage.setItem('accounts', JSON.stringify(users));
  
          // User found, perform login actions
          alert('Login successful!!');
          window.location.href = 'POS-view.html';
        }
      } else {
        // No user found with matching email, password, and role
        alert('Invalid email, password, or role!');
      }
    } else {
      // No user data found in localStorage
      alert('No user data found. Please sign up!');
    }
  }
  