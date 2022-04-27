import React, { useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'

import { API_URL, GITHUB_URL, getData } from '@/utils/api'

import {
  Container,
  FormControl,
  FormLabel,
  Select,
  Spinner
} from '@chakra-ui/react'

import Loading from '@/components/Loading'
import Repos from '@/components/index/Repos'

export default function IndexContainer() {
  const [orgList, setOrgList] = useState([])
  const [repoList, setRepoList] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [orgPerPageLastId, setOrgPerPageLastId] = useState('')

  function getOrgsList() {
    return getData(
      API_URL + `/organizations?per_page=10&since=${orgPerPageLastId}`
    )
  }

  async function getOrgRepos(orgName) {
    return getData(API_URL + `/orgs/${orgName}/repos?per_page=10`)
  }

  async function setOrgListData() {
    const { data } = await getOrgsList()
    setOrgList((oldOrgs) => [...oldOrgs, ...data])
    setOrgPerPageLastId(data[data.length - 1]['id'])
  }

  async function setOrgRepoData(org) {
    setIsLoading(true)
    const { data } = await getOrgRepos(org)
    setRepoList(data)
    setIsLoading(false)
  }

  useEffect(() => {
    setOrgListData()
  }, [])

  return (
    <main>
      <Container mt={5}>
        <FormControl mt={5} mb={10}>
          <FormLabel htmlFor="organizations">Organizations</FormLabel>
          <Select
            id="organizations"
            onChange={(e) => setOrgRepoData(e.target.value)}
          >
            {orgList.map((org) => (
              <option value={org.login} key={org.node_id}>
                {org.login}
              </option>
            ))}
          </Select>
        </FormControl>
        {isLoading ? <Loading /> : <Repos repoList={repoList} />}
      </Container>
    </main>
  )
}
