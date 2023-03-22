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
import InfoDisplay from './InfoDisplay'
import MyCountdown from "../ProductDetail/MyCountdown";

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

  const goProductDetail = (id) => {
    if (id==="0"){
      history('/suicasso')
    }else {
      history(`/product-detail/${id}`)
    }
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
                onClick={()=>{goProductDetail(item.nftCollectionId)}}
              >
                <div className={styles.item} key={index}>
                  <div className={styles.endTime}>
                    <MyCountdown
                      activeString=""
                    start={Number(item.publicSaleStartTime)}
                    end={Number(item.publicEndTime)}
                  /></div>
                  <div className={styles.descImg}>
                    <img style={{'borderRadius': '7px'}} className={styles.img} src={item.nftCollectionFeature} alt='' />
                    <div className={styles.tagList}>
                      {
                        item.tag.split(",").map((item , index) => (
                          <div className={styles.tag}>{item}</div>
                        ))
                      }
                    </div>
                  </div>
                  <div className={styles.createInfo}>
                    <div style={{'marginBottom':'6px'}}>
                    <span className={styles.symbol}>{item.nftCollectionName}</span>
                    </div>
                    <span className={styles.user}>by {item.nftCollectionTeam}</span>
                  </div>
                  <div className={styles.operateBox}>
                    <div className={styles.priceInfo}>
                      <p className={styles.label}>Item</p>
                      <p className={styles.value}>{item.totalSupply}</p>
                    </div>
                    <div className={styles.priceInfo}>
                      <p className={styles.label}>Price</p>
                      <p className={styles.value}>{item.publicSalePrice}</p>
                    </div>
                    <div className={styles.mintBtn} onClick={()=>{goProductDetail(item.nftCollectionId)}}>
                      <span className={styles.text}>Mint</span>
                      <img style={{"marginLeft": '0px'}} src={chevron_right} alt='' />
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
        {/* <div className={styles.filter}>
          <div className={styles.tagsBox}>
            <img className={styles.icon} src={categoryIcon} alt='' />
            <span>Tags: Game Fi, PFP</span>
          </div>
          <div className={styles.sortBox}>
            <img className={styles.icon} src={sortIcon} alt='' />
            <span>Sort By: Recently Added</span>
          </div>
        </div> */}

        <div className={styles.list}>
          {upcomingNftList.map((item, index) => {
            return (
              <Box
                sx={{
                  cursor: 'pointer',
                  // marginRight: '80px',
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
                onClick={()=>{goProductDetail(item.nftCollectionId)}}
              >
              <div className={styles.item} key={index}>
                <div className={styles.endTime}>{item.nftCollectionSaveLine}</div>
                <div className={styles.descImg}>
                  <img style={{'borderRadius': '7px'}}  className={styles.img} src={item.nftCollectionFeature} alt='' />
                  <div className={styles.tagList}>
                    {
                      item.tag.split(",").map((item , index) => (
                        <div className={styles.tag}>{item}</div>
                      ))
                    }
                  </div>
                </div>
                <div className={styles.createInfo}>
                  <div style={{'marginBottom':'6px'}}>
                  <span className={styles.symbol}>{item.nftCollectionName}</span>
                  </div>
                  <span className={styles.user}>by {item.nftCollectionTeam}</span>
                </div>
                <div className={styles.operateBox}>
                  <div className={styles.priceInfo}>
                    <p className={styles.label}>Item</p>
                    <p className={styles.value}>{item.totalSupply}</p>
                  </div>
                  <div className={styles.priceInfo}>
                    <p className={styles.label}>Price</p>
                    <p className={styles.value}>{item.publicSalePrice}</p>
                  </div>
                  <div className={styles.mintBtn} onClick={()=>{goProductDetail(item.nftCollectionId)}}>
                    <span className={styles.text}>More</span>
                    <img style={{"marginLeft": '0px'}} src={chevron_right} alt='' />
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
        {/* <div className={styles.filter}>
          <div className={styles.tagsBox}>
            <img className={styles.icon} src={categoryIcon} alt='' />
            <span>Tags: Game Fi, PFP</span>
          </div>
          <div className={styles.sortBox}>
            <img className={styles.icon} src={sortIcon} alt='' />
            <span>Sort By: Recently Added</span>
          </div>
        </div> */}

        <div className={styles.list}>
          {endNftList.map((item, index) => {
            return (
              <Box
                sx={{
                  cursor: 'pointer',
                  // marginRight: '80px',
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
                onClick={()=>{goProductDetail(item.nftCollectionId)}}
              >
              <div className={styles.item} key={index}>
                <div className={styles.endTime}>{item.nftCollectionSaveLine}</div>
                <div className={styles.descImg}>
                  <img style={{'borderRadius': '7px'}}  className={styles.img} src={item.nftCollectionFeature} alt='' />
                  <div className={styles.tagList}>
                    {
                      item.tag.split(",").map((item , index) => (
                        <div className={styles.tag}>{item}</div>
                      ))
                    }
                  </div>
                </div>
                <div className={styles.createInfo}>
                  <div style={{'marginBottom':'6px'}}>
                  <span className={styles.symbol}>{item.nftCollectionName}</span>
                  </div>
                  <span className={styles.user}>by {item.nftCollectionTeam}</span>
                </div>
                <div className={styles.operateBox}>
                  <div className={styles.priceInfo}>
                    <p className={styles.label}>Item</p>
                    <p className={styles.value}>{item.totalSupply}</p>
                  </div>
                  <div className={styles.priceInfo}>
                    <p className={styles.label}>Price</p>
                    <p className={styles.value}>{item.publicSalePrice}</p>
                  </div>
                  <div className={styles.mintBtn} onClick={()=>{goProductDetail(item.nftCollectionId)}}>
                    <span className={styles.text}>More</span>
                    <img style={{"marginLeft": '0px'}} src={chevron_right} alt='' />
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
          <InfoDisplay />
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
