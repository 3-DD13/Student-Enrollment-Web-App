<<<<<<< HEAD
import { useState } from 'react';
import { handleSignIn, handleSignOut, handleEnroll, handleDrop } from './Handlers';

function App() {

=======
import { useState, useEffect } from "react";
import { handleSignIn, handleSignOut, handleEnroll, handleDrop } from "./Handlers";

const API_URL = "http://127.0.0.1:8000";

function App() {
>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");
  const [page, setPage] = useState("Courses");
<<<<<<< HEAD
  const [role, setRole] = useState("student");
=======
  const [adminPage, setAdminPage] = useState("home");
const [adminUsers, setAdminUsers] = useState([]);
const [adminCourses, setAdminCourses] = useState([]);
const [adminEnrollments, setAdminEnrollments] = useState([]);

>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
  const [courseStudents, setCourseStudents] = useState([
    { course: "CSE 106", name: "Joe Schmo", grade: 92 },
    { course: "CSE 106", name: "Leila Langley", grade: 78 },
    { course: "CSE 106", name: "Iko Uwais", grade: 95 },
    { course: "CSE 106", name: "John Jones", grade: 12 },
    { course: "CSE 106", name: "Sarah Smith", grade: 91 }
<<<<<<< HEAD

  ]);
=======
  ]);

>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
  const [myCourses, setMyCourses] = useState([
    {
      name: "PHYS 009",
      teacher: "John",
      time: "M 11:00-12:15 AM",
      enrolled: 6,
      capacity: 10
    },
    {
      name: "CSE 106",
      teacher: "Ammon Hepworth",
      time: "WF 10:00-12:20 AM",
      enrolled: 8,
      capacity: 10
    }
  ]);

  const [allCourses, setAllCourses] = useState([
    {
      name: "Math 141",
      teacher: "Heinrich Müller",
      time: "TTh 1:00-2:15 PM",
      enrolled: 10,
      capacity: 10
    },
    {
      name: "CSE 106",
      teacher: "Ammon Hepworth",
      time: "WF 10:00-12:20 AM",
      enrolled: 8,
      capacity: 10
    }
  ]);

<<<<<<< HEAD

  /*function getUserRole(username) {
    if (username === "ahepworth") {
=======
  useEffect(() => {
    fetch(`${API_URL}/courses/all`)
      .then((response) => response.json())
      .then((data) => {
        const fixedCourses = data.map((course) => ({
          id: course.id,
          name: course.name,
          teacher: course.teacher || "Unknown",
          time: course.time || "TBD",
          enrolled: course.enrolled || 0,
          capacity: course.capacity || 10
        }));

        if (fixedCourses.length > 0) {
          setAllCourses(fixedCourses);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function getUserRole(username) {
    const cleanUsername = username.trim().toLowerCase();

    if (cleanUsername === "ahepworth") {
>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
      return "teacher";
    }

    if (cleanUsername === "admin") {
      return "admin";
    }

    return "student";
  }*/


  function RealAdminDashboard() {
<<<<<<< HEAD
    return (
      <>
        <header>
          <h3>Welcome Admin</h3>
          <h1>ACME University</h1>

          <button onClick={async () => await handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}>
            Sign out
          </button>
        </header>

        <h2>Admin Dashboard</h2>

        <p>Admin can create, read, update, and delete all database data.</p>

        <button className="adminButton" /*onClick={() => setPage("manageUsers")}*/> Manage users</button>
        <button className="adminButton" /*onClick={() => setPage("manageCourses")}*/>Manage courses</button>
        <button className="adminButton" /*onClick={() => setPage("manageEnrollments")}*/>Manage enrollments</button>
        <button className="adminButton" /*onClick={() => setPage("manageGrades")}*/>Manage grades</button>
      </>
    );
  }



=======
  async function loadUsers() {
    const response = await fetch(`${API_URL}/admin/users`);
    const data = await response.json();
    setAdminUsers(data);
    setAdminPage("users");
  }

  async function loadCourses() {
    const response = await fetch(`${API_URL}/admin/courses`);
    const data = await response.json();
    setAdminCourses(data);
    setAdminPage("courses");
  }

  async function loadEnrollments() {
    const response = await fetch(`${API_URL}/admin/enrollments`);
    const data = await response.json();
    setAdminEnrollments(data);
    setAdminPage("enrollments");
  }

  return (
    <>
      <header>
        <h3>Welcome Admin</h3>
        <h1>ACME University</h1>

        <button onClick={() => handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}>
          Sign out
        </button>
      </header>

      <h2>Admin Dashboard</h2>

      <button className="adminButton" onClick={loadUsers}>
        Manage Users
      </button>

      <button className="adminButton" onClick={loadCourses}>
        Manage Courses
      </button>

      <button className="adminButton" onClick={loadEnrollments}>
        Manage Enrollments
      </button>

      {adminPage === "users" && (
        <>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {adminPage === "courses" && (
        <>
          <h2>Courses</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Teacher ID</th>
              </tr>
            </thead>
            <tbody>
              {adminCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.teacher_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {adminPage === "enrollments" && (
        <>
          <h2>Enrollments</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Course ID</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {adminEnrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td>{enrollment.id}</td>
                  <td>{enrollment.user_id}</td>
                  <td>{enrollment.course_id}</td>
                  <td>{enrollment.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
  
>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e



  function TeacherDashboard() {
    if (selectedCourse) {
      return (
        <>
          <header>
<<<<<<< HEAD
            {/* change later */}
            <h3>Welcome Dr Hepworth</h3>
            <h1>ACME University</h1>
            <button onClick={async () => await handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}> Sign out</button>
          </header>

          <div className='interfaceBody'>
            <h1>{selectedCourse}</h1>

            <button className='backButton' onClick={() => setSelectedCourse(null)}>
=======
            <h3>Welcome Dr Hepworth</h3>
            <h1>ACME University</h1>
            <button onClick={() => handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}>
              Sign out
            </button>
          </header>

          <div className="interfaceBody">
            <h1>{selectedCourse}</h1>

            <button className="backButton" onClick={() => setSelectedCourse(null)}>
>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
              Back
            </button>

            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Grade</th>
                </tr>
              </thead>

              <tbody>
                {courseStudents
                  .filter((student) => student.course === selectedCourse)
                  .map((student) => (
                    <tr key={student.name}>
                      <td>{student.name}</td>
<<<<<<< HEAD

                      <td>
                        <input
                          type="number"
                          value={student.grade}
                          onChange={(e) => {
                            const updatedStudents = courseStudents.map((s) =>
                              s.name === student.name &&
                                s.course === selectedCourse
                                ? { ...s, grade: parseInt(e.target.value, 10) || 0 }
                                : s
                            );

                            setCourseStudents(updatedStudents);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              className="saveGradesButton"
              onClick={() => alert("Grades saved successfully")}>
=======
                      <td>
                        <input
                          type="number"
                          value={student.grade}
                          onChange={(e) => {
                            const updatedStudents = courseStudents.map((s) =>
                              s.name === student.name && s.course === selectedCourse
                                ? { ...s, grade: parseInt(e.target.value, 10) || 0 }
                                : s
                            );

                            setCourseStudents(updatedStudents);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <button
              className="saveGradesButton"
              onClick={() => alert("Grades saved successfully")}
            >
>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
              Save Grades
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <header>
          <h3>Welcome Dr Hepworth</h3>
          <h1>ACME University</h1>
          <button onClick={() => handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}>
            Sign out
          </button>
        </header>

<<<<<<< HEAD
        <div className='interfaceBody'>
          <h2>Your Courses</h2>
=======
        <div className="interfaceBody">
          <h2>Your Courses</h2>

>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Teacher</th>
                <th>Time</th>
                <th>Students Enrolled</th>
                <th>Action</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody>
              {allCourses.filter((course) => course.teacher === "Ammon Hepworth").map((course) => (
                <tr key={course.name}>
                  <td>{course.name}</td>
                  <td>{course.teacher}</td>
                  <td>{course.time}</td>
                  <td>{course.enrolled}/{course.capacity}</td>

                  <td>
                    <button onClick={() => setSelectedCourse(course.name)}>
                      view</button>
                  </td>

                </tr>
              ))}
=======

            <tbody>
              {allCourses
                .filter((course) => course.teacher === "Ammon Hepworth" || course.name === "CSE 106")
                .map((course) => (
                  <tr key={course.name}>
                    <td>{course.name}</td>
                    <td>{course.teacher}</td>
                    <td>{course.time}</td>
                    <td>
                      {course.enrolled}/{course.capacity}
                    </td>
                    <td>
                      <button onClick={() => setSelectedCourse(course.name)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
            </tbody>
          </table>
        </div>
      </>
    );
  }

  if (isloggedIn) {
<<<<<<< HEAD

    /*const role = getUserRole(username);*/
=======
    const role = getUserRole(username);
>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e

    if (role === "teacher") {
      return <TeacherDashboard />;
    }

    if (role === "admin") {
      return <RealAdminDashboard />;
    }

    return (
      <>
        <header>
          <h3>Welcome {username}</h3>
          <h1>ACME University</h1>
          <button onClick={() => handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}>
            Sign out
          </button>
        </header>

<<<<<<< HEAD
        <div className='tabs'>
          <button id="studentButton" className={page === "Courses" ? "activeTab" : ""} onClick={() => setPage("Courses")}> My Courses</button>
          <button id="studentButton" className={page === "addCourses" ? "activeTab" : ""} onClick={() => setPage("addCourses")}> Add Courses</button>
        </div>

        <div className='interfaceBody'>
=======
        <div className="tabs">
          <button
            className={page === "Courses" ? "activeTab" : ""}
            onClick={() => setPage("Courses")}
          >
            My Courses
          </button>

          <button
            className={page === "addCourses" ? "activeTab" : ""}
            onClick={() => setPage("addCourses")}
          >
            Add Courses
          </button>
        </div>

        <div className="interfaceBody">
>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
          <h2>{page === "Courses" ? "Your Courses" : "All Courses"}</h2>

          <table>
            <thead>
              <tr>
                <th>Course name</th>
                <th>Teacher</th>
                <th>Time</th>
                <th>Student enrolled</th>
                {page === "addCourses" && <th>Action</th>}
              </tr>
            </thead>
<<<<<<< HEAD
=======

>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
            <tbody>
              {(page === "Courses" ? myCourses : allCourses).map((course) => {
                const enrolled = myCourses.some((c) => c.name === course.name);
                const full = course.enrolled >= course.capacity;
<<<<<<< HEAD
=======

>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
                return (
                  <tr key={course.name}>
                    <td>{course.name}</td>
                    <td>{course.teacher}</td>
                    <td>{course.time}</td>
<<<<<<< HEAD
                    <td>{course.enrolled}/{course.capacity}</td>
                    {page === "addCourses" && (
                      <td>
                        {enrolled ? (
                          <button onClick={async () => await handleDrop(course.name, allCourses, setAllCourses, myCourses, setMyCourses)}>Drop</button>
                        ) : (
                          <button onClick={async () => await handleEnroll(course.name, setAllCourses, setMyCourses)} disabled={full} > {full ? "Full" : "Enroll"}</button>
=======
                    <td>
                      {course.enrolled}/{course.capacity}
                    </td>

                    {page === "addCourses" && (
                      <td>
                        {enrolled ? (
                          <button
                            onClick={() =>
                              handleDrop(course.name, allCourses, setAllCourses, myCourses, setMyCourses)
                            }
                          >
                            Drop
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleEnroll(course.name, allCourses, setAllCourses, myCourses, setMyCourses)
                            }
                            disabled={full}
                          >
                            {full ? "Full" : "Enroll"}
                          </button>
>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>ACME University</h1>

      <form className="usernameBox">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </form>

      <form className="passwordBox">
        <label>
          Password:
          <input
            id="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>

      {loginError && <p>{loginError}</p>}

      <button
        type="button"
        className="signIn"
        onClick={async (e) => {
<<<<<<< HEAD
          const success = await handleSignIn(e, username, password, setIsLoggedIn, setRole);
=======
          const success = await handleSignIn(e, username, password, setIsLoggedIn);

>>>>>>> 3a27144b6db27e19ca8ed71805ee518caf05d87e
          if (!success) {
            setLoginError("Please enter a username and password");
          } else {
            setLoginError("");
          }
        }}
      >
        Sign in
      </button>
    </>
  );
}

export default App;