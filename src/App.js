import './App.css';
import Header from './Components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./Pages/HomePage"
import ChartPage from ".//Pages/ChartPage"
import BlogPage from ".//Pages/BlogPage"
import CoinPage from './Pages/CoinPage';
function App() {
  return (
    <BrowserRouter>
    <div className='App_Container'>
      <Header />
      <Routes>
        <Route path='/crypto-tracker' element={<HomePage />} />
        <Route path='/chart' element={<ChartPage />}/>
        <Route path='/blog' element={<BlogPage />}/>
        <Route path='/chart/:id' element={<CoinPage />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
