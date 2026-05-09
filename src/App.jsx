import { useState } from 'react'

import Navbar from './components/Navbar'
import Feed from './components/Feed'
import TopicsBar from './components/TopicsBar'
import MessagesPanel from './components/MessagesPanel'

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [filter, setFilter] = useState('recent')
  const [selectedTweet, setSelectedTweet] = useState(null)
  const [imageViewerOpen, setImageViewerOpen] = useState(false)

  return (
    <div className="app">

      <Navbar tweetModalOpen={!!selectedTweet || imageViewerOpen} />

      <Feed
        selectedTopic={selectedTopic}
        filter={filter}
        selectedTweet={selectedTweet}
        setSelectedTweet={setSelectedTweet}
        setImageViewerOpen={setImageViewerOpen}
      />

      <MessagesPanel />

    </div>
  )
}