import React, { useState, useEffect, useRef, useMemo } from 'react'
import styled from '@emotion/styled'

import { API_URL, getData } from '@/utils/api'

import { Container, FormControl, FormLabel, Select } from '@chakra-ui/react'

import Loading from '@/components/Loading'
import Repos from '@/components/index/Repos'

export default function IndexContainer() {
  const [isLoading, setIsLoading] = useState(false)

  const limit = 10

  const [orgList, setOrgList] = useState([])
  const [currentOrg, setCurrentOrg] = useState('')
  const [repoList, setRepoList] = useState([])
  const [page, setPage] = useState(1)
  const [isObserve, setIsObserve] = useState(false)

  const reposRef = useRef()

  function getOrgsList() {
    return getData(API_URL + `/organizations`)
  }

  async function getOrgRepos() {
    return getData(
      API_URL + `/orgs/${currentOrg}/repos?per_page=${limit}&page=${page}`
    )
  }

  async function setOrgListData() {
    const { data } = await getOrgsList()
    setOrgList((oldOrgs) => [...oldOrgs, ...data])
  }

  async function setOrgRepoData({ isLoadMore }) {
    setIsLoading(true)
    const { data } = await getOrgRepos()
    const l = data.length

    if (!l) setIsLoading(false)

    isLoadMore
      ? setRepoList((oldData) => [...oldData, ...data])
      : setRepoList(data)

    if (l === limit) setIsObserve(true)

    setIsLoading(false)
  }

  async function setObserver() {
    const options = {
      rootMargin: '0px',
      threshold: 0
    }

    async function callback(entries) {
      if (!entries[0].isIntersecting) return
      setPage((oldPage) => (oldPage += 1))
      setIsObserve(false)
      observer.disconnect()
    }
    const observer = new IntersectionObserver(callback, options)

    const child = reposRef.current.childNodes

    observer.observe(child[child.length - 1])
  }

  useEffect(() => {
    setOrgListData()
  }, [])

  useEffect(() => {
    isObserve && setObserver()
  }, [isObserve])

  useEffect(() => {
    currentOrg && setOrgRepoData({ isLoadMore: false })
  }, [currentOrg])

  useEffect(() => {
    page >= 2 && setOrgRepoData({ isLoadMore: true })
  }, [page])

  return (
    <main>
      <Container mt={5}>
        <FormControl mt={5} mb={10}>
          <FormLabel htmlFor="organizations">Organizations</FormLabel>
          <Select
            id="organizations"
            placeholder="Select Organization"
            onChange={(e) => {
              setPage(1)
              setCurrentOrg(e.target.value)
            }}
          >
            {orgList.map((org) => (
              <option value={org.login} key={org.node_id}>
                {org.login}
              </option>
            ))}
          </Select>
        </FormControl>
        <Repos ref={reposRef} repoList={repoList} />
        {isLoading && <Loading />}
      </Container>
    </main>
  )
}
