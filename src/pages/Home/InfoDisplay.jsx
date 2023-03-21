
import styles from './index.module.scss'
import userInfoIcon from '../../assets/img/page/home/userInfo.png'
import rightArrow from '../../assets/img/page/home/rightArrow.png'
import dogeAvatar from '../../assets/img/page/home/suibear.webp'
import { useNavigate } from 'react-router-dom'
import MaskGroup from '../../assets/img/page/aigc/MaskGroup.svg'
import zijiLogo from '../../assets/img/logo/Big.svg'
const InfoDisplay = () => {
  const history = useNavigate()
  const goProductDetail = (id) => {
    history(`/product-detail/${id}`)
  }
  const goSuicasso = () => {
    history('/suicasso')
    // setActiveIndex(index)
  }

  return (
    <>
      <div className={styles.firstContent}>
        <div className={styles.left}>
          <div>
            <div className={styles.title}>Suicasso</div>

            <div className={styles.userBox}>
              <img className={styles.userInfoIcon} src={zijiLogo} alt=''/>
              <div className={styles.userInfo}>
                <span className={styles.userInfoTitle}>By</span>
                <span className={styles.userInfoTeam}>Maxi Labs</span>
              </div>
            </div>
            <div className={styles.hotInfo}>Unlimited | Free Mint | Ends on 5th Apr 2023</div>
            <div className={styles.desc}>
              Suicasso is the first AIGC NFT on SUI. With a text prompt and a picture (optional), you can generate a unique artwork and mint it
            </div>
          </div>

          <div className={styles.viewDetailBtn} onClick={()=>{goSuicasso(0)}}>
            <span>View Details</span>
            <img className={styles.rightArrow} src={rightArrow} alt='' />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.swiper}>
            <img src={MaskGroup} alt='' />
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
