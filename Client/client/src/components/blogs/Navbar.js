import { Navbar, Nav } from 'react-bootstrap'

const NavbarIndex = () => {
    return (
        <div className='navbar-top'>    
            <Navbar bg="primary" variant="dark" className="p-2" >
                <Navbar.Brand href="/" > SimpleBlog </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/login" >Login</Nav.Link>
                    <Nav.Link href="/signup" >Signup</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavbarIndex