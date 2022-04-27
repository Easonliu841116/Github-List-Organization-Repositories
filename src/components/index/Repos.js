import React, { forwardRef } from 'react'

import { VStack, Box, Heading, Text, Link } from '@chakra-ui/react'

function Repos({ repoList }, ref) {
  return (
    <VStack spacing={5} ref={ref}>
      {repoList.map((repo, index) => (
        <Link
          href={repo.html_url}
          target="_blank"
          key={`${repo.id}_${index}`}
          w={'100%'}
          isExternal
        >
          <Box shadow="md" borderWidth="2px" p={5} borderRadius="md">
            <Heading fontSize="xl">{repo.full_name}</Heading>
            <Text mt={3}>{repo.description || '(empty)'}</Text>
          </Box>
        </Link>
      ))}
    </VStack>
  )
}

export default forwardRef(Repos)
