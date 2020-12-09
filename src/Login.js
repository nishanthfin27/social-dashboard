import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import validator from 'validator'
import axios from 'axios'
import './style.css' 

const Login = (props) => {

    const { setLoggedIn } = props

    const [email,setEmail] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const runValidations = () => {
        //email
        if(email.trim().length === 0) {
            errors.email = 'email cannot be blank'
        } else if(!validator.isEmail(email)) {
            errors.email = 'invalid email format'
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0) {
            setFormErrors({})

        const formData = {
            email: email
        }

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {

                const result = response.data 
                const userObj = result.find((user) => {
                    return formData.email === user.email
                })

                if(userObj) {
                    setLoggedIn(true)
                    const user = {loggedIn : 'true', userId : userObj.id}
                    localStorage.setItem('user',JSON.stringify(user))
                } else if(userObj === undefined) {
                    errors.email = 'email does not exist'
                }

            })
            .catch((err) => {
                alert(err.message)
            })
            
        } else {
            setFormErrors(errors)
        }
    }


    return (
        <div class = 'center'>
            <div class = 'form'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1> <br />
                        <input type='text' value={email} onChange={handleEmailChange} placeholder='provide email id'/><br />
                        
                        {formErrors.email && <span> { formErrors.email } </span>} <br /> <br />

                        <input type='submit' value='login' className="btn btn-primary"/>
                </form>
            </div>
        </div>
    )
}

export default Login