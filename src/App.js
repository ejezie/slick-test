import './App.scss';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Row from './components/Row';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <Row/>
    </div>
  );
}

export default App;
