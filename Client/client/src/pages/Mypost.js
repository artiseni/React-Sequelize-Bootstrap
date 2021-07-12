import { useLocation } from 'react-router-dom'
import NavbarHome from '../components/home/Navbar'
import MyList from '../components/home/MyList'


const Mypost = () => {

    const location = useLocation()
    const path = window.location.pathname
    const data = location.state
        
    return (
        <>
            <NavbarHome dataPath={path}/>
            <MyList url={'http://localhost:5000/blogs'} data={data} />
        </>
    )
}

export default Mypost