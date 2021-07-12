import Navbar from '../components/blogs/Navbar'
import List from '../components/blogs/List'


const Index = () => {
    return (
        <>
            <Navbar />
            <List url={'http://localhost:5000/blogs'} />
        </>
    )
}

export default Index