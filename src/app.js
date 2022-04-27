import 'normalize.css'

import React, { useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import Header from '@/components/Header'
import Index from '@/pages/Index'

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  )
}

render(<App />, document.getElementById('app'))
