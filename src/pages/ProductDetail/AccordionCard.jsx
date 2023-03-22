import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import { Box, Tooltip, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import notifyBtn from '../../assets/img/page/product_detail/notifyBtn.svg'
import { devnetConnection, JsonRpcProvider } from "@mysten/sui.js";
import { useWallet } from "@suiet/wallet-kit";
import AIGCModal from 'src/components/AIGC/AIGCModal'
import Countdown from "react-countdown";
import MyCountdown from './MyCountdown';

const AccordionCard = ({
  title = "Private Sale",
  price = '0.1',
  startTime,
  endTime,
  detail = '',
  defaultExpanded = false,
  contractAddress = '',
  maxMintNum=1,
                         nftStatus=''
}) => {
  // console.log('startTime', Date.now() - startTime)
  // console.log('endTime', Date.now() - endTime)

  const [defaultExpandedFlag, setDefaultExpandedFlag] = useState(defaultExpanded);
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [showResults, setShowResults] = useState(true);

  const wallet = useWallet();
  const handleExpanded = event => {
    setDefaultExpandedFlag(!defaultExpandedFlag)
  }
  const checkWhite = async () => {
    await setModalText(<><div>checking...</div></>);
    setOpen(true)
    // console.log('contractAddress',contractAddress)
    //project id 0xbe63d945901e09f070384b77522bdf054f69ce3c
    const provider = new JsonRpcProvider(devnetConnection);
    // get tokens from the DevNet faucet server
    const objects = await provider.getObject(
      contractAddress
    );
    console.log(objects)
    let whiteList;
    if (title === 'Airdrop') {
      whiteList = objects?.details?.data?.fields?.airdrop_list?.fields?.contents
    } else {
      whiteList = objects?.details?.data?.fields?.whitelist?.fields?.contents
    }
    let inWhite = false
    if (whiteList !== undefined) {
      for (let i = 0; i < whiteList.length; i++) {
        const address = whiteList[i].fields?.key
        if (address === wallet?.account?.address) {
          inWhite = true
        }
      }
    }
    if (inWhite) {
      await setModalText(<><div>Congrats! You are eligible to mint!</div></>);
      setOpen(true)
    } else {
      await setModalText(<><div>Sorry! You are not on the list. <br />
        Click here to view the whitelist<br />
        If you believe that you should be on the list, please contact @NFTPROJ directly.<br /><br />
        Or, join Maxi Membership to enter the whitelist directly.</div></>);
      setOpen(true)
    }
  }
  return (
    nftStatus==='minting'?
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
          <div className={styles.accordionSummary}>
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
            <div className={`${styles.statusBarFalse} ${defaultExpandedFlag ? '' : styles.statusBarTrue}`}>
              <MyCountdown
                start={Number(startTime)}
                end={Number(endTime)}
                activeString="Active | "
              />
            </div>
          </div>
        </AccordionSummary>
      </div>
      <AccordionDetails>
        <Typography
          sx={{
            color: '#fff',
            fontFamily: 'Montserrat',
            fontWeight: 400,
            fontSize: '16px',
            mb: 2
          }}>{price} SUI | Max {maxMintNum} per wallet</Typography>
        <div className={styles.paragraph}>
          <p>Whitelist requirement:</p>
          {/* <p>1.You need to follow @NFTPROJ on Twitter</p>
          <p>
            2.You need to obtain Genie, King role in @NFTPROJ Discord server Click here to
            view the whitelist
          </p>
          <p>
            PS: Members of Maxi Pad will be automatically added to the whitelist. View our
            membership policy here.
          </p> */}
          {detail}
        </div>
        {title !== 'Public Sale' ? <div className={styles.btnBox} onClick={checkWhite}>
          <div className={styles.checkBtn}>Check Eligibility</div>
          {/* <div className={styles.notifyBtn}>
            <img src={notifyBtn} alt='' />
            <span>Notify Me</span>
          </div> */}
        </div> : <div></div>}
      </AccordionDetails>
      <AIGCModal setOpen={setOpen} text={modalText} open={open} showResults={showResults} />
    </Accordion >:null
  )
}


export default AccordionCard
