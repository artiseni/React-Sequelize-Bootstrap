import { Navbar, Nav } from 'react-bootstrap'

const NavbarHome = (props) => {
    const path = window.location.pathname
    return (
        <Navbar bg="primary" variant="dark" className="p-2" >
            <Navbar.Brand > SimpleBlog </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={ props.myBlog } active = {path === props.dataPath} >My post</Nav.Link>
                    <Nav.Link >Features</Nav.Link>
                    <Nav.Link >Pricing</Nav.Link>
                </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Nav.Link onClick={props.logOut}>Logout</Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarHome