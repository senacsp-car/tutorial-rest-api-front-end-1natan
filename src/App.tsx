import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Telas/Home';
import Item from './Telas/Item';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/itens/:id' element={<Item/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
