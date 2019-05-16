// FetchLesson.js

export const getLessonInfo = (id,userType) => {
    const URL = `http://46.101.164.224:4002/api/lessons/GetAllByUserId?userId=${id}&type=${userType}`;
    return fetch(URL)
        .then((res) => res.json());
}