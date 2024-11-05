import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dataprovider from './components/context/datacontext';
import Header from './components/header/header'
import Body from "./components/body/body"
import Footer from './components/footer/footer';
import LoginForm from './components/sesion/sesion.jsx';
import { ProductsSG, ProductsFG, ProductsMixta } from './components/products/products.jsx';
import { Carrito } from './components/carrito/Carrito.jsx';
import Register from './components/sesion/register';
import Giatalles from './components/header/gia-talles';
import Cargar from './components/cargar-producto/cargar-producto.jsx';

function App() {
  return (

    <div className="App">
      <Dataprovider>

        <Router>
          <Routes>
            <Route
              path="/"
              element={<>
                <Header />
                <Body />
                <Footer/>
              </>} />

              <Route
              path="/sesion"
              element={<>
                <Header />
                <LoginForm />
                <Footer/>
              </>} />

              <Route
              path="/register"
              element={<>
                <Header />
                <Register />
                <Footer/>
              </>} />

              <Route
              path="/cargar"
              element={<>
                <Header />
                <Cargar />
                <Footer/>
              </>} />

              <Route
              path="/carrito"
              element={<>
                <Header />
                <Carrito/>
                <Footer/>
              </>} />

              <Route
              path="/GuiaTalles"
              element={<>
                <Header />
                <Giatalles/>
                <Footer/>
              </>} />
              <Route
              path="/suelamixta"
              element={<>
                <Header />
                <div className='product-card-container-mixta'>
                <ProductsMixta/>
                </div>
                <Footer/>
              </>} />

               <Route
              path="/suelaFG"
              element={<>
                <Header />
                <div className='product-card-container-FG'>
                <ProductsFG/>
                </div>
                <Footer/>
              </>} />

              <Route 
              path="/suelaSG"
               element={<>
                 <Header />
                 <div className='product-card-container-SG'>
                 <ProductsSG/>
                 </div>
                 <Footer/>
               </>} /> /


          </Routes>
        </Router>
      </Dataprovider>
      


    </div>
  );
}

export default App;
