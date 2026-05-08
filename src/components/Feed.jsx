import { useState, useMemo } from 'react'
import {
  MessageCircle,
  Repeat2,
  Heart,
  Send,
  ChevronLeft,
  ChevronRight,
  X,
  Bookmark
} from 'lucide-react'

import {
  motion,
  AnimatePresence
} from 'framer-motion'

import TopicsBar from './TopicsBar'
import './Feed.css'

const tweets = [
  {
    id: 1,
    topic: 'Fitness',
    time: '2 min',
    user: 'Walter Bardier',
    username: '@walterbardier',
    text: 'Calm interfaces feel more human.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    comments: [
      { user: 'Ava', text: 'This UI feels extremely premium.' },
      { user: 'Luna', text: 'Love the transparency effect.' }
    ]
  },
  {
    id: 2,
    topic: 'Design',
    time: '14 min',
    user: 'Ava Design',
    username: '@avadsgn',
    text: 'Glassmorphism still works if spacing is clean.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    comments: [
      { user: 'Neo', text: 'Feels like iOS 26 honestly.' }
    ]
  },
  {
    id: 3,
    topic: 'Music',
    time: '1 h',
    user: 'Dylan Kai',
    username: '@dylankai',
    text: 'Nostalgia sounds warmer through distortion.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    comments: []
  },
  {
    id: 4,
    topic: 'Technology',
    time: '4 h',
    user: 'Neo Labs',
    username: '@neolabs',
    text: 'Minimal interfaces reduce cognitive noise.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    comments: []
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06
    }
  }
}

const tweetVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)"
  }
}

export default function Feed() {
  const [selectedTweet, setSelectedTweet] = useState(null)
  const [fullscreenImage, setFullscreenImage] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState(null)

  const filteredTweets = useMemo(() => {
    if (!selectedTopic) return tweets
    return tweets.filter((tweet) => tweet.topic === selectedTopic)
  }, [selectedTopic])

  return (
    <>
      <TopicsBar
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      {/* FEED */}
      <main className="feed">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <AnimatePresence mode="popLayout">

            {filteredTweets.map((tweet) => (
              <motion.article
                key={tweet.id}
                className="tweetCard glass"

                layout

                initial="hidden"
                animate="visible"
                exit="hidden"

                variants={tweetVariants}

                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1]
                }}

                whileHover={{ y: -4, scale: 1.01 }}

                onClick={() => setSelectedTweet(tweet)}
              >

                {/* TOPIC */}
                <div className="tweetTopic">
                  #{tweet.topic}
                </div>

                {/* HEADER */}
                <div className="tweetHeader">
                  <div className="tweetAvatar"></div>
                  <div>
                    <h4>{tweet.user}</h4>
                    <p>{tweet.username}</p>
                  </div>
                </div>

                {/* TEXT */}
                <p className="tweetText">{tweet.text}</p>

                {/* IMAGE */}
                <img
                  src={tweet.image}
                  alt=""
                  className="tweetImage"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFullscreenImage(tweet.image)
                  }}
                />

                {/* FOOTER */}
                <div className="tweetFooter">
                  <span className="tweetTime">{tweet.time} ago</span>
                </div>

                {/* ACTIONS */}
                <div className="tweetActions">

                  <div className="leftActions">
                    <IconButton><MessageCircle size={18} /></IconButton>
                    <IconButton><Repeat2 size={18} /></IconButton>
                    <IconButton><Heart size={18} /></IconButton>
                    <IconButton><Send size={18} /></IconButton>
                  </div>

                  <div className="rightActions">
                    <IconButton><Bookmark size={18} /></IconButton>
                  </div>

                </div>

              </motion.article>
            ))}

          </AnimatePresence>

        </motion.div>

      </main>

      {/* MODAL TWEET */}
      <AnimatePresence>
        {selectedTweet && (
          <motion.div
            className="modalOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTweet(null)}
          >

            <motion.div
              className="tweetModal glass"
              initial={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(10px)' }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1]
              }}
              onClick={(e) => e.stopPropagation()}
            >

              <button className="closeButton" onClick={() => setSelectedTweet(null)}>
                <X size={20} />
              </button>

              <img src={selectedTweet.image} className="modalImage" />

              <div className="modalTopic">#{selectedTweet.topic}</div>

              <h2>{selectedTweet.user}</h2>
              <p className="modalUsername">{selectedTweet.username}</p>

              <p className="modalText">{selectedTweet.text}</p>

              <span className="tweetTime">{selectedTweet.time} ago</span>

              <div className="tweetActions modalActions">

                <div className="leftActions">
                  <IconButton><MessageCircle size={18} /></IconButton>
                  <IconButton><Repeat2 size={18} /></IconButton>
                  <IconButton><Heart size={18} /></IconButton>
                  <IconButton><Send size={18} /></IconButton>
                </div>

                <div className="rightActions">
                  <IconButton><Bookmark size={18} /></IconButton>
                </div>

              </div>

              <div className="comments">
                {selectedTweet.comments.map((comment, index) => (
                  <div key={index} className="comment glass">
                    <strong>{comment.user}</strong>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fullscreenOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="fullscreenClose" onClick={() => setFullscreenImage(null)}>
              <X size={28} />
            </button>

            <button className="navArrow left">
              <ChevronLeft size={40} />
            </button>

            <img src={fullscreenImage} className="fullscreenImage" />

            <button className="navArrow right">
              <ChevronRight size={40} />
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ICON BUTTON */
function IconButton({ children }) {
  const [active, setActive] = useState(false)

  return (
    <motion.button
      className={active ? 'iconButton activeIcon' : 'iconButton'}

      whileHover={{
        scale: 1.12,
        y: -2,
        backgroundColor: 'rgba(255,255,255,0.12)'
      }}

      whileTap={{ scale: 0.85 }}

      animate={{
        scale: active ? 1.1 : 1
      }}

      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 18
      }}

      onClick={(e) => {
        e.stopPropagation()
        setActive(!active)
      }}
    >
      {children}
    </motion.button>
  )
}