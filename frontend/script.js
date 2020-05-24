// Validation
const charMatch = new RegExp('^[a-zA-Z_0-9]*$');
function testLogin(){
    login = document.getElementsByName('login')[0].value;
    console.log(login)
    if(login.length <= 0)
        {alert('Password and Login fields cannot be empty'); return false;}
    if(!charMatch.test(login))
        {alert('Login must contain only latin letters'); return false;}
    if(login.length < 4 || login.length > 20)
        { alert('Login must be between 4 and 20 characters'); return false;}
    if(parseInt(login.substr(0, 1)))
        {alert('Login must begin with a letter'); return false;}

    password = document.getElementsByName('password')[0].value;
    if(password.length <= 0)
        {alert('Password and Login fields cannot be empty'); return false;}
        if(!charMatch.test(password))
        {alert('Password must contain only latin letters'); return false;}
    if(password.length < 6)
        { alert('Password must be more than 6 characters'); return false;}

    return true;
}
//
