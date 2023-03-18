import React, { useState, useEffect, startTransition } from 'react'
import styles from './index.module.scss'
import { Box, Tooltip } from '@mui/material'
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>Ended</span>;
  } else {
    // Render a countdown
    return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
  }
};

const MyCountdown = ({ start, end }) => {
  const [countdownTime, setCountdownTime] = useState()

  useEffect(() => {
    const now = Date.now()
    setCountdownTime(now)
  }, [])

  if (!(start && end)) {
    return null
  }


  if (countdownTime > end) {
    return (
      <Tooltip
        title={
          <Box sx={{
            background: '#fff',
            padding: '7px 10px',
            fontSize: 16,
          }}>
            End Date: {new Date(end).toString()?.replaceAll('(中国标准时间)')}
          </Box>
        }
        placement="top-end"
      >
        <div className={styles.statusBar}>
          Ended
        </div>
      </Tooltip>
    )
  }
  if (countdownTime < start) {
    return (
      <Tooltip
        title={
          <Box sx={{
            background: '#fff',
            padding: '7px 10px',
            fontSize: 16,
          }}>
            Start Date: {new Date(start).toString()?.replaceAll('(中国标准时间)')}
          </Box>
        }
        placement="top-end"
      >
        <div className={styles.statusBar}>
          Start In
          <Countdown
            date={start}
            renderer={renderer}
          />
        </div>
      </Tooltip>
    )
  }
  return (
    <Tooltip
      title={
        <Box sx={{
          background: '#fff',
          padding: '7px 10px',
          fontSize: 16,
        }}>
          {'End Date: ' + new Date(end).toString()?.replaceAll('(中国标准时间)')}
        </Box>
      }
      placement="top-end"
    >
      <div className={styles.statusBar}>
        Active | End In
        <Countdown
          date={end}
          renderer={renderer}
        />
      </div>
    </Tooltip>
  )
}

export default MyCountdown
