import './App.css';
import TopNav from './components/TopNav.js';
import Instructions from './components/Instructions.js';
import Playground from './components/Playground.js';
import useDarkMode from './components/ViewModeToggle.js';
import Footer from './components/Footer.js';
import RateUs from './components/RateUs.js';
import ContactUs from './components/ContactUs.js';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="App">
      <TopNav darkMode={darkMode} setDarkMode={setDarkMode} />
      <Instructions darkMode={darkMode} setDarkMode={setDarkMode} />
      <Playground darkMode={darkMode} setDarkMode={setDarkMode} />
      <RateUs darkMode={darkMode} setDarkMode={setDarkMode} />
      <ContactUs darkMode={darkMode} setDarkMode={setDarkMode} />
      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;