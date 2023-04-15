
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
    history(`/product-detail/5`)
    // setActiveIndex(index)
  }

  return (
    <>
      <div className={styles.firstContent}>
        <div className={styles.left}>
          <div>
            <div className={styles.title}>SuiGals:Genesis</div>

            <div className={styles.userBox}>
              <img className={styles.userInfoIcon} src="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOTHF7SDF-dGMq5VWA11HZ9BcSAO_VOlFbTfI5mQEXi-ynvEy8dfb0ZUOcMtvXhKct8Q4fvIjATut8b3Cx94V8-CI5lB=w4112-h2178" alt=''/>
              <div className={styles.userInfo}>
                <span className={styles.userInfoTitle}>By</span>
                <span className={styles.userInfoTeam}>SUIGALS team</span>
              </div>
            </div>
            {/*<div className={styles.hotInfo}>Unlimited | Free Mint | Ends on 5th Apr 2023</div>*/}
            <div className={styles.desc}>
              Sui-Native Virtual Idols NFT <br/><br/> Introducing "SUIGALS" a groundbreaking ###Virtual Idol NFT### series, set to become the Metaverse Ambassadors of the Sui network.<br/><br/>As the era of Artificial General Intelligence (AGI) dawns, virtual humans will undergo a transformative shift.<br/><br/>SUIGALS will embark on their metaverse careers, releasing music videos, live streaming, and performing concerts. SUIGALS will also appear in various capacities across social media, gaming, and other metaverse projects.<br/><br/> <br/>Owning a SUIGALS NFT is akin to investing in a metaverse talent management company, allowing users to participate, invest, and co-develop the virtual idols' ownership. <br/><br/>NFT Holders will enjoy voting rights, casting their vision in a DAO-voting for creative and career development decisions, sharing in the revenue generated by NFTs and intellectual property, and experiencing the operation of a top-tier entertainment company like SM Entertainment in the web3 world.
            </div>
          </div>

          <div className={styles.viewDetailBtn} onClick={()=>{goSuicasso(0)}}>
            <span>View Details</span>
            <img className={styles.rightArrow} src={rightArrow} alt='' />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.swiper}>
            <img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOTHF7SDF-dGMq5VWA11HZ9BcSAO_VOlFbTfI5mQEXi-ynvEy8dfb0ZUOcMtvXhKct8Q4fvIjATut8b3Cx94V8-CI5lB=w4112-h2178" alt='' />
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
