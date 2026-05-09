import { useState, useEffect, useRef } from 'react'

import {
  motion,
  AnimatePresence
} from 'framer-motion'

import xLogo from '../assets/x-logo.png'

import './Navbar.css'

export default function Navbar({ tweetModalOpen = false }) {

  const [activeTab, setActiveTab] =
    useState('forYou')

  const [open, setOpen] =
    useState(false)

  const menuRef = useRef()

  useEffect(() => {

    if (tweetModalOpen) {
      setOpen(false)
    }

  }, [tweetModalOpen])

  const goHome = () => {

    setActiveTab('forYou')

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {

      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }

  }, [])

  const handleLiquidHover = (e) => {

    const rect =
      e.currentTarget.getBoundingClientRect()

    const x =
      e.clientX - rect.left

    const y =
      e.clientY - rect.top

    e.currentTarget.style.setProperty(
      '--x',
      `${x}px`
    )

    e.currentTarget.style.setProperty(
      '--y',
      `${y}px`
    )
  }

  return (

    <div className="navbarContainer">

      {/* LEFT */}

      <AnimatePresence mode="popLayout">

        {!tweetModalOpen && (

          <motion.button
            key="navLogo"

            initial={false}

            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }}

            exit={{
              opacity: 0,
              scale: 0.92,
              filter: 'blur(12px)'
            }}

            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}

            whileHover={{
              y: -3,
              scale: 1.04
            }}

            whileTap={{
              scale: 0.96
            }}

            className="logoCircle glass"

            onClick={goHome}

            onMouseMove={handleLiquidHover}
          >

            <img
              src={xLogo}
              alt="Home"
              className="homeIcon"
            />

          </motion.button>

        )}

      </AnimatePresence>

      {/* CENTER */}

      <AnimatePresence mode="popLayout">

        {!tweetModalOpen && (

          <motion.div
            key="navTabs"
            className="navTabs glass"

            initial={false}

            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }}

            exit={{
              opacity: 0,
              scale: 0.92,
              filter: 'blur(12px)'
            }}

            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}

            onMouseMove={handleLiquidHover}
          >

            <motion.button
              whileHover={{
                y: -2
              }}

              whileTap={{
                scale: 0.96
              }}

              className={
                activeTab === 'forYou'
                  ? 'activeTab'
                  : ''
              }

              onClick={() =>
                setActiveTab('forYou')
              }
            >

              For You

            </motion.button>

            <motion.button
              whileHover={{
                y: -2
              }}

              whileTap={{
                scale: 0.96
              }}

              className={
                activeTab === 'following'
                  ? 'activeTab'
                  : ''
              }

              onClick={() =>
                setActiveTab('following')
              }
            >

              Following

            </motion.button>

          </motion.div>

        )}

      </AnimatePresence>

      {/* RIGHT */}

      <AnimatePresence mode="popLayout">

        {!tweetModalOpen && (

          <motion.div
            key="navProfile"

            className="profileWrapper"

            ref={menuRef}

            initial={false}

            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }}

            exit={{
              opacity: 0,
              scale: 0.92,
              filter: 'blur(12px)'
            }}

            transition={{
              duration: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >

            <motion.button
              layoutId="profileMorph"

              animate={{
                opacity: open ? 0 : 1,
                scale: open ? 0.92 : 1,
                filter: open
                  ? 'blur(12px)'
                  : 'blur(0px)'
              }}

              transition={{
                duration: 0.16,
                ease: [0.22, 1, 0.36, 1]
              }}

              whileHover={{
                y: -3,
                scale: 1.03
              }}

              whileTap={{
                scale: 0.97
              }}

              className="profileButton glass"

              onClick={() =>
                setOpen(true)
              }

              onMouseMove={handleLiquidHover}
            >

              <img
                src="https://i.pravatar.cc/150?img=12"
                alt=""
                className="profileImage"
              />

            </motion.button>

            <AnimatePresence>

              {open && (

                <motion.div
                  layoutId="profileMorph"

                  initial={{
                    opacity: 0,
                    scale: 0.88,
                    filter: 'blur(18px)'
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)'
                  }}

                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    filter: 'blur(18px)'
                  }}

                  transition={{
                    duration: 0.18,
                    ease: [0.22, 1, 0.36, 1]
                  }}

                  className="profileMenu glass"
                >

                  <div className="profileHeader">

                    <img
                      src="https://i.pravatar.cc/150?img=12"
                      className="menuAvatar"
                    />

                    <div>
                      <h4>Walter Bardier</h4>
                      <p>@walterbardier</p>
                    </div>

                  </div>

                  <button>
                    Perfil
                  </button>

                  <button>
                    Configuración
                  </button>

                  <button>
                    Cerrar sesión
                  </button>

                  <div className="divider"></div>

                  <p className="switchTitle">
                    Cambiar cuenta
                  </p>

                  <button>
                    @designarchive
                  </button>

                  <button>
                    @lavenderstudio
                  </button>

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  )
}