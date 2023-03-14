import styles from './index.module.scss'
import { Box, Tooltip, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {fontSize} from "@mui/system";
import React, {useEffect,useState} from 'react'
const AccordionCard = ({
  title = "Private Sale",
  time = 'Active | Ends in 01d 08h 08m 22s',
  defaultExpanded = true
}) => {

  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = window.setInterval(() => {
      var dateBegin = new Date();//获取当前时间
      var dateEnd = new Date(1680739200000);//将-转化为/，使用new Date
      var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数1
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
      var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
      var hours=Math.floor(leave1/(3600*1000))//计算出小时数
      //计算相差分钟数
      var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
      var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
      //计算相差秒数
      var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
      var seconds=Math.round(leave3/1000)
      // console.log(dayDiff+"d", hours+"h",minutes+"m",seconds+"s");
      setCount("Active | Ends in "+dayDiff+"d "+ hours+"h "+minutes+"m "+seconds+"s")
    }, 1000);

  }, []);


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
          <div style={{
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '26px',
            textTransform: 'capitalize',
            color: '#FFFFFF'
          }}>{title}</div>
          <div className={styles.aaccordionTime} style={{
            background:'#5142FC',
            borderRadius: '9px',
            display: 'inherit',
            marginRight:'12px'
          }}>
            <Tooltip
              title={
                <Box sx={{
                  background: '#fff',
                  padding: '7px 10px',
                  fontSize: 16,
                }}>
                  End Date: 5th Apr 2023 at 23:59 UTC
                </Box>
              }
              placement="top-end"
            >
              <div style={{
                fontFamily: 'Montserrat',
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: '15px',
                lineHeight: '26px',
                textAlign: 'center',
                color: '#FFFFFF',
                marginLeft:'12px',
                marginRight:'12px',
                height: '26px',
                display:'flex',
                alignItems:'center'
                // marginTop:'3px'
              }}>{count}</div>
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
            mb: 2,
          }}>Free Mint | Max 3 per wallet | 1000 WL | 5th Mar. - 5th Apr.</Typography>
        <div
        style={{
          fontFamily: 'Montserrat',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '22px',
          color: '#FFFFFF'
        }}
        >
          How to get the first 1000 WL adresses: <br/>
          1. Follow <a href='https://twitter.com/Maxi_sui' target='_blank' style={{color:'#5142FC'}}>@Maxi_sui</a><br/>
          2. Retweet <a href='https://twitter.com/Maxi_sui/status/1632245849362415617' target='_blank' style={{color:'#5142FC'}}>https://twitter.com/Maxi_sui/status/1632245849362415617…</a><br/>
          3. Fill in your Sui Wallet Adress: <a href='https://docs.google.com/forms/d/e/1FAIpQLSdadFeTT0EDf0yR5ZUAGCgAddBO5_r01nan3a5sol3Hb0l4NQ/viewform' target='_blank' style={{color:'#5142FC'}}>https://forms.gle/pNMcWXa8KvBn71cx9…</a><br/>
          4. We will upload batch of addresses weekly and announce them on twitter
        </div>
      </AccordionDetails>
    </Accordion >
  )
}


export default AccordionCard
