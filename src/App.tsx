import Layout from './components/Layout/Layout';
import Hero from './components/Sections/Hero';
import Projects from './components/Sections/Projects';
import Services from './components/Sections/Services';
import Footer from './components/Sections/Footer';
import './App.css';

function App() {
  return (
    <Layout>
      <Hero />
      <Projects />
      <Services />
      <Footer />
    </Layout>
  );
}

export default App;
