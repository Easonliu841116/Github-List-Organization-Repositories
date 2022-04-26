import 'normalize.css'

import React, { useState } from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'

import Index from '@/pages/index'

function App() {
  return (
    <HashRouter>
      <Index />
    </HashRouter>
  )
}

render(<App />, document.getElementById('app'))
