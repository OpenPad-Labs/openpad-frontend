import React, { memo, useEffect, useState } from 'react'
import styles from './index.module.scss'
import userInfoIcon from '../../assets/img/page/home/userInfo.png'
import rightArrow from '../../assets/img/page/home/rightArrow.png'
import dogeAvatar from '../../assets/img/page/home/suibear.webp'
import listItemDemo from '../../assets/img/page/home/list-item-demo.png'
import chevron_right from '../../assets/img/page/home/chevron_right.png'
import categoryIcon from '../../assets/img/page/home/category.png'
import { Pagination } from '@mui/material'
import sortIcon from '../../assets/img/page/home/sort.png'
import { getBanner, getNftDetail, getNftList } from 'src/service/home'
import Slider from 'react-slick'
import { Box, Tooltip, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import netIcon from '../../assets/img/page/product_detail/net.png'
import discordIcon from '../../assets/img/page/product_detail/discord.png'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'
import telegramIcon from '../../assets/img/page/product_detail/telegram.png'
import noteIcon from '../../assets/img/page/product_detail/note.png'
import cartIcon from '../../assets/img/page/product_detail/cartIcon.png'
import notifyBtn from '../../assets/img/page/product_detail/notifyBtn.svg'
import classNames from 'classnames'
import ArrowDownIcon from '../../assets/img/page/product_detail/arrowDown.png'
import { fontSize } from '@mui/system'
import AccordionCard from './AccordionCard'
import { checkEligibility } from '../../service/mint'

const Home = () => {
  const [nftDetail, setNftDetail] = useState([])
  const [bannerList, setBannerList] = useState([])
  const history = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [stepNum, setStepNum] = useState(1)
  const defaultQuestionList = [
    {
      title: 'What is an NFT?',
      content:
        'NFTs or non-fungible tokens, are cryptographic assets on blockchain with unique identification codes and metadata that distinguish them from each other. NFTs are unique and not mutually interchangeable, which means no two NFTs are the same.'
    },
    {
      title: 'How do I find my transaction hash?',
      content: ''
    },
    {
      title: 'What are gas fees on Axies?',
      content: ''
    },
    {
      title: 'What is the effective staking amount?',
      content: ''
    },
    {
      title: 'Customer support is available ?',
      content: ''
    }
  ]

  const [questionList, setQuestionList] = useState(defaultQuestionList)

  const platformList = [
    // {
    //   name: 'Net',
    //   icon: netIcon,
    //   url: ''
    // },
    // {
    //   name: 'Discord',
    //   icon: discordIcon,
    //   url: ''
    // },
    // {
    //   name: 'Twitter',
    //   icon: twitterIcon,
    //   url: ''
    // },
    // {
    //   name: 'Telegram',
    //   icon: telegramIcon,
    //   url: ''
    // },
    // {
    //   name: 'Note',
    //   icon: noteIcon,
    //   url: ''
    // }
  ]

  const initData = async () => {
    const bList = await getBanner()
    setBannerList(bList)
    const nftResult = await getNftDetail({
      nftCollectionId: '22222'
    })
    // console.log(nList)
    if (nftResult.website!=null){
      platformList.add({
        name: 'Net',
        icon: netIcon,
        url: nftResult.website
      })
    }
    if (nftResult.discord!=null){
      platformList.add({
        name: 'Discord',
        icon: discordIcon,
        url: nftResult.discord
      })
    }
    if (nftResult.twitter!=null){
      platformList.add({
        name: 'Twitter',
        icon: twitterIcon,
        url: nftResult.twitter
      })
    }
   if (nftResult.telegram!=null){
      platformList.add({
        name: 'Telegram',
        icon: telegramIcon,
        url: nftResult.telegram
      })
    }

    setNftDetail(nftResult)
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    initData()
    checkEligibility()
  }, [])

  const goProductDetail = () => {
    history(`/product-detail`)
  }

  // 步进器-减
  const subtractStep = () => {
    if (stepNum == '') return
    if (stepNum*1 > 1) {
      setStepNum(stepNum*1 - 1)
    }else {
      setStepNum(1)
    }
  }

  // 步进器-加
  const addStep = () => {
    if (stepNum == '') {
      setStepNum(1)
    }else {
      setStepNum(stepNum*1 + 1)
    }
  }

  // 步进器-输入不可输入非数字
  const stepInput = event => {
    let val = event.nativeEvent.target.value
    val = val.replace(/[^0-9]/g,'')
    if (val <= 0) {
      val = 1
    }
    setStepNum(val)
  }

  const FirstContent = () => {
    return (
      <>
        <div className={styles.firstContent}>
          <div className={styles.left}>
            <div className={styles.swiper}>
              <img src={dogeAvatar} alt='' />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{nftDetail.nftCollectionName}</div>
            <div className={styles.box1}>
              <div className={styles.userBox}>
                <img className={styles.userInfoIcon} src={nftDetail.nftCollectionIcon} alt='' />
                <div className={styles.userInfo}>
                  <span className={styles.userInfoTitle}>By</span>
                  <span className={styles.userInfoTeam}>{nftDetail.nftCollectionTeam}</span>
                </div>
              </div>
              <div className={styles.platformBox}>
                {platformList.map((item, index) => {
                  return (
                    <div className={styles.platformItem} key={index} onClick={() => {
                      window.open(nftDetail.url);
                    }}>
                      <img className={styles.platformIcon} src={item.icon} alt='' />
                      {/* <span className={styles.platformName}>{item.name}</span> */}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={styles.desc}>
              {nftDetail.nftCollectionDesc}
            </div>
            <div className={styles.mintProgress}>
              <div className={styles.b1} style={{width: nftDetail.minted/nftDetail.nftCollectionSupply*100 + "%"}}>{nftDetail.minted/nftDetail.nftCollectionSupply*100}% Total Minted</div>
              <div className={styles.b2}>{nftDetail.minted}/{nftDetail.nftCollectionSupply}</div>
            </div>
            <div className={styles.privateSale}>
              <div className={styles.b1}>
                <div className={styles.t1}>Private Sale ({nftDetail.nftCollectionSupply-nftDetail.minted} items remaining)</div>
                <div className={styles.t2}>{nftDetail.price} SUI | Max 2 per wallet</div>
              </div>
              <div className={styles.b2}>
                <div onClick={subtractStep} className={styles.t1}>-</div>
                <input value={stepNum} onChange={stepInput} type='text' />
                <div onClick={addStep} className={styles.t2}>+</div>
              </div>
            </div>

            <div className={styles.viewDetailBtn}>
              <img className={styles.icon} src={cartIcon} alt='' />
              <span>Mint now</span>
            </div>
          </div>
        </div>
      </>
    )
  }

  const onTabClick = (item, index) => {
    setActiveTab(index)
  }

  const onQuestionClick = (item, index) => {
    questionList[index].checked = !item.checked
    setQuestionList([...questionList])
  }

  const SencondContent = () => {
    const tabList = [
      {
        name: 'OverView',
        key: 'OverView'
      },
      {
        name: 'Roadmap',
        key: 'Roadmap'
      },
      {
        name: 'Team',
        key: 'Team'
      },
      {
        name: 'FAQ',
        key: 'FAQ'
      }
    ]

    return (
      <div className={styles.sencondContent}>
        {/* <div className={styles.box1}>
          <div className={styles.tabList}>
            {tabList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.item, activeTab === index && styles.active)}
                  onClick={() => onTabClick(item, index)}
                >
                  {item.name}
                </div>
              )
            })}
          </div>
          {activeTab === 0
            ? <div className={styles.questionList}>
              {questionList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={classNames(styles.item, activeTab === index && styles.active)}
                    onClick={() => onQuestionClick(item, index)}
                  >
                    <div className={styles.t1}>
                      <span>{item.title}</span>
                      <span>{item.checked ? '-' : '+'}</span>
                    </div>
                    {item.checked && <div className={styles.t2}>{item.content}</div>}
                  </div>
                )
              })}
            </div>
            : <div className={styles.questionList}>{nftDetail.nftCollectionRoadmap}</div>}
        </div> */}
        <div className={styles.accordionCard}>
          <AccordionCard 
            price={nftDetail.privateSalePrice} 
            detail={nftDetail.privateSaleText}
            startTime={nftDetail.privateSaleStartTime}
            endTime={nftDetail.privateSaleEndTime}
            defaultExpanded={true} 
          />
          <AccordionCard 
            price={nftDetail.airDropPrice} 
            detail={nftDetail.airDropText}
            startTime={nftDetail.airDropStartTime}
            endTime={nftDetail.airDropEndTime}
            title="Airdrop"
          />
          <AccordionCard 
            price={nftDetail.publicSalePrice}
            detail={nftDetail.publicSaleText}
            startTime={nftDetail.publicSaleStartTime}
            endTime={nftDetail.publicEndTime}
            title='Public Sale'
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        {/* <Slider data={heroSliderData} />
      <LiveAuction data={liveAuctionData} />
      <TopSeller data={topSellerData} />
      <TodayPicks data={todayPickData} />
      <PopularCollection data={popularCollectionData} />
      <Create /> */}
        <FirstContent />
        <SencondContent />
      </div>
    </div>
  )
}

export default memo(Home)
