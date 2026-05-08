import { useState } from 'react'

import Navbar from './components/Navbar'
import Feed from './components/Feed'
import TopicsBar from './components/TopicsBar'
import MessagesPanel from './components/MessagesPanel'

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [filter, setFilter] = useState('recent')

  return (
    <div className="app">

      <Navbar
        filter={filter}
        setFilter={setFilter}
      />

      <Feed
        selectedTopic={selectedTopic}
        filter={filter}
      />

      <MessagesPanel />

    </div>
  )
}