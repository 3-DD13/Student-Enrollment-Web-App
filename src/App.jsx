import { useState } from 'react';

function App() {
  const [count, setCount] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const[page, setPage] = useState("Courses");
  const[myCourses, setMyCourses] = useState([
    {
      name: "physics009" ,
      Teacher: "John",
      time: "MON 11:00-12:15 AM",
      enrolled: 6 , 
      capacity: 10

    },
    {
      name: "CSE 106" ,
      Teacher: "Ammon Hepworth",
      time: "WF 10:00-12:20 AM",
      enrolled: 8 , 
      capacity: 10
    }

  ]);

    const [allCourses, setAllCourses] = useState([
      {
        name: "Math 141",
        Teacher: "Heinrich Müller",
        time: "TTh 1:00-2:15 PM",
        enrolled: 10,
        capacity: 10
      }, 
      {
        name: "CSE 900",
        Teacher: "Ammon Hepworth",
        time: "MWF 3:00-4:00 PM",
        enrolled: 8,
        capacity: 10
      }
    ]);


  if (count) {
    return (
      <>
        <h1>ACME University</h1>
        <h2>Welcome {username}</h2>
        <button onClick={() => setPage("Courses")}> Courses</button>
        <button onClick={() => setPage("addCourses")}> Add Courses</button>


        <button onClick={() =>setCount(false)}> Sign out</button>

        <h2>{page === "Courses" ? "Your Courses" : "All Courses"}</h2>

        <table>
          <thead>
            <tr>
              <th> Course name</th>
              <th> Teacher</th>
              <th> time</th>
              <th>Student enrolled</th>
            </tr>
          </thead>
        <tbody>
  {(page === "Courses" ? myCourses : allCourses).map((course) => (
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

return (
  <>
  <h1>ACME university</h1>
  <form className="usernameBox">
    <label>
      Username: 
      <input 
      type = "text"
      value = {username}
      onChange={(e) => setUsername(e.target.value)} />

    </label>
  </form>

  <form className="passwordbox">
    <label>
      Password:
      <input 
      id = "pass" 
      type = "password"
      value = {password}
      onChange = {(e) => setPassword(e.target.value)}
      />
    </label>
  </form>

  
<button type="button" className="signIn" onClick={() => setCount(true)}>
  Sign in
</button>
  </>
);
}


export default App;
