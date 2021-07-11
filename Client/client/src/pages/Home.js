import React from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { Button, Card, Container, Navbar, Nav } from 'react-bootstrap'


const Home = () => {

    const location = useLocation()
    const data = location.state

    if (data === undefined) {
        return  <Redirect to='/login'/>
    }
    
    const seeData = () => {
        console.log(data)
    }

    return (
        <>
            <Navbar bg="primary" variant="dark" className="p-2" >
                <Navbar.Brand > SimpleBlog </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link >My post</Nav.Link>
                    <Nav.Link >Features</Nav.Link>
                    <Nav.Link >Pricing</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Nav.Link >Logout</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
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