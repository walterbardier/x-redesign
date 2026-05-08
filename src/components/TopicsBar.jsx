import { useState } from 'react'
import { SlidersHorizontal, Clock3, Star, Flame, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './TopicsBar.css'

const topics = ['Fitness', 'Design', 'Music', 'Fashion', 'Technology']

const filters = [
  { id: 'recent', label: 'Recientes', icon: <Clock3 size={16} /> },
  { id: 'featured', label: 'Destacados', icon: <Star size={16} /> },
  { id: 'trending', label: 'Tendencias', icon: <Flame size={16} /> }
]

export default function TopicsBar({
  selectedTopic,
  setSelectedTopic,
  selectedFilter,
  setSelectedFilter
}) {
  const [openFilters, setOpenFilters] = useState(false)

  const activeFilter = filters.find(f => f.id === selectedFilter)

  const activeFilterData = filters.find(f => f.id === selectedFilter)

  return (
    <div className="topicsWrapper">

      <motion.div className="topicsBar" layout>

        {/* TOPICS */}
        <div className="topicsRow">

          {!selectedTopic && topics.map((topic) => (
            <motion.button
              key={topic}
              className={`topicPill glass ${selectedTopic === topic ? 'active' : ''}`}

              animate={{
                opacity: selectedTopic && selectedTopic !== topic ? 0 : 1,
                scale: selectedTopic && selectedTopic !== topic ? 0.8 : 1,
                filter: selectedTopic && selectedTopic !== topic ? 'blur(10px)' : 'blur(0px)'
              }}

              transition={{ duration: 0.2 }}

              onClick={() => {
                setSelectedTopic(topic)
                setOpenFilters(false)
              }}
            >
              #{topic}
            </motion.button>
          ))}

        </div>

        {/* ACTIVE BAR */}
        <AnimatePresence>

          {selectedTopic && (
            <motion.div
              className="activeBar"

              initial={{ opacity: 0, y: 8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 8, filter: 'blur(10px)' }}

              transition={{ duration: 0.18 }}
            >

              {/* TOPIC ACTIVO */}
              <motion.button
                className="topicPill active glass"
                onClick={() => {
                  setSelectedTopic(null)
                  setSelectedFilter(null)
                  setOpenFilters(false)
                }}
              >
                #{selectedTopic}
              </motion.button>

              {/* FILTER BUTTON + MORPH */}
              <div className="filterWrapper">

                <motion.button
                  className={`filterBtn glass ${openFilters ? 'open' : selectedFilter ? 'active' : ''}`}
                  onClick={() => setOpenFilters(v => !v)}
                  whileTap={{ scale: 0.9 }}
                >
                  {selectedFilter && !openFilters ? (
                    activeFilterData?.icon
                  ) : openFilters ? (
                    <X size={18} />
                  ) : (
                    <SlidersHorizontal size={18} />
                  )}
                </motion.button>

                {/* DROPDOWN */}
                <AnimatePresence>

                  {openFilters && (
                    <motion.div
                      className="filterMenu glass"
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: -8,
                        x: 10,
                        filter: 'blur(14px)'
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        x: 0,
                        filter: 'blur(0px)'
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.92,
                        y: -6,
                        x: 8,
                        filter: 'blur(16px)'
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 30,
                        mass: 0.8
                      }}
                    >

                      {filters.map(f => (
                        <button
                          key={f.id}
                          className={`filterItem ${selectedFilter === f.id ? 'active' : ''}`}

                          onClick={() => {
                            setSelectedFilter(f.id)

                            requestAnimationFrame(() => {
                              setOpenFilters(false)
                            })
                          }}
                        >
                          {f.icon}
                          <span>{f.label}</span>
                        </button>
                      ))}

                    </motion.div>
                  )}

                </AnimatePresence>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </motion.div>
    </div>
  )
}