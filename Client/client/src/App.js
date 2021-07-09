import './assets/css/App.css'
import Login from './assets/pages/Login'
import Signup from './assets/pages/Signup'
import List from './components/blogs/List'

let path = window.location.pathname

const App = () => {


  console.log(path)
  switch (path) {
    case '/login':
      return <Login />
    case '/signup':
      return <Signup />
    default:
      return <List />
  }
}

export default App;
