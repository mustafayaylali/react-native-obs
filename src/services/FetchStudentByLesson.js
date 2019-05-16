// FetchLesson.js

export const getStudentByLesson = (lessonId,teacherId) => {
    const URL = `http://46.101.164.224:4002/api/lessons/getStudentIdsByLessonId?lessonId=${lessonId}&teacherId=${teacherId}`;
    return fetch(URL)
        .then((res) => res.json());
}