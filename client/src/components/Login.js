import React, { useState } from 'react';
 import axios from 'axios' 
 // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route


const Login = (props) => {
  const [login, setLogin] = useState({username: '', password:''})

  

  const changeHandler = (event) => {
    event.preventDefault();
    setLogin({
        ...login, [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("within handleSubmit", login);
    

    axios.post('http://localhost:5000/api/login', login)
      .then(response => {
          console.log(response);
          localStorage.setItem('token', response.data.payload)
          props.history.push('/protected')
      })
      .catch(err => console.log("error in handlesSub", err.response))


    setLogin({username: "", password: ""})
  };

  return (
    <div className="loginContainer">
      <h1>Welcome Back!</h1>
      <h2>Please Log In.</h2>
      <form onSubmit={handleSubmit}>
        <input
            className="name"
            placeholder="enter username"
            type="text"
            value={login.username}
            name="username"
            onChange={changeHandler}
          />
        <input
            className="password"
            placeholder="enter password"
            type="password"
            value={login.password}
            name="password"
            onChange={changeHandler}
          />
        <button type="submit" className="SubmitButton">Connect!</button>
      </form>
    </div>
  )
}

export default Login;