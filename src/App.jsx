import { useState } from 'react';
import { handleSignIn, handleSignOut, handleEnroll, handleDrop } from './Handlers';

function App() {

  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState("");
  const [page, setPage] = useState("Courses");
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
      name: "CSE 900",
      teacher: "Ammon Hepworth",
      time: "MWF 3:00-4:00 PM",
      enrolled: 8,
      capacity: 10
    }
  ]);

  function AdminDashboard({ onSignOut }){
    return(
      <>
      <header>
        {/* change later */}
        <h3>Welcome Dr Hepworth</h3> 
        <h1>ACME University</h1>
        <button onClick={() => handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}> Sign out</button>
      </header>
      
      <h2>Your Courses</h2>
      <table>
        <thead>
        <tr>
          <th>Course Name</th>
          <th>Teacher</th>
          <th>Time</th>
          <th>Students Enrolled</th>
        </tr>  
        </thead>
        <tbody>
          {allCourses.filter((course) => course.teacher === "Ammon Hepworth").map((course) => (
          <tr key={course.name}>
            <td>{course.name}</td>
            <td>{course.teacher}</td>
            <td>{course.time}</td>
            <td>{course.enrolled}/{course.capacity}</td>
          </tr>
        ))}
        </tbody>
      </table>
      </>
    );
  }

  if (isloggedIn) {
    //will change later to be role based
    if(username == "ahepworth"){
      return<AdminDashboard onSignOut={() => handleSignOut()}/>;
    }

    return (
      <>
        <header>
        <h3>Welcome {username}</h3>
        <h1>ACME University</h1>
        <button onClick={() => handleSignOut(setIsLoggedIn, setUsername, setPassword, setPage)}> Sign out</button>
        </header>
        
        <button onClick={() => setPage("Courses")}> My Courses</button>
        <button onClick={() => setPage("addCourses")}> Add Courses</button>


        

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
                      <button onClick={() => handleDrop(course.name, allCourses, setAllCourses, myCourses, setMyCourses)}>Drop</button>
                    ) : (
                      <button onClick ={() => handleEnroll(course.name, allCourses, setAllCourses, myCourses, setMyCourses)} disabled = {full} > {full ? "Full" : "Enroll"}</button>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
          </tbody>
        </table>
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


      <button type="button" className="signIn" onClick={() => setIsLoggedIn(true)}>
        Sign in
      </button>
    </>
  );
}


export default App;
