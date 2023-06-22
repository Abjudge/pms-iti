import axios from 'axios';
import React from 'react'

const Register = () => {



    const RegisterUser = async (e) => {
        e.preventDefault();

       

        const response = await axios.post("http://127.0.0.1:8000/auth/users/", {
            "email": e.target.email.value,
            "first_name": e.target.first_name.value,
            "last_name": e.target.last_name.value,
            "password": e.target.password.value,
            "re_password": e.target.re_password.value,
        }).then(alert("success")).catch((e)=> alert("error"+e.response.status))
            
    }



  return (
      <div><form onSubmit={RegisterUser} >
          <input type="text" name="email" id="email" placeholder='enter your email' />
          <input type="text" name="first_name" id="first_name" placeholder='enter your first_name' />
          <input type="text" name="last_name" id="last_name" placeholder='enter your last_name' />

          <input type="password" name="password" id="password" placeholder='enter your pass' />
          <input type="password" name="re_password" id="re_password" placeholder='enter your re pass' />
          <input type="submit" />

      </form></div>);  




  }

export default Register