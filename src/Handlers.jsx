<<<<<<< HEAD
export async function handleSignIn(e, username, password, setIsLoggedIn, setRole) {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
        return false;
    }
    
    try {
        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        });
        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        if (data.role == "admin") {
            window.location.href = "http://127.0.0.1:8000/admin";
            return true;
        }
        setRole(data.role);
        setIsLoggedIn(true);
        return true;
    }
    catch (err) {
        console.error("Login request failed:", err)
        return false;
    }
=======
export async function handleSignIn(e, username, password, setIsLoggedIn) {
  e.preventDefault();

  if (username.trim() === "" || password.trim() === "") {
    return false;
  }

  setIsLoggedIn(true);
  return true;
>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
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