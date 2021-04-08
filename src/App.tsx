import './App.css';
import { Header } from './components/header/headerComponent';
import { MainDashboard } from './components/dashboard/mainDashboard';

function App() {
  return (
    <div className="App">
      <Header/>
      <MainDashboard/>
    </div>
  )
}

export default App;
