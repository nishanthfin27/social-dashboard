import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

const Dashboard = (props) => {

    const {setLoggedIn} = props

    const [id, setId] = useState('')
    const [posts, setPosts] = useState([])
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        const result = JSON.parse(localStorage.getItem('user')) || []
        setId(result.userId)

        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((response) => {
                const result = response.data
                setUserDetails(result)
            })
            .catch((err) => {
                alert(err.message)
            })

        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then((response) => {
                const result = response.data
                setPosts(result)
            })
            .catch((err) => {
                alert(err.message)
            })

    }, [id])

    const logout = () => {
        localStorage.removeItem('user')
        setLoggedIn(false)
    }

    return (
        <div>
            <div class = 'right'>
                <button onClick={() => {
                    logout()
                }} className ="btn btn-danger">logout</button>
            </div>
            
            <div class = 'center'>
                <div class = 'card'>
                    <h2>Name : {userDetails.name}</h2>
                    <h2>Email : {userDetails.email}</h2>
                    <h2>Phone : {userDetails.phone}</h2>
                    <h2>Company Name : {userDetails.company && userDetails.company.name}</h2>
                    <h2>catchPhrase : {userDetails.company && userDetails.company.catchPhrase}</h2>
                </div>

                <div class='card'>
                    <ul>
                            {posts.map((post) => {
                                return (
                                    <li key={post.id} type='i'> 
                                    <b> Title - {post.title} </b>
                                    <br /> 
                                    {post.body} 
                                </li>
                                )
                            })}
                        </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard