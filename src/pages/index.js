import React, { useState, useEffect, useRef, useMemo } from 'react'
import styled from '@emotion/styled'

import { API_URL, getData } from '@/utils/api'

import {
  Container,
  FormControl,
  FormLabel,
  Select,
  Divider
} from '@chakra-ui/react'

import Loading from '@/components/Loading'
import Repos from '@/components/index/Repos'

const repoTypeList = [
  'all',
  'public',
  'private',
  'forks',
  'sources',
  'member',
  'internal'
]
const repoSortList = ['created', 'updated', 'pushed', 'full_name']
const repoDirectionList = ['desc', 'asc']

function ParameterSelect({ selectId, params, label, onChangeEvent }) {
  return (
    <FormControl my={5}>
      <FormLabel htmlFor={selectId}>{label}</FormLabel>
      <Select id={selectId} onChange={(e) => onChangeEvent(e.target.value)}>
        {params.map((param) => (
          <option key={param} value={param}>
            {param}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default function IndexContainer() {
  const [isLoading, setIsLoading] = useState(false)
  const limit = 10

  const [orgList, setOrgList] = useState([])
  const [currentOrg, setCurrentOrg] = useState('')
  const [repoList, setRepoList] = useState([])

  const [isObserve, setIsObserve] = useState(false)

  const [page, setPage] = useState(1)
  const [repoType, setRepoType] = useState(repoTypeList[0])
  const [repoSort, setRepoSort] = useState(repoSortList[0])
  const [repoDirection, setRepoDirection] = useState(repoDirectionList[0])

  const reposRef = useRef()

  function getOrgsList() {
    return getData(API_URL + `/organizations`)
  }

  function getOrgRepos() {
    return getData(
      API_URL +
        `/orgs/${currentOrg}/repos?per_page=${limit}&page=${page}&type=${repoType}&sort=${repoSort}&direction=${repoDirection}`
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

    if (l === limit) setObserver(true)

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

  function changeSortCondition() {
    setRepoList([])
    setPage(1)
  }

  useEffect(() => {
    setOrgListData()
  }, [])

  useEffect(() => {
    if (!currentOrg) return
    page < 2
      ? setOrgRepoData({ isLoadMore: false })
      : setOrgRepoData({ isLoadMore: true })
  }, [currentOrg, page])

  useEffect(() => {
    currentOrg && changeSortCondition()
  }, [repoType, repoSort, repoDirection])

  return (
    <main>
      <Container mt={5}>
        <ParameterSelect
          selectId="type"
          params={repoTypeList}
          label="Repo Types"
          onChangeEvent={setRepoType}
        />
        <ParameterSelect
          selectId="type"
          params={repoSortList}
          label="Repo sort"
          onChangeEvent={setRepoSort}
        />
        <ParameterSelect
          selectId="type"
          params={repoDirectionList}
          label="Repo Direction"
          onChangeEvent={setRepoDirection}
        />
        <Divider pt={3} />
        <FormControl mt={5} mb={10}>
          <FormLabel color="blue.500" htmlFor="organizations">
            Organizations
          </FormLabel>
          <Select
            borderColor="blue.500"
            id="organizations"
            placeholder="Select Organization"
            onChange={(e) => {
              setCurrentOrg(e.target.value)
              setPage(1)
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
