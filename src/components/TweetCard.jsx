import {
  Heart,
  MessageCircle,
  Repeat2,
  Send
} from 'lucide-react'

import { motion } from 'framer-motion'

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

export default function TweetCard({ tweet }) {
  return (
    <motion.article
      className="tweetCard glass"
      variants={tweetVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <div className="tweetHeader">
        <div className="tweetAvatar small" />

        <div>
          <h4>{tweet.user}</h4>
          <p>{tweet.username}</p>
        </div>
      </div>

      <p className="tweetText">{tweet.text}</p>

      <div className="tweetTopic">
        #{tweet.topic}
      </div>

      <img
        src={tweet.image}
        alt="tweet"
        className="tweetImage"
      />

      <div className="tweetActions">
        <button><MessageCircle size={19} /></button>
        <button><Repeat2 size={19} /></button>
        <button><Heart size={19} /></button>
        <button><Send size={19} /></button>
      </div>
    </motion.article>
  )
}