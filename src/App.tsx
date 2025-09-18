import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import from components folder inside src
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Import pages
import { Home } from './pages/Home';
import { About } from './pages/About';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
