import  { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Movie from "./pages/Movie";

function App() {

  return (
      <Router>
        <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path= "/movie/:id" element={<Movie/>}></Route>
          <Route></Route>
        </Routes>
        </div>
      </Router>
    
  );
}

export default App;
