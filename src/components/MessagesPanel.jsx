import { useState } from 'react'

import {
  MessageCircle,
  Search,
  PenSquare,
  X
} from 'lucide-react'

import {
  motion,
  AnimatePresence
} from 'framer-motion'

import './MessagesPanel.css'

const chats = [
  {
    id: 1,
    name: 'Ava Johnson',
    username: '@avajohnson',
    image:
      'https://i.pravatar.cc/150?img=32',
    message:
      'The new UI feels insanely smooth.',
    time: '2m'
  },

  {
    id: 2,
    name: 'Neo Archive',
    username: '@neoarchive',
    image:
      'https://i.pravatar.cc/150?img=14',
    message:
      'Can you send the Figma file later?',
    time: '12m'
  },

  {
    id: 3,
    name: 'Luna',
    username: '@lunaa',
    image:
      'https://i.pravatar.cc/150?img=47',
    message:
      'This animation literally feels like iOS.',
    time: '1h'
  },

  {
    id: 4,
    name: 'Daniel',
    username: '@danielux',
    image:
      'https://i.pravatar.cc/150?img=59',
    message:
      'Your portfolio is looking premium.',
    time: '3h'
  }
]

export default function MessagesPanel() {

  const [open, setOpen] =
    useState(false)

  return (

    <div className="messagesWrapper">

      <AnimatePresence>

        {!open && (

          <motion.button
            key="messageButton"

            layoutId="messagesMorph"

            className="
              messagesButton
              glass
            "

            whileHover={{
              y: -3,
              scale: 1.03
            }}

            whileTap={{
              scale: 0.96
            }}

            transition={{
              duration: 0.18,
              ease: [0.22, 1, 0.36, 1]
            }}

            onClick={() =>
              setOpen(true)
            }
          >

            <MessageCircle size={22} />

          </motion.button>

        )}

      </AnimatePresence>

      <AnimatePresence>

        {open && (

          <motion.div
            key="messagesPanel"

            layoutId="messagesMorph"

            initial={{
              opacity: 0,
              scale: 0.92,
              filter: 'blur(18px)'
            }}

            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }}

            exit={{
              opacity: 0,
              scale: 0.96,
              filter: 'blur(18px)'
            }}

            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1]
            }}

            className="
              messagesPanel
              glass
            "
          >

            <div className="messagesTop">

              <h2>
                Messages
              </h2>

              <div className="messagesTopActions">

                <button className="topIconButton">
                  <Search size={18} />
                </button>

                <button className="topIconButton">
                  <PenSquare size={18} />
                </button>

                <button
                  className="topIconButton"

                  onClick={() =>
                    setOpen(false)
                  }
                >

                  <X size={18} />

                </button>

              </div>

            </div>

            <div className="messagesList">

              {chats.map((chat) => (

                <motion.div
                  key={chat.id}

                  whileHover={{
                    x: 2
                  }}

                  className="
                    chatItem
                  "
                >

                  <img
                    src={chat.image}
                    alt=""
                    className="
                      chatAvatar
                    "
                  />

                  <div className="chatInfo">

                    <div className="chatHeader">

                      <h4>
                        {chat.name}
                      </h4>

                      <span>
                        {chat.time}
                      </span>

                    </div>

                    <p>
                      {chat.message}
                    </p>

                  </div>

                </motion.div>

              ))}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  )
}