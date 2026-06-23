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

export async function handleEnroll(courseName, allCourses, setAllCourses, myCourses, setMyCourses) {
  const API_URL = "http://127.0.0.1:8000";
  const course = allCourses.find((c) => c.name === courseName);

  if (!course || course.enrolled >= course.capacity || myCourses.some((c) => c.name === courseName)) {
    return;
  }

  await fetch(`${API_URL}/student/enroll/${course.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: 1
    })
  });

  const updatedAllCourses = allCourses.map((c) =>
    c.name === courseName ? { ...c, enrolled: c.enrolled + 1 } : c
  );

  setAllCourses(updatedAllCourses);
  setMyCourses([...myCourses, { ...course, enrolled: course.enrolled + 1 }]);
}

export async function handleDrop(courseName, allCourses, setAllCourses, myCourses, setMyCourses) {
  if (!myCourses.some((c) => c.name === courseName)) {
    return;
  }

  setMyCourses(myCourses.filter((c) => c.name !== courseName));

  const updatedAllCourses = allCourses.map((c) =>
    c.name === courseName
      ? { ...c, enrolled: Math.max(0, c.enrolled - 1) }
      : c
  );

  setAllCourses(updatedAllCourses);
}