import React, {memo, useEffect, useState} from 'react'
import styles from './index.module.scss'
import {getBanner, getNftDetail, getNftList} from 'src/service/home'
import {useNavigate,useParams} from 'react-router-dom'
import netIcon from '../../assets/img/page/product_detail/net.png'
import discordIcon from '../../assets/img/page/product_detail/discord.png'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'
import telegramIcon from '../../assets/img/page/product_detail/telegram.png'
import cartIcon from '../../assets/img/page/product_detail/cartIcon.png'
import classNames from 'classnames'
import AccordionCard from './AccordionCard'
import {useWallet} from "@suiet/wallet-kit";
import {devnetConnection, JsonRpcProvider} from "@mysten/sui.js";
import AIGCModal from 'src/components/AIGC/AIGCModal'

const Home = () => {
  const [nftDetail, setNftDetail] = useState([])
  const [bannerList, setBannerList] = useState([])
  const history = useNavigate()
  const [mintCount, setMintCount] = useState(0)
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [showResults, setShowResults] = useState(true);
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
  const params = useParams()

  const initData = async () => {
    // console.log(params) // {id: "2",name:"zora"}
    // console.log(params.address) // {id: "2",name:"zora"}
    // const bList = await getBanner()
    // setBannerList(bList)
    const nftResult = await getNftDetail({
      nftCollectionId: '0'
    })
    // console.log(nList)
    if (nftResult.website != null) {
      platformList.add({
        name: 'Net',
        icon: netIcon,
        url: nftResult.website
      })
    }
    if (nftResult.discord != null) {
      platformList.add({
        name: 'Discord',
        icon: discordIcon,
        url: nftResult.discord
      })
    }
    if (nftResult.twitter != null) {
      platformList.add({
        name: 'Twitter',
        icon: twitterIcon,
        url: nftResult.twitter
      })
    }
    if (nftResult.telegram != null) {
      platformList.add({
        name: 'Telegram',
        icon: telegramIcon,
        url: nftResult.telegram
      })
    }
    // nftResult.airDropStartTime=1779024123855
    // nftResult.airDropStartTime=1779024123855
    setNftDetail(nftResult)
    queryMintCount(nftResult)

  }

  useEffect(async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    await initData()
    // checkEligibility()
  }, [])

  const wallet = useWallet();

  const queryMintCount = async (nftResult) => {
    //project id 0xbe63d945901e09f070384b77522bdf054f69ce3c
    const provider = new JsonRpcProvider(devnetConnection);
    // get tokens from the DevNet faucet server
    // console.log(nftDetail)
    const objects = await provider.getObject(
      nftResult.nftCollectionAddress,
    );
    console.log(objects)
    const tempMintCount = objects?.details?.data?.fields?.art_sequence
    console.log('tempMintCount',tempMintCount)
    setMintCount(tempMintCount)
  }

  const mintNFT = async () => {
    await setModalText(<>
      <div>Please confirm in your wallet...</div>
    </>);
    setOpen(true)
    const balanceObjectId = await getCoin()
    if (balanceObjectId === '') {
      await setModalText(<>
        <div>token don't enough</div>
      </>);
      setOpen(true)
      return
    }
    const nowTime = Date.parse(new Date())
    if (nowTime > nftDetail.privateSaleStartTime * 1 && nowTime < nftDetail.privateSaleEndTime * 1) {
      //private sale time
      const result=await preSaleNFT(balanceObjectId)
      if (result==='success'){
        setOpen(false)
        await setModalText(<>
          <div>Congrats! You have successfully minted {stepNum} NFTs. <br/><br/>
            Your NFTs will appear in your Profile page.
          </div>
        </>);
        setOpen(true)
      }

    } else if (nowTime > nftDetail.publicSaleStartTime * 1 && nowTime < nftDetail.publicEndTime * 1) {
      //public sale time
      const result= await publicSale(balanceObjectId)
      if (result==='success') {
        setOpen(false)
        await setModalText(<>
          <div>Congrats! You have successfully minted {stepNum} NFTs. <br/><br/>
            Your NFTs will appear in your Profile page.
          </div>
        </>);
        setOpen(true)
      }
    }else if (nowTime > nftDetail.airDropStartTime * 1 && nowTime < nftDetail.airDropEndTime * 1){
      const result= airdropNFT()
      if (result==='success') {
        setOpen(false)
        await setModalText(<>
          <div>Congrats! Airdrop successfully
          </div>
        </>);
        setOpen(true)
      }
    }

  }

  const getCoin = async () => {
    //project id 0xbe63d945901e09f070384b77522bdf054f69ce3c
    const provider = new JsonRpcProvider(devnetConnection);
    // get tokens from the DevNet faucet server
    const objects = await provider.getCoins(
      wallet?.account?.address
    );
    console.log(objects.data)
    const balanceList = objects.data
    let inWhite = false
    let balanceObjectId = ''
    if (balanceList !== undefined) {
      for (let i = 0; i < balanceList.length; i++) {
        if (balanceList[i].balance > 0) {
          console.log('balanceList[i].coinObjectId',balanceList[i].coinObjectId)
          inWhite = true
          balanceObjectId = balanceList[i].coinObjectId
          break
        }
      }
    }
    if (inWhite) {
      return balanceObjectId
    } else {
      return ''
    }
  }

  const publicSale = async (balanceObjectId) => {
    console.log(111)
    try {
      const data = {
        packageObjectId: '0xb3d40059ce34de8e077251b6bb98076dab663f79',
        module: 'nft',
        function: 'public_sale',
        typeArguments: [],
        arguments: [
          balanceObjectId,
          nftDetail.nftCollectionAddress,
          stepNum+""
        ],
        gasBudget: 10000,
      };
      const resData = await wallet.signAndExecuteTransaction({
        transaction: {
          kind: 'moveCall',
          data
        }
      });
      return 'success'
    } catch (error) {
      console.log(error)
      await setModalText(<>
        <div>mint error</div>
      </>)
      setOpen(true)
      return 'error'
    }
  }

  const preSaleNFT = async (balanceObjectId) => {
    try {
    const data = {
      packageObjectId: '0xb3d40059ce34de8e077251b6bb98076dab663f79',
      module: 'nft',
      function: 'presale',
      typeArguments: [],
      arguments: [
        balanceObjectId,
        nftDetail.nftCollectionAddress,
        stepNum+""
        //todo 白名单
        // nftDetail.nftCollectionAddress
      ],
      gasBudget: 10000,
    };
    const resData = await wallet.signAndExecuteTransaction({
      transaction: {
        kind: 'moveCall',
        data
      }
    });
    return 'success'
  } catch (error) {
      console.log(error)
    await setModalText(<>
      <div>mint error</div>
    </>)
    setOpen(true)
  }
    return 'error'
  }

  const airdropNFT = async () => {
    try {
    const data = {
      packageObjectId: '0xb3d40059ce34de8e077251b6bb98076dab663f79',
      module: 'nft',
      function: 'airdrop',
      typeArguments: [],
      arguments: [
        nftDetail.nftCollectionAddress
      ],
      gasBudget: 10000,
    };
    const resData = await wallet.signAndExecuteTransaction({
      transaction: {
        kind: 'moveCall',
        data
      }
    });
    return 'success'
  } catch (error) {
      console.log(error)
    await setModalText(<>
      <div>mint error</div>
    </>)
    setOpen(true)
  }
    return 'error'
  }

  const FirstContent = () => {
    // 步进器-减
    const subtractStep = () => {
      if (stepNum == '') return
      if (stepNum * 1 > 1) {
        setStepNum(stepNum * 1 - 1)
      } else {
        setStepNum(1)
      }
    }

    // 步进器-加
    const addStep = () => {
      if (stepNum == '') {
        setStepNum(1)
      } else {
        setStepNum(stepNum * 1 + 1)
      }
    }

    // 步进器-输入不可输入非数字
    const stepInput = event => {
      let val = event.nativeEvent.target.value
      val = val.replace(/[^0-9]/g, '')
      if (val <= 0) {
        val = 1
      }
      setStepNum(val)
    }
    return (
      <>
        <div className={styles.firstContent}>
          <div className={styles.left}>
            <div className={styles.swiper}>
              <img src={nftDetail.cover} alt=''/>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{nftDetail.nftCollectionName}</div>
            <div className={styles.box1}>
              <div className={styles.userBox}>
                <img className={styles.userInfoIcon} src={nftDetail.nftCollectionIcon} alt=''/>
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
                      <img className={styles.platformIcon} src={item.icon} alt=''/>
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
              <div className={styles.b1} style={{width: mintCount / nftDetail.nftCollectionSupply * 100 + "%"}}>
                <span>{mintCount / nftDetail.nftCollectionSupply * 100}% Total Minted</span>
              </div>
              <div className={styles.b2}>{mintCount}/{nftDetail.nftCollectionSupply}</div>
            </div>
            <div className={styles.privateSale}>
              <div className={styles.b1}>
                <div className={styles.t1}>Private Sale ({nftDetail.nftCollectionSupply - mintCount} items remaining)</div>
                <div className={styles.t2}>{nftDetail.price} SUI | Max 2 per wallet</div>
              </div>
              <div className={styles.b2}>
                <div onClick={subtractStep} className={styles.t1}>-</div>
                <input value={stepNum} onChange={stepInput} type='text'/>
                <div onClick={addStep} className={styles.t2}>+</div>
              </div>
            </div>

            <div className={styles.viewDetailBtn} onClick={mintNFT}>
              <img className={styles.icon} src={cartIcon} alt=''/>
              <span>Mint now</span>
            </div>
          </div>
          <AIGCModal setOpen={setOpen} text={modalText} open={open} showResults={showResults}/>

        </div>
      </>
    )
  }


  const SencondContent = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [questionList, setQuestionList] = useState(defaultQuestionList)
    const onTabClick = (item, index) => {
      setActiveTab(index)
    }
    const onQuestionClick = (item, index) => {
      questionList[index].checked = !item.checked
      setQuestionList([...questionList])
    }
    const tabList = [
      // {
      //   name: 'OverView',
      //   key: 'OverView'
      // },
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
        <div className={styles.box1}>
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
          {tabList[activeTab].key === 'OverView'
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
            : <div className={styles.questionList}>{tabList[activeTab].key === 'Roadmap' ? nftDetail.nftCollectionRoadmap : tabList[activeTab].key === 'Team' ? nftDetail.team : nftDetail.faq}</div>}
        </div>
        <div className={styles.accordionCard}>
          <AccordionCard
            price={nftDetail.privateSalePrice}
            detail={nftDetail.privateSaleText}
            startTime={nftDetail.privateSaleStartTime}
            endTime={nftDetail.privateSaleEndTime}
            defaultExpanded={true}
            contractAddress={nftDetail.nftCollectionAddress}
          />
          <AccordionCard
            price={nftDetail.airDropPrice}
            detail={nftDetail.airDropText}
            startTime={nftDetail.airDropStartTime}
            endTime={nftDetail.airDropEndTime}
            title="Airdrop"
            contractAddress={nftDetail.nftCollectionAddress}
          />
          <AccordionCard
            price={nftDetail.publicSalePrice}
            detail={nftDetail.publicSaleText}
            startTime={nftDetail.publicSaleStartTime}
            endTime={nftDetail.publicEndTime}
            title='Public Sale'
            contractAddress={nftDetail.nftCollectionAddress}
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
        <FirstContent/>
        <SencondContent/>
      </div>
    </div>
  )
}

export default memo(Home)
