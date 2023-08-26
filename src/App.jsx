import Hero from "./Components/Hero"
import Summerizer from "./Components/Summerizer"

import './App.css'

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Summerizer />
      </div>
    </main>
  )
}

export default App
