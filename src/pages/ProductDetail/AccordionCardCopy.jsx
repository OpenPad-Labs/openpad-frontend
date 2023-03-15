import React, { useState } from 'react'
import styles from './index.module.scss'
import { Box, Tooltip, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import notifyBtn from '../../assets/img/page/product_detail/notifyBtn.svg'
import {devnetConnection, JsonRpcProvider} from "@mysten/sui.js";
import {useWallet} from "@suiet/wallet-kit";


const AccordionCard = ({
  title = "Private Sale",
  time = 'Active | Ends in 01d 08h 08m 23s',
  defaultExpanded = false
}) => {
  const [defaultExpandedFlag, setDefaultExpandedFlag] = useState(defaultExpanded);
  const wallet = useWallet();

  const handleExpanded = event => {
    setDefaultExpandedFlag(!defaultExpandedFlag)
  }

  const checkWhite = async () => {
    //project id 0xbe63d945901e09f070384b77522bdf054f69ce3c
    const provider = new JsonRpcProvider(devnetConnection);
    // get tokens from the DevNet faucet server
    const objects = await provider.getObject(
      '0x60405284a4ad228225fca66c82d4af620d253789',
    );
    console.log()
    const whiteList=objects?.details?.data?.fields?.listed?.fields?.contents
    let inWhite=false
    if (whiteList!==undefined){
      for (let i = 0; i < whiteList.length; i++) {
        const address=whiteList[i]
        if (address===wallet?.account?.address){
          inWhite=true
        }
      }
    }
    if (inWhite){
      console.log('在白单')
    }
  }
  return (
    <Accordion
      className='Accordion'
      sx={{
        my: 2,
        background: ' #343444',
        borderRadius: '12px !important'
      }}
      defaultExpanded={defaultExpanded}
      onChange={handleExpanded}
    >
      <div>
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
                // flexDirection: 'column',
                alignItems: 'flex-start'
              }
            }}
          >
            <div className={styles.accordion}>{title}</div>
            <div className={styles.aaccordionTime}>
              <img className={styles.arrow} />
            </div>
          </Box>

        </AccordionSummary>
        <div className={defaultExpandedFlag ? '' : styles.statusBarTrue}>
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
        </div>
      </div>
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
        <div className={styles.btnBox} onClick={checkWhite}>
          <div className={styles.checkBtn}>Check Eligibility</div>
          {/* <div className={styles.notifyBtn}>
            <img src={notifyBtn} alt='' />
            <span>Notify Me</span>
          </div> */}
        </div>
      </AccordionDetails>
    </Accordion >
  )
}


export default AccordionCard
