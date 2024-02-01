import { Outlet } from 'react-router-dom'
import Header from "./components/Header";
import './index.css'
import MapList from './pages/MapList';

function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default App;
