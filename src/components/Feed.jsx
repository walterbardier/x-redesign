import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
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

function getTweetImages(tweet) {
  if (tweet.images?.length) return tweet.images
  if (tweet.image) return [tweet.image]
  return []
}

const tweets = [
  {
    id: 1,
    topic: 'Fitness',
    time: '2 min',
    user: 'Walter Bardier',
    username: '@walterbardier',
    text: 'One rep at a time. The work always pays off.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    comments: [
      { user: 'Ava', text: 'Consistency is the key. Keep grinding!' },
      { user: 'Luna', text: 'Respect the hustle. Results are coming.' }
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
      { user: 'Neo', text: 'Feels like iOS 26 honestly.' },
      { user: 'Julia', text: 'The transaprency is refreshing.' },
      { user: 'Neo', text: 'Yes, it does.' }
    ]
  },
  {
    id: 3,
    topic: 'Music',
    time: '2 h',
    user: 'Dylan Kai',
    username: '@dylankai',
    text: `"Summer Breeze, Guide Me Through These Empty Streets" isn't just an album—it's a metaphorical walk through a city at 4 a.m., a place that feels completely familiar and totally foreign all at once. I wanted to capture that specific silence that happens when the world stops for a second and you're the only one left awake to hear it.

The title is a plea. It's about those moments when you don't have a map or a destination, and you just have to let the wind take the lead. I wrote this for the times when loneliness doesn't feel like a weight, but like a strange kind of comfort you find in empty spaces. There's a lot of my own history in these streets—memories of summers that slipped away and versions of myself that I've left behind in different corners of the city.

I made sure the production stayed intentionally stripped back. I wanted the music to breathe like the air does right before a storm—heavy, honest, and still. It's a reflection on the places that have shaped me and the feeling of just passing through life while searching for something real.

Thank you to everyone who sat in the quiet with me while I put this together. Whether you're driving down a highway at night or just sitting by an open window waiting for the heat to break, I hope these tracks keep you company. This one is for the wanderers who are still finding their way home.`,
    images: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad',
      'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae'
    ],
    comments: [
      { user: 'Mara', text: 'The title alone feels like a whole film.' },
      { user: 'Jon', text: 'That 3 a.m. line hit way too close.' }
    ]
  },
  {
    id: 5,
    topic: 'Music',
    time: '5 h',
    user: 'Dylan Kai',
    username: '@dylankai',
    text: `I've been trying to find the words to describe what "Sally's Seams" really means to me, and I think it comes down to the things we try to keep held together when everything feels like it's pulling apart. This album isn't just about music; it's about those invisible stitches we use to build ourselves up so the world doesn't see the mess underneath.

I wrote these songs in that weird space where you feel like you're being watched but never really seen. The title track, "Sally's Seams," is a confession about never quite fitting into the frame people built for me. It's about the "boos" from a crowd that only exists in your head and the quiet war of trying to stay sane when your own mind feels like a drafty room.

There is a specific kind of honesty in these arrangements—nothing is over-polished because I wanted it to sound as natural and youthful as a conversation. I kept the lo-fi edges and the raw vocals because memory and growth are supposed to be a little frayed. If you've ever felt like you're just a collection of threads trying to stay attached to a world that keeps moving too fast, these ten songs are for you.

Thank you for letting me share these fragments of my seasons, from the fading summer sun to the cold air of a late night walk. Whether you listen to it while staring at the ceiling or walking through the city trying to disappear, I hope you find a piece of yourself in the gaps between the notes. Play it when you feel like you're falling apart—maybe we can stay in one piece together.`,
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745'
    ],
    comments: [
      { user: 'Eli', text: 'Track three destroyed me in the best way.' }
    ]
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

export default function Feed({ selectedTweet, setSelectedTweet, setImageViewerOpen }) {
  const [fullscreenViewer, setFullscreenViewer] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [modalComments, setModalComments] = useState([])
  const [modalReply, setModalReply] = useState('')
  const modalReplyRef = useRef(null)

  useEffect(() => {
    if (!selectedTweet) return
    setModalComments(selectedTweet.comments ?? [])
    setModalReply('')
  }, [selectedTweet?.id])

  useEffect(() => {
    const el = modalReplyRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [modalReply])

  const closeFullscreenViewer = useCallback(() => {
    setFullscreenViewer(null)
    setImageViewerOpen?.(false)
  }, [setImageViewerOpen])

  const openFullscreenViewer = (urls, index) => {
    if (!urls?.length) return
    setImageViewerOpen?.(true)
    setFullscreenViewer({
      urls,
      index: Math.min(Math.max(0, index), urls.length - 1)
    })
  }

  useEffect(() => {
    if (!fullscreenViewer) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeFullscreenViewer()
        return
      }

      const { urls, index } = fullscreenViewer
      if (urls.length < 2) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setFullscreenViewer({
          urls,
          index: (index - 1 + urls.length) % urls.length
        })
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setFullscreenViewer({
          urls,
          index: (index + 1) % urls.length
        })
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [fullscreenViewer, closeFullscreenViewer])

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

                layout={!fullscreenViewer}

                initial="hidden"
                animate="visible"
                exit="hidden"

                variants={tweetVariants}

                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1]
                }}

                {...(!fullscreenViewer
                  ? { whileHover: { y: -4, scale: 1.01 } }
                  : {})}

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
                <p className="tweetText tweetTextMultiline">{tweet.text}</p>

                {/* IMAGES */}
                {(() => {
                  const images = getTweetImages(tweet)
                  if (images.length === 0) return null
                  return (
                    <div
                      className={
                        images.length > 1
                          ? 'tweetMedia tweetMediaGrid'
                          : 'tweetMedia'
                      }
                    >
                      {images.map((src, idx) => (
                        <img
                          key={src}
                          src={src}
                          alt=""
                          className="tweetImage"
                          onClick={(e) => {
                            e.stopPropagation()
                            openFullscreenViewer(images, idx)
                          }}
                        />
                      ))}
                    </div>
                  )
                })()}

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

              <div className="tweetModalMain">

                {(() => {
                  const images = getTweetImages(selectedTweet)
                  if (images.length === 0) return null
                  return (
                    <div
                      className={
                        images.length > 1
                          ? 'modalImageGrid'
                          : 'modalImageSingle'
                      }
                    >
                      {images.map((src, idx) => (
                        <img
                          key={src}
                          src={src}
                          alt=""
                          className="modalImage"
                          onClick={(e) => {
                            e.stopPropagation()
                            openFullscreenViewer(images, idx)
                          }}
                        />
                      ))}
                    </div>
                  )
                })()}

                <div className="modalTopic">#{selectedTweet.topic}</div>

                <h2>{selectedTweet.user}</h2>
                <p className="modalUsername">{selectedTweet.username}</p>

                <p className="modalText modalTextMultiline">{selectedTweet.text}</p>

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

              </div>

              <aside className="tweetModalAside">

                <div className="modalReplyForm">
                  <textarea
                    ref={modalReplyRef}
                    className="modalReplyInput"
                    value={modalReply}
                    onChange={(e) => setModalReply(e.target.value)}
                    placeholder="Responder al tweet…"
                    rows={1}
                  />
                  <button
                    type="button"
                    className="modalReplySend"
                    aria-label="Enviar respuesta"
                    disabled={!modalReply.trim()}
                    onClick={() => {
                      const text = modalReply.trim()
                      if (!text) return
                      setModalComments((prev) => [...prev, { user: 'Tú', text }])
                      setModalReply('')
                    }}
                  >
                    <Send size={20} strokeWidth={2.25} aria-hidden />
                  </button>
                </div>

                <div className="modalCommentsList">
                  {modalComments.length === 0 ? (
                    <p className="modalCommentsEmpty">Aún no hay comentarios.</p>
                  ) : (
                    modalComments.map((comment, index) => (
                      <div key={`${comment.user}-${index}`} className="comment glass">
                        <strong>{comment.user}</strong>
                        <p>{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>

              </aside>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN IMAGE */}
      <AnimatePresence>
        {fullscreenViewer && (
          <motion.div
            className="fullscreenOverlay"
            role="presentation"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeFullscreenViewer}
          >
            <button
              type="button"
              className="fullscreenClose"
              aria-label="Cerrar"
              onClick={(e) => {
                e.stopPropagation()
                closeFullscreenViewer()
              }}
            >
              <X size={28} />
            </button>

            {fullscreenViewer.urls.length > 1 && (
              <button
                type="button"
                className="navArrow left"
                aria-label="Imagen anterior"
                onClick={(e) => {
                  e.stopPropagation()
                  setFullscreenViewer((v) => {
                    if (!v || v.urls.length < 2) return v
                    return {
                      urls: v.urls,
                      index: (v.index - 1 + v.urls.length) % v.urls.length
                    }
                  })
                }}
              >
                <ChevronLeft size={40} />
              </button>
            )}

            <img
              src={fullscreenViewer.urls[fullscreenViewer.index]}
              alt=""
              className="fullscreenImage"
              onClick={(e) => e.stopPropagation()}
            />

            {fullscreenViewer.urls.length > 1 && (
              <button
                type="button"
                className="navArrow right"
                aria-label="Imagen siguiente"
                onClick={(e) => {
                  e.stopPropagation()
                  setFullscreenViewer((v) => {
                    if (!v || v.urls.length < 2) return v
                    return {
                      urls: v.urls,
                      index: (v.index + 1) % v.urls.length
                    }
                  })
                }}
              >
                <ChevronRight size={40} />
              </button>
            )}

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