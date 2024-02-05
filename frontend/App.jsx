import { Outlet } from 'react-router-dom'
// import Header from "./components/Header";
// import './index.css'
import MapList from './pages/MapList';
import { UserProvider } from './UserContext';
import './App.css'

function App() {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
}

export default App;
