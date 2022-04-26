import React, { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'

import { Heading } from '@chakra-ui/react'

const HeaderContainer = styled.header``

export default function Header() {
  return (
    <HeaderContainer>
      <Heading as="h1" size="xl" p="3">
        Github List Organization Repositories
      </Heading>
    </HeaderContainer>
  )
}
