import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'


const App = (props) => {
    const[loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('user')) ? true : false)


    return (
        <Router>
            <div>
                
                <Route  exact path='/login' render={(props) => {
                    return <Login 
                    {...props}
                    setLoggedIn={setLoggedIn}

                />
                }} />

                <Route  exact path='/dashboard' render={(props) => {
                    return <Dashboard
                    {...props}
                    setLoggedIn={setLoggedIn}
                    />
                }} />

                {loggedIn? (
                    <Redirect to='/dashboard' />
                ) : (
                    <Redirect to='/login'/>
                )}
  
            </div>
        </Router>
    )
}

export default App