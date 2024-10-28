/**
 * File: LoginService.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Service to handle login requests
 */

/*
    Function: login_user

    Description:
      Calls to backend to log user in
    
    Parameters:
        uname: the username (student/staff/faculty number) of the user
        pass: the password of the user

    Returns:
        Promise of request
*/
export async function login_user(uname, pass) {
    const response = await fetch('/users/login', { //add this onece we have merged with the backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: uname,
          password: pass,
        }),
      });
    return response;
}