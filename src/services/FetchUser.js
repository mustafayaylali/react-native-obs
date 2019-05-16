// FetchUser.js

export const getUserInfo = (name) => {
    let username = name.toLowerCase().trim();
    const URL = `https://api.github.com/users/${username}`;
    return fetch(URL)
        .then((res) => res.json());
}

export const getUserLoginInfo = (username,password,userType) => {
    var url;
    if(userType==="student"){
        url='http://46.101.164.224/api/auth/student/';
    }else if(userType==="teacher"){
        url='http://46.101.164.224/api/auth/teacher/';
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            username: 'mumtaz.hocaoglu@gmail.com',//username,   // 260-248    //mumtaz.hocaoglu@gmail.com 123456
            password: '123456'//password, //123456- 091096
        }),
    }).then((res) => res.json());
}
//asdsad