import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import useTesterState from './hooks/useTesterState.js';

export default function App() {
  const tester = useTesterState();

  return (
    <div className="app">
      <Navbar />
      <div className="page">
        <Outlet context={tester} />
      </div>
    </div>
  );
}
