import React from 'react'
import styles from './index.module.scss'
import { Box, Tooltip, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import notifyBtn from '../../assets/img/page/product_detail/notifyBtn.svg'

const AccordionCard = ({
  title = "Private Sale",
  time = 'Active | Ends in 01d 08h 08m 23s',
  defaultExpanded = false
}) => {
  return (
    <Accordion
      className='Accordion'
      sx={{
        my: 2,
        background: ' #343444',
        borderRadius: '12px !important'
      }}
      defaultExpanded={defaultExpanded}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{
          width: '30px',
          height: '30px',
          color: '#fff'
        }} />}
        aria-controls="panel1a-content"
      >
        <Box
          className={styles.title}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between",
            width: '100%',
            background: ' #343444',
            alignItems: 'center',
            '@media (max-width:750px)': {
              flexDirection: 'column',
              alignItems: 'flex-start'
            }
          }}
        >
          <div className={styles.accordion}>{title}</div>
          <div className={styles.aaccordionTime}>
            <Tooltip
              title={
                <Box sx={{
                  background: '#fff',
                  padding: '7px 10px',
                  fontSize: 16,
                }}>
                  End Date: Jan 23 2023 at 8:00AM GMT+8
                </Box>
              }
              placement="top-end"
            >
              <div className={styles.statusBar}>{time}</div>
            </Tooltip>
            <img className={styles.arrow} />
          </div>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            color: '#fff',
            fontFamily: 'Montserrat',
            fontWeight: 400,
            fontSize: '16px',
            mb: 2
          }}>0.1 SUI | Max 2 per wallet</Typography>
        <div className={styles.b3}>
          <p>Whitelist requirement:</p>
          <p>1.You need to follow @NFTPROJ on Twitter</p>
          <p>
            2.You need to obtain Genie, King role in @NFTPROJ Discord server Click here to
            view the whitelist
          </p>
          <p>
            PS: Members of Maxi Pad will be automatically added to the whitelist. View our
            membership policy here.
          </p>
        </div>
        <div className={styles.btnBox}>
          <div className={styles.checkBtn}>Check Eligibility</div>
          <div className={styles.notifyBtn}>
            <img src={notifyBtn} alt='' />
            <span>Notify Me</span>
          </div>
        </div>
      </AccordionDetails>
    </Accordion >
  )
}


export default AccordionCard