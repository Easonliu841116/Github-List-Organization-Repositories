import 'normalize.css'

import React, { useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import Header from '@/components/Header'
import Index from '@/pages/Index'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

render(<App />, document.getElementById('app'))
