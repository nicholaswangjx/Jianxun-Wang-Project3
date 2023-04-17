import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'
import SearchBar from './SearchBar'

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="flex flex-col my-5">
      <div className="flex items-center">
        <div className="mx-auto">
          <img
            src="/twitter.png"
            alt="app logo"
            width={'40px'}
            className="mx-8"
          ></img>
        </div>
        <div className="flex-1 md:border-x-2 md:border-slate-200">
          <div className="flex justify-between items-center md:px-6">
            {currentUser ? (
              <>
                <Link to="/">
                  <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                    <p>Home</p>
                  </div>
                </Link>
                <Link to="/explore">
                  <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                    <p>Explore</p>
                  </div>
                </Link>
                <Link to="/create-entry">
                  <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                    <p>Create Entry</p>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    navigate('/explore')
                  }}
                  className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer"
                >
                  <p>Log out</p>
                </button>
                <div className="flex items-center space-x-2">
                  <Link to={`/profile/${currentUser._id}`}>
                    <div className="flex items-center space-x-6 px-2 py-2 font-bold hover:bg-slate-200 rounded-full cursor-pointer">
                      <p>{currentUser.username}</p>
                    </div>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/explore">
                  <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                    <p>Home</p>
                  </div>
                </Link>
                <Link to="/login">
                  <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                    <p>Log In</p>
                  </div>
                </Link>
                <Link to="/register">
                  <div className="flex items-center space-x-6 px-2 py-2 hover:bg-slate-200 rounded-full cursor-pointer">
                    <p>Sign Up</p>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <SearchBar />
    </div>
  )
}

export default Navbar
