import { useState } from 'react'
import Snow from './Snow.jsx'
import Header from './Header.jsx'

function App() {

  return (
    <>
      <Header></Header>
      <Snow></Snow>
      <img src="/src/images/background.png" alt="Backgroudn photo" class="bgphoto"></img>
    </>
  )
}

export default App
