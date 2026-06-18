import { useState } from 'react';

function App() {
  const [count, setCount] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  if (count) {
    return (
      <>
        <h1>ACME University</h1>
        <h2>Welcome {username}</h2>
        <button onClick={() =>setCount(false)}> Sign out</button>

        <h2> courses</h2>

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
          <tr> 
            <td> Physics 009</td>
            <td> john</td>
            <td> MON 11:00-12:15 AM </td>
            <td> 6/10 </td>
          </tr>
          <tr>
            <td> CSE 106 </td> 
            <td>Ammon Hepworth</td> 
            <td> MWF 10:00-12:20 AM</td> 
            <td> 8/10</td> 
          </tr>
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

  <input 
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

<button type="button" className="signIn" onClick={() => setCount(true)}>
  Sign in
</button>
  </>
);
}


export default App;
