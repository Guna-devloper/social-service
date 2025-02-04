import './App.css';
import AppRoutes from './Routes/Routes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
       <ToastContainer /> 
      <AppRoutes/>
    </div>
  );
}

export default App;
