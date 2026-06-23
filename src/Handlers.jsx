export async function handleSignIn(e, username, password, setIsLoggedIn) {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
        return false;
    }
    setIsLoggedIn(true);
    return true;
}

export async function handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage) {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setPage("Courses");
}

export async function handleEnroll(courseId, setAllCourses, setMyCourses) {
    const response = await fetch(`http://127.0.0.1:8000/student/enroll/${courseId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1 })
    });

    if (response.ok) {
        const updateAll = await fetch(`http://127.0.0.1:8000/courses/all`).then(r => r.json());
        setAllCourses(updateAll);

        const updatedMy = await fetch(`http://127.0.0.1:8000/student/my-classes/1`).then(r => r.json());
        setMyCourses(updatedMy)
    }
}

// export async function handleEnroll(courseName, allCourses, setAllCourses, myCourses, setMyCourses) {
//     const course = allCourses.find((c) => c.name === courseName);

//     if (!course || course.enrolled >= course.capacity || myCourses.some((c) => c.name === courseName)) return;

//     const updatedAllCourses = [];
//     for (let i = 0; i < allCourses.length; i++) {
//         const c = allCourses[i];
//         if (c.name === courseName) {
//             updatedAllCourses.push({
//                 name: c.name,
//                 teacher: c.teacher,
//                 time: c.time,
//                 enrolled: c.enrolled + 1,
//                 capacity: c.capacity
//             });
//         }
//         else {
//             updatedAllCourses.push(c);
//         }
//     }
//     setAllCourses(updatedAllCourses);

//     const newMyCourses = myCourses.slice();
//     newMyCourses.push({
//         name: course.name,
//         teacher: course.teacher,
//         time: course.time,
//         enrolled: course.enrolled + 1,
//         capacity: course.capacity
//     });
//     setMyCourses(newMyCourses);
// }

export async function handleDrop(courseName, allCourses, setAllCourses, myCourses, setMyCourses) {
    if (!myCourses.some((c) => c.name === courseName)) return;

    const updatedMyCourses = [];
    for (let i = 0; i < myCourses.length; i++) {
        if (myCourses[i].name !== courseName) {
            updatedMyCourses.push(myCourses[i]);
        }
    }
    setMyCourses(updatedMyCourses);

    const updatedAllCourses = [];
    for (let i = 0; i < allCourses.length; i++) {
        const c = allCourses[i];
        if (c.name === courseName) {
            updatedAllCourses.push({
                name: c.name,
                teacher: c.teacher,
                time: c.time,
                enrolled: Math.max(0, c.enrolled - 1),
                capacity: c.capacity
            });
        }
        else {
            updatedAllCourses.push(c);
        }
    }
    setAllCourses(updatedAllCourses);
}