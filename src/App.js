import './App.css';
import "./style.scss";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Background/Dashboard"
import Appointments from './pages/Background/Appointments';
import Test from './pages/Background/Test';
import Profile from './pages/Background/Profile';
import ApDetails from './pages/Background/ApDetails';
import StartAp from './pages/Background/StartAp';
import Welcome from "./pages/Welcome";
import Admin from "./pages/Background/Admin";
import CreateAccount from './pages/Background/CreateAccount';
import TestDetails from './pages/Background/TestDetails';

const router = createBrowserRouter([

  {
    path:"/",
    element:<Welcome/>

  },

  {
    path: "/Home",
    element: <Home/>
  },

  {
    path:"/Login/:id",
    element:<Login/>
  },

  {
    path:"/Register",
    element:<Register/>
  },
  {
    path:"/Dashboard",
    element:<Dashboard/>
  },
  {
    path:"/Appointments/:id",
    element:<Appointments/>
  },
  {
    path:"/Test/:id",
    element:<Test/>
  },
  {
    path:"/Profile",
    element:<Profile/>
  },
  {
    path:'/ApDetails/:id',
    element:<ApDetails/>
  },
  {
    path:'/StartAp/:id',
    element:<StartAp/>
  },
  {
    path:'/Admin/:id',
    element:<Admin/>
  },
  {
    path:'/CreateAccount',
    element:<CreateAccount/>

  },
  {
    path:'/TestDetails/:id',
    element:<TestDetails/>
  }


])

function App() {
  return (
    <RouterProvider router={router} />

  );
}

export default App;
