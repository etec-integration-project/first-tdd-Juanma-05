import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dataprovider from './components/context/datacontext';
import Header from './components/header/header'
// import Body from "./components/body/body"
import Footer from './components/footer/footer';
import LoginForm from './components/sesion/sesion.jsx';
import { Products, Products1, Products2 } from './components/products/products.jsx';
import { CartContent } from './components/carrito/CartContent';
import Register from './components/sesion/register';
import Giatalles from './components/header/gia-talles';
//        instalar la libreria axios para hacer peticiones http 
//        https://www.youtube.com/watch?v=uPYfPcMtOvI
//        Minuto 1,01

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
                <Register />
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
              path="/carrito"
              element={<>
                <Header />
                <CartContent/>
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
                <div className='product-card-container'>
                <Products/>
                </div>
                <Footer/>
              </>} />

              <Route
              path="/suelaFG"
              element={<>
                <Header />
                <div className='product-card-container'>
                <Products1/>
                </div>
                <Footer/>
              </>} />

              <Route
              path="/suelaSG"
              element={<>
                <Header />
                <div className='product-card-container'>
                <Products2/>
                </div>
                <Footer/>
              </>} />


          </Routes>
        </Router>
      </Dataprovider>
      


    </div>
  );
}

export default App;
