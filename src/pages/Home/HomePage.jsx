import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header/Header'
import Footer from '../../components/footer/Footer'
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
import Slider from 'react-slick';
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [mintingNftList, setMintingNftList] = useState([])
  const [upcomingNftList, setUpcomingNftList] = useState([])
  const [endNftList, setEndNftList] = useState([])
  const [bannerList, setBannerList] = useState([])
  const history = useNavigate()

  const initData = async () => {
    const bList = await getBanner()
    setBannerList(bList)
    const nList = await getNftList({
      pageIndex: 0,
      pageSize: 12,
      status: 'minting'
    })
    setMintingNftList(nList?.maxiNftCollectionList)
    const upcomingList = await getNftList({
      pageIndex: 0,
      pageSize: 12,
      status: 'upcoming'
    })
    setUpcomingNftList(upcomingList?.maxiNftCollectionList)
    const endedList = await getNftList({
      pageIndex: 0,
      pageSize: 12,
      status: 'ended'
    })
    setEndNftList(endedList?.maxiNftCollectionList)
  }

  useEffect(() => {
    initData()
  }, [])

  const goProductDetail = id => {
    history(`/product-detail`)
  }

  const FirstContent = () => {
    return (
      <>
        <div className={styles.firstContent}>
          <div className={styles.left}>
            <div className={styles.title}>Sui Bears</div>
            <img className={styles.userInfoIcon} src={userInfoIcon} alt='' />
            <div className={styles.hotInfo}>1000 items | 1 SUI | Date: TBA</div>
            <div className={styles.desc}>
              A limited NFT collection featuring a richly diverse and unique pool of re-drawn traits
              from the original Okay Bears collection. What's more, each Sui Bear grants you access
              to our metaverse - an open-world environment full of economic opportunity and fun
              group endeavours. Get your entry onto our Bear World by securing a Sui Bear.
            </div>
            <div className={styles.viewDetailBtn} onClick={goProductDetail}>
              <span>View Details</span>
              <img className={styles.rightArrow} src={rightArrow} alt='' />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.swiper}>
              <img src={dogeAvatar} alt='' />
            </div>
          </div>
          {/* <Slider
            // ref={sliderRef}
            // customPaging={(i) => previewList(i)}
            dots
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            dotsClass="slick-dots slick-thumb"
          >
            {bannerList?.map((item) => (
              <Box
                src={item.imageUrl}
                alt={item.title}
                key={item.id}
                loading="lazy"
                component="img"
                className={styles.right}
                sx={{
                  width: 100,
                  height: 100
                }}
              />
            ))}
          </Slider> */}
        </div>

        <div className={styles.mintNowList}></div>
      </>
    )
  }

  const MintNowList = () => {
    return (
      <div className={styles.mintNowList}>
        <div className={styles.title}>Minting now</div>
        <div
          className={styles.list}
        >
          {mintingNftList?.map((item, index) => {
            return (
              <Box
                sx={{
                  cursor: 'pointer',
                  marginRight: '80px',
                  '&:nth-child(4n)': {
                    marginRight: '0 ',
                  },
                  "&:hover": {
                    transform: 'scale(1.04)'
                  },
                  '@media (max-width:750px)': {
                    marginRight: '0',
                    '&:nth-child(4n)': {
                      marginRight: '0',
                    }
                  }
                }}
                onClick={goProductDetail}
              >
                <div className={styles.item} key={index}>
                  <div className={styles.endTime}>Ends in 01d 08h 08m 23s</div>
                  <div className={styles.descImg}>
                    <img className={styles.img} src={item.imageUrl} alt='' />
                    <div className={styles.tagList}>
                      <div className={styles.tag}>Game Pass</div>
                      <div className={styles.tag}>PFP</div>
                    </div>
                  </div>
                  <div className={styles.createInfo}>
                    <span className={styles.symbol}>SuiApe</span>
                    <span className={styles.user}>By Puke2Earn Labs</span>
                  </div>
                  <div className={styles.operateBox}>
                    <div className={styles.priceInfo}>
                      <p className={styles.label}>Item</p>
                      <p className={styles.value}>{item.nftCollectionId}</p>
                    </div>
                    <div className={styles.priceInfo}>
                      <p className={styles.label}>Price</p>
                      <p className={styles.value}>Free</p>
                    </div>
                    <div className={styles.mintBtn} onClick={goProductDetail}>
                      <span className={styles.text}>mint</span>
                      <img src={chevron_right} alt='' />
                    </div>
                  </div>
                </div>
              </Box>
            )
          })}
        </div>
        <Pagination />
      </div>
    )
  }

  const UnComingList = () => {
    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const [tagList, setTagList] = useState([
      {
        name: 'Game Fi'
      },
      {
        name: 'PFP'
      }
    ])
    return (
      <div className={styles.unComingList}>
        <div className={styles.title}>Upcoming ({upcomingNftList.length || 0})</div>
        <div className={styles.filter}>
          <div className={styles.tagsBox}>
            <img className={styles.icon} src={categoryIcon} alt='' />
            <span>Tags: Game Fi, PFP</span>
          </div>
          <div className={styles.sortBox}>
            <img className={styles.icon} src={sortIcon} alt='' />
            <span>Sort By: Recently Added</span>
          </div>
        </div>

        <div className={styles.list}>
          {upcomingNftList.map((item, index) => {
            return (
              <div className={styles.item} key={index}>
                <div className={styles.endTime}>18 Aug 2023</div>
                <div className={styles.descImg}>
                  <img className={styles.img} src={listItemDemo} alt='' />
                  <div className={styles.tagList}>
                    <div className={styles.tag}>Game Pass</div>
                    <div className={styles.tag}>PFP</div>
                  </div>
                </div>
                <div className={styles.createInfo}>
                  <span className={styles.symbol}>SuiApe</span>
                  <span className={styles.user}>By Puke2Earn Labs</span>
                </div>
                <div className={styles.operateBox}>
                  <div className={styles.priceInfo}>
                    <p className={styles.label}>Item</p>
                    <p className={styles.value}>1000</p>
                  </div>
                  <div className={styles.priceInfo}>
                    <p className={styles.label}>Price</p>
                    <p className={styles.value}>Free</p>
                  </div>
                  <div className={styles.mintBtn} onClick={goProductDetail}>
                    <span className={styles.text}>mint</span>
                    <img src={chevron_right} alt='' />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Pagination />
      </div>
    )
  }

  const EndList = () => {
    const [list, setList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const [tagList, setTagList] = useState([
      {
        name: 'Game Fi'
      },
      {
        name: 'PFP'
      }
    ])
    return (
      <div className={styles.unComingList}>
        <div className={styles.title}>Ended ({endNftList.length || 0})</div>
        <div className={styles.filter}>
          <div className={styles.tagsBox}>
            <img className={styles.icon} src={categoryIcon} alt='' />
            <span>Tags: Game Fi, PFP</span>
          </div>
          <div className={styles.sortBox}>
            <img className={styles.icon} src={sortIcon} alt='' />
            <span>Sort By: Recently Added</span>
          </div>
        </div>

        <div className={styles.list}>
          {endNftList.map((item, index) => {
            return (
              <div className={styles.item} key={index}>
                <div className={styles.endTime}>18 Aug 2023</div>
                <div className={styles.descImg}>
                  <img className={styles.img} src={listItemDemo} alt='' />
                  <div className={styles.tagList}>
                    <div className={styles.tag}>Game Pass</div>
                    <div className={styles.tag}>PFP</div>
                  </div>
                </div>
                <div className={styles.createInfo}>
                  <span className={styles.symbol}>SuiApe</span>
                  <span className={styles.user}>By Puke2Earn Labs</span>
                </div>
                <div className={styles.operateBox}>
                  <div className={styles.priceInfo}>
                    <p className={styles.label}>Item</p>
                    <p className={styles.value}>1000</p>
                  </div>
                  <div className={styles.priceInfo}>
                    <p className={styles.label}>Price</p>
                    <p className={styles.value}>Free</p>
                  </div>
                  <div className={styles.mintBtn} onClick={goProductDetail}>
                    <span className={styles.text}>mint</span>
                    <img src={chevron_right} alt='' />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Pagination />
      </div>
    )
  }
  return (
    <>
      {/* <Header /> */}
      <div className={styles.home}>
        <div className={styles.container}>
          {/* <Slider data={heroSliderData} />
      <LiveAuction data={liveAuctionData} />
      <TopSeller data={topSellerData} />
      <TodayPicks data={todayPickData} />
      <PopularCollection data={popularCollectionData} />
      <Create /> */}
          <FirstContent />
          <MintNowList />
          <UnComingList />
          <EndList />
        </div>

      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Home
