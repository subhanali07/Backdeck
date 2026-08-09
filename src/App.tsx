import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Services from "./components/Services";
import Ourwork from "./components/Ourwork";
import Casestudies from "./components/Casestudies";
import Contact from "./components/Contact";
import About from "./components/About";
import Footer from "./components/Footer";

function MainPage() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Services />
      <Ourwork />
      <Contact />
      <Footer/>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/case-studies" element={<Casestudies />} />
      </Routes>
    </Router>
  );
}

export default App;