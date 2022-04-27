import React from 'react'

import { VStack, Box, Heading, Text, Link } from '@chakra-ui/react'

export default function Repos({ repoList }) {
  return (
    <VStack spacing={5} my={5}>
      {repoList.map((repo) => (
        <Link
          href={repo.html_url}
          target="_blank"
          key={repo.node_id}
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
