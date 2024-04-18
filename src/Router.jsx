import { createBrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Home from './pages/Home'
import Page from './pages/Page'
import Loading from './pages/Loading'
import Error from './pages/Error';
import Spotify from './pages/Spotify'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    errorElement: <Error/>,
    
    children: [
      {
        path: '/Home',
        element: <Home />,
        index: true
      },
      {
        path: '/anime/:nome',
        element: <Page />,
        
      },
      {
        path: 'spotify',
        element: <Spotify/>
      }

    ]
  }

])

export default router;