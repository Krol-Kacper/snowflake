import { useState } from 'react'
import Snow from './Snow.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Infobar from './Infobar.jsx'
import Spinner from './Spinner.jsx'

function App() {

  return (
    <>
      <Header></Header>
      <Snow></Snow>
      <Spinner/>
      <Infobar></Infobar> 
      <Footer></Footer>
    </>
  );
}

export default App
