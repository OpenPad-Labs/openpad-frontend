import {memo, useEffect, useState} from 'react'
import styles from './index.module.scss'
import {useNavigate,useParams} from 'react-router-dom'
import {useWallet} from "@suiet/wallet-kit";
import {getBanner, getNftDetail, getNftList} from 'src/service/home'
import netIcon from '../../assets/img/page/product_detail/net.png'
import discordIcon from '../../assets/img/page/product_detail/discord.png'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'
import telegramIcon from '../../assets/img/page/product_detail/telegram.png'
import cartIcon from '../../assets/img/page/product_detail/cartIcon.png'
import {devnetConnection, JsonRpcProvider} from "@mysten/sui.js";
import AIGCModal from 'src/components/AIGC/AIGCModal'

let platformList = []


const ProductInfo = ({setNftDetail,nftDetail}) => {
  const params = useParams()
  const wallet = useWallet();
  const [bannerList, setBannerList] = useState([])
  const history = useNavigate()
  const [mintCount, setMintCount] = useState(0)
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [showResults, setShowResults] = useState(true);
  const [stepNum, setStepNum] = useState(1)
  const [preLimit, setPreLimit] = useState(1)

  const queryMintCount = async (nftResult) => {
    //project id 0xbe63d945901e09f070384b77522bdf054f69ce3c
    // devnetConnection.fullnode='https://wallet-rpc.devnet.sui.io:443'
    const provider = new JsonRpcProvider(devnetConnection);
    // get tokens from the DevNet faucet server
    // console.log(nftDetail)
    const objects = await provider.getObject(
      nftResult.nftCollectionAddress,
    );
    // console.log('objects===',objects)
    const tempMintCount = objects?.details?.data?.fields?.art_sequence
    // console.log('tempMintCount',tempMintCount)
    setMintCount(tempMintCount)
    // setMintCount(140)
    //查看mint上限
    // const preList=objects?.details?.data?.fields?.whitelist?.fields?.contents
    // for (const item of preList) {
    //   const listAddress=item?.fields?.key
    //   if (listAddress===wallet?.account?.address){
    //     setPreLimit(item?.fields?.value?.fields?.num)
    //     break
    //   }
    // }
  }

  const initData = async () => {
    // console.log(params.address) // {id: "2",name:"zora"}
    // console.log(params.address) // {id: "2",name:"zora"}
    // const bList = await getBanner()
    // setBannerList(bList)
    const nftResult = await getNftDetail({
      nftCollectionId: params.address
    })
    // console.log(nList)
    platformList=[]
    if (nftResult.website != null) {
      platformList.push({
        name: 'Net',
        icon: netIcon,
        url: nftResult.website
      })
    }
    if (nftResult.discord != null) {
      platformList.push({
        name: 'Discord',
        icon: discordIcon,
        url: nftResult.discord
      })
    }
    if (nftResult.twitter != null) {
      platformList.push({
        name: 'Twitter',
        icon: twitterIcon,
        url: nftResult.twitter
      })
    }
    if (nftResult.telegram != null) {
      platformList.push({
        name: 'Telegram',
        icon: telegramIcon,
        url: nftResult.telegram
      })
    }

    Date.parse(new Date())>nftResult.publicSaleStartTime? setPreLimit(nftResult.publicSaleUserMaxMintNum):
      Date.parse(new Date())>nftResult.privateSaleStartTime?setPreLimit(nftResult.privateSaleUserMaxMintNum):
        setPreLimit(nftResult.airDropUserMaxMintNum)

    // nftResult.airDropStartTime=1647873240000
    // nftResult.airDropEndTime=1647873240000
    // nftResult.privateSaleEndTime=1647873240000
    // nftResult.privateSaleStartTime=1647873240000
    // nftResult.publicSaleStartTime=1647873240000
    // nftResult.publicEndTime=1647873240000
    // console.log(nftResult)
    setNftDetail(nftResult)
    queryMintCount(nftResult)

  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    initData()
    // checkEligibility()
  }, [wallet?.account?.address])

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
      // val = 1
    }
    if (Number(val) >= Number(preLimit)) {
      val = preLimit
    }
    setStepNum(val)
  }

  const mintNFT = async () => {
    if (nftDetail.status!=='minting'){
      return
    }
    if (!wallet.connected) {
      await setModalText('Please connect wallet');
      setShowResults(true)
      setOpen(true)
      return
    }
    try {
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
        queryMintCount(nftDetail)
        setOpen(false)
        await setModalText(<>
          <div>Congrats! You have successfully minted {stepNum} NFTs. <br/><br/>
            Your NFTs will appear in your Profile page.
          </div>
        </>);
        setOpen(true)
      }else {
        await setModalText(<>
          <div>mint error</div>
        </>)
        setOpen(true)
      }

    } else if (nowTime > nftDetail.publicSaleStartTime * 1 && nowTime < nftDetail.publicEndTime * 1) {
      //public sale time
      const result= await publicSale(balanceObjectId)
      if (result==='success') {
        queryMintCount(nftDetail)
        setOpen(false)
        await setModalText(<>
          <div>Congrats! You have successfully minted {stepNum} NFTs. <br/><br/>
            Your NFTs will appear in your Profile page.
          </div>
        </>);
        setOpen(true)
      }else {
        await setModalText(<>
          <div>mint error</div>
        </>)
        setOpen(true)
      }
    }else if (nowTime > nftDetail.airDropStartTime * 1 && nowTime < nftDetail.airDropEndTime * 1){
      const result= await airdropNFT()
      if (result==='success') {
        setOpen(false)
        await setModalText(<>
          <div>Congrats! Airdrop successfully
          </div>
        </>);
        setOpen(true)
      }else {
        await setModalText(<>
          <div>mint error</div>
        </>)
        setOpen(true)
      }
    }
    } catch (error) {
      console.log(error)
      await setModalText(<>
        <div>mint error</div>
      </>)
      setOpen(true)
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
    try {
      const data = {
        packageObjectId: '0x53c25b893a8c722194a376b433c68758f787022d',
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
      if (resData?.effects?.status?.status==='success'){
        return 'success'
      }else {
        return 'error'
      }
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
      packageObjectId: '0x53c25b893a8c722194a376b433c68758f787022d',
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
      console.log('data', data)
    const resData = await wallet.signAndExecuteTransaction({
      transaction: {
        kind: 'moveCall',
        data
      }
    });
      console.log('contract resData',resData)
      console.log('contract resData.effects.status',resData.effects.status.status)
      if (resData?.effects?.status?.status==='success'){
        return 'success'
      }else {
        return 'error'
      }
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
      packageObjectId: '0x53c25b893a8c722194a376b433c68758f787022d',
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
    console.log('resData airdrop', resData)
      if (resData?.effects?.status?.status==='success'){
        return 'success'
      }else {
        return 'error'
      }
  } catch (error) {
      console.log(error)
    await setModalText(<>
      <div>mint error</div>
    </>)
    setOpen(true)
  }
    return 'error'
  }
  return (
    <>
      <div className={styles.firstContent}>
        <div className={styles.left}>
          <div className={styles.swiper}>
            <img src={nftDetail.nftCollectionCover} alt=''/>
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

            <div className={styles.b1} style={{width:(mintCount / nftDetail.totalSupply * 100)+'%'}}>
              <span style={{'whiteSpace':"nowrap"}}>
                {Math.round(mintCount / nftDetail.totalSupply*10000)/100 +'% Total Minted'}
              </span>
            </div>
            <div className={styles.b2}>
              {
                mintCount+'/'+nftDetail.totalSupply
              }
            </div>
          </div>

          {
            nftDetail.status==='minting'?
            <div className={styles.privateSale}>
              <div className={styles.b1}>
                <div className={styles.t1}>
                  {
                    Date.parse(new Date()) > nftDetail.publicSaleStartTime ? 'Public Sale (' + (nftDetail.publicSaleTotalSupply - mintCount) + ' items remaining)' :
                      Date.parse(new Date()) > nftDetail.privateSaleStartTime ? 'Private Sale (' + (nftDetail.privateSaleTotalSupply - mintCount) + ' items remaining)' :
                        'Airdrop (' + (nftDetail.airDropTotalSupply - mintCount) + ' items remaining)'
                  }
                </div>
                <div className={styles.t2}>{
                  Date.parse(new Date()) > nftDetail.publicSaleStartTime ? nftDetail.publicSalePrice + ' SUI | Max ' + nftDetail.publicSaleUserMaxMintNum + ' per wallet' :
                    Date.parse(new Date()) > nftDetail.privateSaleStartTime ? nftDetail.privateSalePrice + ' SUI | Max ' + nftDetail.privateSaleUserMaxMintNum + ' per wallet' :
                      'Free | Max ' + nftDetail.airDropUserMaxMintNum + ' per wallet'
                }</div>
              </div>
              <div className={styles.b2}>
                <div onClick={subtractStep} className={styles.t1}>-</div>
                <input value={stepNum} onChange={stepInput} type='text'/>
                <div onClick={addStep} className={styles.t2}>+</div>
              </div>
            </div>:null
          }

          <div className={nftDetail.status==='minting'?styles.viewDetailBtn:styles.viewDetailBtn2} onClick={mintNFT}>
            <img className={styles.icon} src={cartIcon} alt=''/>
            <span>{nftDetail.status==='ended'?'Mint ended':'Mint now'}</span>
          </div>
        </div>
        <AIGCModal setOpen={setOpen} text={modalText} open={open} showResults={showResults}/>

      </div>
    </>
  )
}

export default ProductInfo
