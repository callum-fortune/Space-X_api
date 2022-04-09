import logo from './logo.svg';
import './App.css';
import ParticleEffect from './components/ParticleEffect/ParticleEffect.js';
import Main from './components/Main/Main.js';
function App() {



  return (
    <div className="App">


    <div className="main">
      <Main/>
    </div>
    <div className="particle-effect-ctr">
      <ParticleEffect className="particle-effect" />
    </div>
    </div>
  );
}

export default App;
