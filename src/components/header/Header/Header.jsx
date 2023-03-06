import React, { useRef, useState, useEffect } from 'react'
import DarkMode from '../DarkMode'
import styles from './header.module.scss'
// import './header.module.less'
import LogoIcon from '../../../assets/img/logo/logo.png'
import searchIcon from '../../../assets/img/header/icon-search.png'
import classNames from 'classnames'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material'
import { ConnectButton } from '@suiet/wallet-kit';
const Header = () => {
  const headerRef = useRef(null)
  const navigate = useNavigate()
  const tabList = [
    {
      key: 'Suicasso',
      name: 'Suicasso',
      link: '/aigc-mint'
    },
    {
      key: 'Launchpad',
      name: 'Launchpad',
      link: '/launchpad'
    },
    {
      key: 'Marketplace',
      name: 'Marketplace',
      link: '/marketplace'
    },
    {
      key: 'Stats',
      name: 'Stats',
      link: '/stats'
    }
  ]
  useEffect(() => {
    window.addEventListener('scroll', isSticky)
    return () => {
      window.removeEventListener('scroll', isSticky)
    }
  })
  const isSticky = () => {
    const header = document.querySelector('.js-header')
    const scrollTop = window.scrollY
    scrollTop >= 300 ? header.classList.add('is-fixed') : header.classList.remove('is-fixed')
    scrollTop >= 400 ? header.classList.add('is-small') : header.classList.remove('is-small')
  }

  const menuLeft = useRef(null)
  const btnToggle = useRef(null)
  const btnSearch = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const handleOnClick = index => {
    console.log(index)

    if (index===0) {
      navigate('/aigc-mint')
      setActiveIndex(index)
    }else {
      toast.info(
        <Box sx={{
          fontFamily: 'Montserrat Bold',
          fontWeight: 700,
          fontSize: 20
        }}>
          Coming soon
        </Box>
      )
      return
    }

  }

  return (
    <header id='header_main' className={classNames(styles.header, 'js-header')} ref={headerRef}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Link to="/aigc-mint"><img className={styles.logo} src={LogoIcon} alt='' /></Link>
          <div className={styles.searchInput}>
            <img src={searchIcon} alt='' className={styles.searchIcon} />
            <input className={styles.input} type='text' placeholder='Type to search...' />
          </div>
          <div className={styles.tabList}>
            {tabList.map((item, index) => (
              <div
                key={item.key}
                className={classNames(styles.item, activeIndex === index && styles.active)}
                onClick={() => {
                  handleOnClick(index)
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <Box
          className='connect-button'
          sx={{
            '.wkit-connected-container': {
              width: 200,
              background: 'linear-gradient(90deg, #1785FF 0%, #9414FF 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '33.6px',
              color: '#fff',
              // height: 40,
              '.wkit-connected-button': {
                '.wkit-connected-button__balance': {
                  fontFamily: 'Montserrat',
                  fontSize: '12px',
                  color: '#fff',
                  '@media (max-width:750px)': {
                    display: 'none'
                  }
                },
                '.wkit-address-select': {
                  span: {
                    fontFamily: 'Montserrat',
                    fontSize: '12px',
                    color: '#fff',
                    '@media (max-width:750px)': {
                      // lineHeight: '40px',
                    }
                  }
                },
                '&:hover': {
                  border: 'none'
                },
                '&:focus': {
                  border: 'none'
                }
              },
              ' @media (max-width:750px)': {
                width: 120,
                height: 40,
                borderRadius: '20px',
              }
            },
            '.wkit-button': {
              width: 200,
              background: 'linear-gradient(90deg, #1785FF 0%, #9414FF 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '33.6px',
              fontFamily: 'Montserrat',
              color: '#fff',
              fontSize: '16px',
              '&:hover': {
                border: 'none',
                color: '#fff'
              },
              '@media (max-width:750px)': {
                width: 120,
                height: 40,
                borderRadius: '20px',
                fontSize: '12px',
                p: 0,
              }
            }
          }}
        >
          <ConnectButton label="Connect Wallet" />
        </Box>
        {/* <DarkMode /> */}
      </div>
    </header >
  )
}

export default Header
