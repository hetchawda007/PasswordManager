import './App.css'
import Footer from './Components/Footer'
import Manager from './Components/manager'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <div className='min-h-[83vh] bg-purple-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]'>
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
