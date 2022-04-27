import React, { useState, useEffect, useRef } from 'react'

import { API_URL, getData } from '@/utils/api'

import {
  Container,
  FormControl,
  FormLabel,
  Select,
  Divider,
  Text
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
        {params.map((param, index) => (
          <option key={`${param}_${index}`} value={param}>
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
      setOrgRepoData({ isLoadMore: true })
      observer.disconnect()
    }
    const observer = new IntersectionObserver(callback, options)

    const child = reposRef.current.childNodes

    observer.observe(child[child.length - 1])
  }

  function replaceRepoList() {
    setRepoList([])
    setPage(1)
    setOrgRepoData({ isLoadMore: false })
  }

  useEffect(() => {
    setOrgListData()
  }, [])

  useEffect(() => {
    currentOrg && setOrgRepoData({ isLoadMore: false })
  }, [currentOrg])

  useEffect(() => {
    currentOrg && replaceRepoList()
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
        <FormControl mt={5} mb={5}>
          <FormLabel color="blue.500" htmlFor="organizations">
            Organizations
          </FormLabel>
          <Select
            borderColor="blue.500"
            id="organizations"
            placeholder="Select Organization"
            onChange={(e) => {
              setPage(1)
              setCurrentOrg(e.target.value)
            }}
          >
            {orgList.map((org, index) => (
              <option value={org.login} key={`${org.id}_${index}`}>
                {org.login}
              </option>
            ))}
          </Select>
        </FormControl>
        {repoList.length > 0 && <Repos ref={reposRef} repoList={repoList} />}
        {currentOrg && !repoList.length && !isLoading && (
          <Text textAlign="center" borderWidth="1px" p={5} borderRadius="md">
            There is no result.
          </Text>
        )}
        {isLoading && <Loading />}
      </Container>
    </main>
  )
}
