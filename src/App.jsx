import { useState } from 'react';
import { handleSignIn, handleSignOut, handleEnroll, handleDrop } from './Handlers';

function App() {

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");
  const [page, setPage] = useState("Courses");
  const [courseStudents, setCourseStudents] = useState([
    { course: "CSE 106", name: "Joe Schmo", grade: 92 },
    { course: "CSE 106", name: "Leila Langley", grade: 78 },
    { course: "CSE 106", name: "Iko Uwais", grade: 95 },
    { course: "CSE 106", name: "John Jones", grade: 12 },
    { course: "CSE 106", name: "Sarah Smith", grade: 91 }

  ]);
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


  function getUserRole(username) {
    if (username === "ahepworth") {
      return "teacher";
    }

    if (username === "admin") {
      return "admin";
    }

    return "student";
  }


  function RealAdminDashboard() {
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

        <button id="adminButton" /*onClick={() => setPage("manageUsers")}*/> Manage users</button>
        <button id="adminButton" /*onClick={() => setPage("manageCourses")}*/>Manage courses</button>
        <button id="adminButton" /*onClick={() => setPage("manageEnrollments")}*/>Manage courses</button>
        <button id="adminButton" /*onClick={() => setPage("manageGrades")}*/>Manage courses</button>
      </>
    );
  }




  function AdminDashboard(/* { onSignOut }*/) {

    if (selectedCourse) {
      return (
        <>
          <header>
          {/* change later */}
          <h3>Welcome Dr Hepworth</h3>
          <h1>ACME University</h1>
          <button onClick={async () => await handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}> Sign out</button>
        </header>

          <div className='interfaceBody'>
          <h1>{selectedCourse}</h1>

          <button onClick={() => setSelectedCourse(null)}>
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

                    <td>
                      <input
                        type="number"
                        value={student.grade}
                        onChange={(e) => {
                          const updatedStudents = courseStudents.map((s) =>
                            s.name === student.name &&
                              s.course === selectedCourse
                              ? { ...s, grade: e.target.value }
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
            onClick={() => alert("Grades saved successfully")}>
            Save Grades
          </button>
          </div>
        </>
      );
    }



    return (
      <>
        <header>
          {/* change later */}
          <h3>Welcome Dr Hepworth</h3>
          <h1>ACME University</h1>
          <button onClick={async () => await handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}> Sign out</button>
        </header>

        <div className='interfaceBody'>
        <h2>Your Courses</h2>
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
          </tbody>
        </table>
        </div>
      </>
    );
  }

  if (isloggedIn) {

    const role = getUserRole(username);

    if (role === "teacher") {
      return <AdminDashboard /* onSignOut={() => handleSignOut()} */ />;
    }

    if (role === "admin") {
      return <RealAdminDashboard />;
    }
    return (
      <>
        <header>
          <h3>Welcome {username}</h3>
          <h1>ACME University</h1>
          <button onClick={async () => await handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}> Sign out</button>
        </header>

        <div className='tabs'>
        <button id="studentButton" onClick={() => setPage("Courses")}> My Courses</button>
        <button id="studentButton" onClick={() => setPage("addCourses")}> Add Courses</button>
        </div>

        <div className='interfaceBody'>
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
          <tbody>
            {(page === "Courses" ? myCourses : allCourses).map((course) => {
              const enrolled = myCourses.some((c) => c.name === course.name);
              const full = course.enrolled >= course.capacity;
              return (
                <tr key={course.name}>
                  <td>{course.name}</td>
                  <td>{course.teacher}</td>
                  <td>{course.time}</td>
                  <td>{course.enrolled}/{course.capacity}</td>
                  {page === "addCourses" && (
                    <td>
                      {enrolled ? (
                        <button onClick={async () => await handleDrop(course.name, allCourses, setAllCourses, myCourses, setMyCourses)}>Drop</button>
                      ) : (
                        <button onClick={async () => await handleEnroll(course.name, allCourses, setAllCourses, myCourses, setMyCourses)} disabled={full} > {full ? "Full" : "Enroll"}</button>
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
            onChange={(e) => setUsername(e.target.value)} />

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

      <button type="button"
        className="signIn"
        onClick={async (e) => {
          const success = await handleSignIn(e, username, password, setIsLoggedIn);
          if (!success) {
            setLoginError("Please enter a username and password");
          } else {
            setLoginError("");
          }
        }}>
        Sign in
      </button>
    </>
  );
}

export default App;