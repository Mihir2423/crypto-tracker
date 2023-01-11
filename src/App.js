import './App.css';
import Header from './Components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./Pages/HomePage"
import ChartPage from ".//Pages/ChartPage"
import BlogPage from ".//Pages/BlogPage"
import CoinPage from './Pages/CoinPage';
import Preloader from "./Components/preloader"
import { useEffect, useState } from 'react';
// import TestPage from './Pages/TestPage';
function App() {
  const [preloader, setPreloader] = useState(false)
  useEffect(() => {
    setPreloader(true)
    setTimeout(() => {
      setPreloader(false)
    }, 3000);
  }, [])
  return (
    <>
      {preloader === true ? <Preloader /> :
        <BrowserRouter>
          <div className='App_Container'>
            <Header />
            <Routes>
              <Route path='/crypto-tracker' element={<HomePage />} />
              <Route path='/chart' element={<ChartPage />} />
              <Route path='/blog' element={<BlogPage />} />
              <Route path='/chart/:id' element={<CoinPage />} />
              {/* <Route path='/test' element={<TestPage />} /> */}
            </Routes>
          </div>
        </BrowserRouter>}
    </>
  );
}

export default App;
