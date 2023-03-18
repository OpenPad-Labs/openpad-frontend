import React, {memo, useEffect, useState} from 'react'
import styles from './index.module.scss'
import ActivityList from './ActivityList'
import ProductInfo from './ProductInfo'
const Home = () => {
  const [nftDetail, setNftDetail] = useState([])

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        {/* <Slider data={heroSliderData} />
      <LiveAuction data={liveAuctionData} />
      <TopSeller data={topSellerData} />
      <TodayPicks data={todayPickData} />
      <PopularCollection data={popularCollectionData} />
      <Create /> */}
        <ProductInfo nftDetail={nftDetail} setNftDetail={setNftDetail}/>
        <ActivityList nftDetail={nftDetail}/>
      </div>
    </div>
  )
}

export default memo(Home)
