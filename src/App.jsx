import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MagicMessage from './components/MagicMessage';
import ProblemStatement from './components/ProblemStatement';
import KeyInsight from './components/KeyInsight';
import OneTap from './components/OneTap';
import Features from './components/Features';
import WhyDifferent from './components/WhyDifferent';
import MarketContext from './components/MarketContext';
import Roadmap from './components/Roadmap';
import Waitlist from './components/Waitlist';
import FinalPayoff from './components/FinalPayoff';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MagicMessage />
        <ProblemStatement />
        <KeyInsight />
        <OneTap />
        <Features />
        <WhyDifferent />
        <MarketContext />
        <Roadmap />
        <Waitlist />
        <FinalPayoff />
      </main>
      <Footer />
    </>
  );
}

export default App;
