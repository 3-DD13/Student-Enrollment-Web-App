import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [password, setPassword] = useState("");


  return (
    <>
    <h1>ACME University</h1>
    <form className='userNameBox'>
      <label>Username:
        <input type='text'/>
      </label>
    </form>
    <form className='passwordBox'>
      <label>Password:
        <input 
        id='pass'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
      </label>
    </form>
    {/* for testing */}
    <p>The password is: {password}</p> 
    {}
    <button
      type="button"
      className="signIn"
      onClick={() => setCount((count) => count + 1)}>Sign in: {count}
    </button>
    
    </>
  )
}

export default App
