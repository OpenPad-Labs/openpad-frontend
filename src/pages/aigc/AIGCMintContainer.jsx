import styles from './index.module.scss'
import React, {useState, useEffect} from 'react'
import userInfoIcon from '../../assets/img/page/aigc/InfoUser.svg'
import weijiazai from '../../assets/img/page/home/weijiazai.png'
import image8 from '../../assets/img/page/aigc/image8.png'
import image9 from '../../assets/img/page/aigc/image9.png'
import image10 from '../../assets/img/page/aigc/image10.png'
import image11 from '../../assets/img/page/aigc/image11.png'
import MaskGroup from '../../assets/img/page/aigc/MaskGroup.svg'
import {Box, TextField, Button, Typography, ImageList, ImageListItem, Checkbox} from '@mui/material'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import UploadImageComp from 'src/components/AIGC/UploadImageComp'
import vector from '../../assets/img/page/aigc/Vector.svg'
import {consumePoint, genaigc, genaigcByPic, getPoint} from "../../service/aigcMint";
// import {ConnectWallet} from "../../web3/useMetaConnect";
import {SuietWallet, useWallet,useAccountBalance} from '@suiet/wallet-kit';
import {upload, DataURIToBlob, uploadToNFTStorage} from "../../web3/ipfs";
import CircularProgress from '@mui/material/CircularProgress';
import AIGCSuccessModal from 'src/components/AIGC/AIGCSuccessModal'
import AIGCModal from "../../components/AIGC/AIGCModal";
import {JsonRpcProvider, devnetConnection} from '@mysten/sui.js';
import AccordionCard from "src/components/accordionCard/AccordionCard";

const platformList = [
  {
    name: 'Twitter',
    icon: twitterIcon,
    url: ''
  }
]


const BannerComp = () => {
  return (
    <div className={styles.left}>
      <div className={styles.swiper}>
        <img className={styles.image8} src={MaskGroup} alt=''/>
        {/*<img className={styles.image9} src={image9} alt=''/>*/}
        {/*<img className={styles.image10} src={image10} alt=''/>*/}
        {/*<img className={styles.image11} src={image11} alt=''/>*/}
      </div>
    </div>
  )
}

const ImageCardBox = ({formik, aiImgList,genLoading}) => {
  // console.log("aiImgList", aiImgList)
  return (
    <Box sx={{ position: 'relative' }}>
    <ImageList
      className={styles.example}
      sx={{width: 600,
      height: 600
    }} cols={2} rowHeight={290}>
      {aiImgList.map((item) => (
        <ImageListItem
          key={item.seed}
          sx={{
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={() => {
            formik.setFieldValue('checked', item)
          }}
        >
          <div className={styles.aiBox}>
            <img className={item.seed <= 4 ? styles.weijiazai : null}
                 src={item.pic}
                 loading="lazy"
            />
          </div>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0
            }}
          >
            <Checkbox
              checked={formik.values?.checked === item}
              sx={{
                '& .MuiSvgIcon-root': {fontSize: 40}
              }}
              icon={<RadioButtonUncheckedIcon/>}
              checkedIcon={<RadioButtonCheckedIcon/>}
            />
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
      {genLoading
        ? (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 600,
              height: 600,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress sx={{
              width: '100px !important',
              height: '100px !important',
              color:'white'
            }}/>
          </Box>
        )
        : null}
    </Box>
  )
}

const ImageSelectComp = ({formik, aiImgList,genLoading}) => {
  return (
    <>
      <Typography variant="body2" sx={{my: 2, fontSize: '16px'}}>
        Results:
      </Typography>
      <div id='aiResult'></div>

      <ImageCardBox formik={formik} aiImgList={aiImgList} genLoading={genLoading}>

      </ImageCardBox>
      <div className={styles.tapYourFavorite}>
        Tap your favorite image and mint.
      </div>
    </>
  )
}


const TextInputComp = ({formik}) => {
  return (
    <>
      <div className={styles.step1}>
        1. Describe your art
      </div>
      <div className={styles.step1Desc}>
        Describe your desired image with English. <br/>
        Examples: <br/>
        a person as apex legends character, digital illustration portrait design, by android jones <br/> and greg rutkowski, retrowave color scheme, detailed, cinematic lighting, wide angle <br/> action dynamic portrait
      </div>
      <TextField
        className='text-area'
        name='text'
        error={Boolean(formik.touched.text && formik.errors.text)}
        helperText={Boolean(formik.touched.text) && formik.errors.text}
        fullWidth
        multiline
        // rows={4}
        value={formik.values.text}
        onChange={(e) => {
          formik.setFieldValue('text', e.target.value);
        }}
        type='text'
        placeholder="e.g. A master piece of a person in cyberpunk style."
        sx={{
          '.MuiInputBase-root': {
            fontFamily: 'Montserrat',
          color: '#C4C4C4 !important',
            border: '1px solid #C4C4C4'
          },
          my: 2,
          textarea: {
            border: 'none',
            lineHeight: '26px',
            fontSize: '16px'
          }
        }}
      />
    </>
  )
}

const InfoComp = () => {
  return (
    <>
      <div className={styles.title}>Suicasso AIGC Pilot Collection</div>
      <div className={styles.box1}>
        <img className={styles.userInfoIcon} src={userInfoIcon} alt=''/>
        <div className={styles.platformBox}>
          {platformList.map((item, index) => {
            return (
              <div className={styles.platformItem} key={index}>
                <img className={styles.platformIcon} src={item.icon} alt='' onClick={() => {
                  window.open("https://twitter.com/Maxi_sui");
                }}/>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.desc}>
        Suicasso is the first AIGC NFT on SUI. With a text prompt and a picture (optional), you can generate a unique artwork and mint it.
        <br/><br/>
        Total Supply: unlimited
      </div>
      <AccordionCard title="Phase 1" />
    </>
  )
}

const AIGCMintContainer = ({formik, userPoint, setOpen, setModalText,setUserPoint,setShowResults}) => {

  const [aiImgList, setAiImgList] = useState([
    {
      "seed": 1,
      "pic": weijiazai
    },
    {
      "seed": 2,
      "pic": weijiazai
    },
    {
      "seed": 3,
      "pic": weijiazai
    },
    {
      "seed": 4,
      "pic": weijiazai
    },
  ]);
  const [file, setFile] = useState(null);
  const [cantClick, setCantClick] = useState(false);
  const [genLoading, setGenLoading] = useState(false);
  const [genMintLoading, setGenMintLoading] = useState(false);
  const wallet = useWallet();

  const RequestAI = async () => {
    // setGenMintLoading(true)
    console.log(wallet?.account?.address)
      // 找到锚点
      // let anchorElement = document.getElementById("aiResult");
      // console.log("anchorElement",anchorElement)
      // 如果对应id的锚点存在，就跳转到锚点
      // anchorElement.scrollIntoView({block: 'end', behavior: 'smooth'});

    if (formik.values.text === "") {
      await setModalText('Please describe your art');
      setShowResults(true)
      setOpen(true)
      return
    }
    if (userPoint <= 0) {
      await setModalText(<><span>Oops, it appears that you run out of points. <br/><br/>Simply comment “I need more points! My SUI wallet address” under this <a href={'https://twitter.com/intent/tweet?text=I%20need%20more%20points!%20My Sui wallet address is:'+wallet?.account?.address+'&in_reply_to=1632245849362415617'} target='_blank' style={{color:'#5142FC'}} rel="noreferrer">tweet</a>. And our moderators will send more to you soon :-)</span></>);
      setShowResults(true)
      setOpen(true)
      return
    }

    if (!wallet.connected) {
      await setModalText('Please connect wallet');
      setShowResults(true)
      setOpen(true)
      return
    }

    // connect to Devnet
    const provider = new JsonRpcProvider(devnetConnection);
    // get tokens from the DevNet faucet server
    const objects = await provider.getObject(
      '0xa80f535240dc1e06a050b60447d507cf44cd6607',
    );
    console.log(objects?.details)
    if (objects?.details?.data?.fields === undefined || objects?.details?.data?.fields?.whitelist?.fields?.contents.indexOf(wallet?.account?.address) <= -1) {
      await setModalText(<><span>It appears you are not on the whitelist. <br/><br/>Please follow the </span> <a href='https://twitter.com/Maxi_sui/status/1632259059788419072' target='_blank' style={{color:'#5142FC'}} rel="noreferrer">instructions</a><span> to get on the whitelist. If you have any doubt, please contact <a href='https://twitter.com/Maxi_sui' target='_blank' style={{color:'#5142FC'}} rel="noreferrer" >@Maxi_sui</a> via twitter.</span></>)
      setShowResults(true)
      setOpen(true)
      return
    }
    setTimeout(() => {
    window.scrollTo({
      top: 1400,
      behavior: "smooth"
    })
    }, 100);
    setCantClick(true)
    setGenLoading(true)
    let aiList = []
    let result
    if (!formik.values?.cropFile) {
      result = await genaigc(formik.values.text)
    } else {
      result = await genaigcByPic(formik.values.text, formik.values.cropFile)
    }
    setCantClick(false)
    setGenLoading(false)
    if (result.length > 0) {
      result.forEach((ele, index) => {
        const obj = {
          "seed": ele.seed,
          "pic": "data:image/png;base64," + ele.base64
        }
        aiList.push(obj)
      })
      setAiImgList(aiList)
    }
    const consumePointResult=await consumePoint(wallet?.account?.address)
    console.log("consumePointResult",consumePointResult)
    setUserPoint(consumePointResult)
  }

  const [successOpen, setSuccessOpen] = useState(false);
  const [userImage, setUserImage] = useState(false);
  const [scanUrl, setScanUrl] = useState("");

  const { error, loading, balance } = useAccountBalance();

  const mintNFT = async () => {

    if (!wallet.connected) {
      await setModalText('Please connect wallet');
      setShowResults(true)
      setOpen(true)
      return
    }
    // console.log(balance)
    // console.log(balance===0n)
    if (undefined === formik.values.checked) {
      await setModalText('Please select one of the four images')
      setShowResults(true)
      setOpen(true)
      return
    }
    var imageString = formik.values.checked.pic;
    if (formik.values.checked.seed <= 4) {
      await setModalText('You haven’t generated any pictures yet.')
      setShowResults(true)
      setOpen(true)
      return
    }
    if (balance===0n){
      await setModalText(<><span>our wallet balance is 0 SUI. <br/>
      Please request dev-net SUI tokens in your wallet or follow these <a href="https://docs.sui.io/explore/wallet-browser#add-sui-tokens-to-your-sui-wallet" target='_blank' style={{color:'#5142FC'}} rel="noreferrer"> instructions.</a></span></>);
      setShowResults(true)
      setOpen(true)
      return
    }

    // connect to Devnet
    const provider = new JsonRpcProvider(devnetConnection);
    // get tokens from the DevNet faucet server
    const objects = await provider.getObject(
      '0xa80f535240dc1e06a050b60447d507cf44cd6607',
    );
    console.log(objects)
    const mintList = objects?.details?.data?.fields?.address_minted?.fields?.contents
    console.log("mintList",mintList)
    for(var i=0;i<mintList.length;i++){
      var item=mintList[i]
      // console.log("item",item.fields.key)
      // console.log("wallet?.account?.address",wallet?.account?.address)
      if (item.fields.key === wallet?.account?.address && item.fields.value === "3") {
        await setModalText('address minted limit')
        setShowResults(true)
        setOpen(true)
        return
      }
    }

    await setModalText(<><div style={{
      display:'flex',
      justifyContent:"center",
      marginBottom: "22px"
    }}><CircularProgress sx={{
      width: '30px !important',
      height: '30px !important',
      color: 'white'
    }} className={styles.generateLoading}/></div><span>Uploading artwork to IPFS, this could take a few minutes......</span></>)
    await setShowResults(false)
    setOpen(true)
    try {
      const url = await uploadToNFTStorage(DataURIToBlob(imageString))
      setShowResults(true)
      setOpen(false)

      setCantClick(true)
      setGenMintLoading(true)
      // console.log(url)
      const data = {
        packageObjectId: '0x7f3212aec356fdafad71f6c19059b61f2145c9c3',
        module: 'suicasso',
        function: 'mint',
        typeArguments: [],
        arguments: [
          '0xa80f535240dc1e06a050b60447d507cf44cd6607',
          formik.values.text,
          "https://gateway.ipfs.io/ipfs/" + url+"/blob",
        ],
        gasBudget: 10000,
      };
      const resData = await wallet.signAndExecuteTransaction({
        transaction: {
          kind: 'moveCall',
          data
        }
      });
      // console.log('nft minted successfully!', resData?.effects?.created[0].reference?.objectId)
      setScanUrl("https://suiscan.xyz/devnet/object/"+resData?.effects?.created[0].reference?.objectId)
      // alert('congrats, a cute capybara comes to you!')
      setUserImage(imageString)
      setSuccessOpen(true)
      setCantClick(false)
      setGenMintLoading(false)
    } catch (e) {
      // console.error('nft mint failed', e);
      await setModalText('The mint failed for some reason. Please try again.');
      setShowResults(true)
      setOpen(true)
      setCantClick(false)
      setGenMintLoading(false)
    }
  }


  return (
    <>
      <div className={styles.firstContent}>
        <BannerComp/>
        <div className={styles.right}>
          <InfoComp/>
          <TextInputComp formik={formik}/>
          <UploadImageComp file={file} setFile={setFile} formik={formik}/>
          <Button
            disabled={cantClick}
            onClick={RequestAI}
            className={styles.mintNowForFree}
            sx={{
              mt: 2,
            }}
            startIcon={<Box
              component='img'
              className={styles.icon}
              src={vector}
              alt=''
              sx={{
                width: 20,
                height: 20,
              }}
            />}
          >
            <span>Generate ({userPoint<0?0:userPoint} points remaining)</span>
            {genLoading ? <CircularProgress className={styles.generateLoading} sx={{
              width: '30px !important',
              height: '30px !important',
            }}/> : null}
          </Button>
          <ImageSelectComp formik={formik} aiImgList={aiImgList} genLoading={genLoading}/>
          <Button
            disabled={cantClick}
            className={styles.mintNowForFree}
            onClick={mintNFT}>
            Mint now for free
            {genMintLoading ? <CircularProgress sx={{
              width: '20px !important',
              height: '20px !important',
              color:'red !important'
            }} className={styles.generateLoading}/> : null}
          </Button>
          <AIGCSuccessModal setOpen={setSuccessOpen} userImage={userImage} text={""} open={successOpen} scanUrl={scanUrl}/>
          {/*<AIGCModal setOpen={setOpen} text={modalText} open={open} />*/}
        </div>
      </div>
    </>
  )
}

export default AIGCMintContainer
