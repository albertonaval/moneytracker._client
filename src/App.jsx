import Navigation from './components/Navbar/Navbar';
import AppRoutes from './routes/AppRoutes';
import './App.css';


const App = () => {
  return (
    <div className='pageContainer'>
      <Navigation />
      <AppRoutes />
    </div>
  )
}

export default App;
