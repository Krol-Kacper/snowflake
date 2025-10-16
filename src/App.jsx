import { useState } from 'react'
import Snow from './Snow.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Infobar from './Infobar.jsx'
import Spinner from './Spinner.jsx'
import './App.css' // Importujemy nowy plik CSS

function App() {
  return (
    <>
      <Header />
      <Snow />
      {/* Nowy kontener dla głównej treści */}
      <main className="main-content">
        <Spinner />
        <Infobar />
      </main>
      <Footer />
    </>
  );
}

export default App
