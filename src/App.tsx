import Layout from './components/Layout/Layout';
import Hero from './components/Sections/Hero';
import Showreel from './components/Sections/Showreel';
import Value from './components/Sections/Value';
import Services from './components/Sections/Services';
import Footer from './components/Sections/Footer';
import './App.css';

function App() {
  return (
    <Layout>
      <Hero />
      <Showreel />
      <Value />
      <Services />
      <Footer />
    </Layout>
  );
}

export default App;
