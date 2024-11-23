import { useState } from 'react'
import Snow from './Snow.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Infobar from './Infobar.jsx'

function App() {

  return (
    <>
      <Header></Header>
      <Snow></Snow>
      <Infobar></Infobar>
      <Footer></Footer>
    </>
  );
}

export default App
