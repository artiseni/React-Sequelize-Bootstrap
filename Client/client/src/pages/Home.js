import React, { useState } from 'react'
import { useLocation, Redirect, useHistory } from 'react-router-dom'
import { Button, Card, Container } from 'react-bootstrap'
import NavbarHome from '../components/home/Navbar'



const Home = () => {

    const location = useLocation()
    const history = useHistory()
    const data = location.state
    const [valid, setValid] = useState(true)

    if(valid === false) {
        return  <Redirect to='/'/>
    } else if (data === undefined) {
        return  <Redirect to='/login'/>
    }
    
    const seeData = () => {
        console.log(data)
    }

    const myBlog = () => {
        history.push({
            pathname : '/home/mypost',
            state : data
        })
    }

    const logOut = () => {
        setValid(false)
    }

    return (
        <>
            <NavbarHome myBlog={ myBlog } logOut={logOut} />
            <Container>
                <Card>
                    <div className='Home'>
                        <h1>Welcome, { data.username }</h1>
                        <Button onClick={seeData} >Edit</Button>
                    </div>
                </Card>
            </Container>
        </>
    )
}


export default Home