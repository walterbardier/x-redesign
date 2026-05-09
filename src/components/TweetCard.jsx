import { useEffect, useState, useRef } from 'react'
import {
  Heart,
  MessageCircle,
  Repeat2,
  Send
} from 'lucide-react'

import { motion } from 'framer-motion'

import './Feed.css'
import './TweetCard.css'

function getTweetImages(tweet) {
  if (tweet.images?.length) return tweet.images
  if (tweet.image) return [tweet.image]
  return []
}

const tweetVariants = {
  hidden: {
    opacity: 0,
    y: 20,
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

export default function TweetCard({ tweet, replyAs = 'Tú' }) {
  const [comments, setComments] = useState(() => tweet.comments ?? [])
  const [replyText, setReplyText] = useState('')
  const replyRef = useRef(null)

  useEffect(() => {
    setComments(tweet.comments ?? [])
  }, [tweet.id])

  useEffect(() => {
    const el = replyRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [replyText])

  function handlePublish() {
    const text = replyText.trim()
    if (!text) return

    setComments((prev) => [...prev, { user: replyAs, text }])
    setReplyText('')
  }

  return (
    <motion.article
      className="tweetCard tweetCardSplit glass"
      variants={tweetVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <div className="tweetCardMain">
        <div className="tweetTopic">
          #{tweet.topic}
        </div>

        <div className="tweetHeader">
          <div className="tweetAvatar" />

          <div>
            <h4>{tweet.user}</h4>
            <p>{tweet.username}</p>
          </div>
        </div>

        <p className="tweetText tweetTextMultiline">{tweet.text}</p>

        {getTweetImages(tweet).length > 0 && (
          <div
            className={
              getTweetImages(tweet).length > 1
                ? 'tweetMedia tweetMediaGrid'
                : 'tweetMedia'
            }
          >
            {getTweetImages(tweet).map((src) => (
              <img
                key={src}
                src={src}
                alt="tweet"
                className="tweetImage"
              />
            ))}
          </div>
        )}

        <div className="tweetActions">
          <button type="button"><MessageCircle size={19} /></button>
          <button type="button"><Repeat2 size={19} /></button>
          <button type="button"><Heart size={19} /></button>
          <button type="button"><Send size={19} /></button>
        </div>
      </div>

      <aside className="tweetCardCommentsPanel">
        <div className="tweetReplyForm">
          <textarea
            ref={replyRef}
            className="tweetReplyInput"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Escribe tu respuesta…"
            rows={1}
          />
          <button
            type="button"
            className="tweetReplyPublish"
            aria-label="Publicar respuesta"
            onClick={handlePublish}
            disabled={!replyText.trim()}
          >
            <Send size={20} strokeWidth={2.25} aria-hidden />
          </button>
        </div>

        <div className="tweetCommentsList">
          {comments.length === 0 ? (
            <p className="tweetCommentsEmpty">Aún no hay comentarios.</p>
          ) : (
            comments.map((comment, index) => (
              <div key={`${comment.user}-${index}`} className="comment glass">
                <strong>{comment.user}</strong>
                <p>{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </aside>
    </motion.article>
  )
}
