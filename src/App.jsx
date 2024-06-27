import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ChartsView from './Components/Dashboard/ChartsView'
import SensorDetectionsView from './Components/Dashboard/SensorDetectionsView'
import ScreenServerView from './Components/Dashboard/ScreenServerView';
import ScreenConfigView from './Components/Dashboard/ScreenConfigView';
import './Components/Dashboard/BodySection/body.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';



const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path: '/register',
    element: <div><Register /></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard/></div>
  },
  {
    path: '/graficos',
    element:<div>  <ChartsView />  </div>
  },
  {
    path: '/ingresarServidor',
    element:<div>  <ScreenServerView />  </div>
  },
  {
    path: '/config',
    element:<div>  <ScreenConfigView />  </div>
  },
  {
    path: '/detecciones',
    element:<div>  <SensorDetectionsView />  </div>
  }
])

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}



export default App
