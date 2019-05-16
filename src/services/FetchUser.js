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
            username: '260',//username,   // 260    //mumtaz.hocaoglu@gmail.com 123456
            password: '123456'//password, //123456
        }),
    }).then((res) => res.json());
}
//asdsad