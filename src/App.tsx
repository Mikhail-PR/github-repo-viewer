import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {HomePage} from './pages/HomePage/HomePage'
import {UserPage} from './pages/UserPage/UserPage'
import {QueryClient, QueryClientProvider} from 'react-query'
import {RepoPage} from './pages/RepoPage/RepoPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    }
  }
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/github-repo-viewer" element={<HomePage/>}/>
        <Route path="/github-repo-viewer/:userName" element={<UserPage/>}/>
        <Route path="/github-repo-viewer/:userName/:repoName" element={<RepoPage/>}/>
        <Route path="*"
          element={<Navigate to="/github-repo-viewer" replace/>}/>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
