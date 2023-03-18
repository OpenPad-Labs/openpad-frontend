
import styles from './index.module.scss'
import userInfoIcon from '../../assets/img/page/home/userInfo.png'
import rightArrow from '../../assets/img/page/home/rightArrow.png'
import dogeAvatar from '../../assets/img/page/home/suibear.webp'
import { useNavigate } from 'react-router-dom'
const InfoDisplay = () => {
  const history = useNavigate()
  const goProductDetail = (id) => {
    history(`/product-detail/${id}`)
  }

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
          <div className={styles.viewDetailBtn} onClick={()=>{
            goProductDetail(0)
          }}>
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

export default InfoDisplay