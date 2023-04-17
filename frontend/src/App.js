import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Explore from './pages/Explore'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import SearchResults from './pages/SearchResults'

function App() {
  const { currentUser } = useSelector((state) => state.user)

  const Layout = () => {
    return (
      <div className="md:w-8/12 mx-auto">
        <Navbar />
        <Outlet></Outlet>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: currentUser ? <Home /> : <Explore />,
        },
        {
          path: '/profile/:id',
          element: <Profile />,
        },
        {
          path: '/explore',
          element: <Explore />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signout',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/create-entry',
          element: <CreatePost />,
        },
        {
          path: '/search/:query',
          element: <SearchResults />,
        },
      ],
    },
  ])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
