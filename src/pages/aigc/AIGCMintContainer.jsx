import styles from './index.module.scss'
import React, {useState, useEffect} from 'react'
import userInfoIcon from '../../assets/img/page/aigc/InfoUser.svg'
import weijiazai from '../../assets/img/page/home/weijiazai.png'
import image8 from '../../assets/img/page/aigc/image8.png'
import image9 from '../../assets/img/page/aigc/image9.png'
import image10 from '../../assets/img/page/aigc/image10.png'
import image11 from '../../assets/img/page/aigc/image11.png'
import {Box, TextField, Button, Typography, ImageList, ImageListItem, Checkbox} from '@mui/material'
import twitterIcon from '../../assets/img/page/product_detail/twitter.png'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import UploadImageComp from 'src/components/AIGC/UploadImageComp'
import vector from '../../assets/img/page/aigc/Vector.svg'
import {consumePoint, genaigc, genaigcByPic, getPoint} from "../../service/aigcMint";
import {ConnectWallet} from "../../web3/useMetaConnect";
import {SuietWallet, useWallet} from '@suiet/wallet-kit';
import {upload, DataURIToBlob, uploadToNFTStorage} from "../../web3/ipfs";
import CircularProgress from '@mui/material/CircularProgress';
import AIGCSuccessModal from 'src/components/AIGC/AIGCSuccessModal'
import AIGCModal from "../../components/AIGC/AIGCModal";
import {JsonRpcProvider, devnetConnection} from '@mysten/sui.js';

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
        <img className={styles.image8} src={image8} alt=''/>
        <img className={styles.image9} src={image9} alt=''/>
        <img className={styles.image10} src={image10} alt=''/>
        <img className={styles.image11} src={image11} alt=''/>
      </div>
    </div>
  )
}

const ImageCardBox = ({formik, aiImgList,genLoading}) => {
  console.log("aiImgList", aiImgList)
  return (
    <Box sx={{ position: 'relative' }}>
    <ImageList sx={{width: 600, height: 600}} cols={2} rowHeight={290}>
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
        Suicasso is the first AIGC NFT on SUI.<br/> <br/>

        Currently, It is live on the SUI devnet but all participants will receive the same NFT when the SUI mainnet launches.<br/> <br/>
        <div className={styles.descWeight}>
          The first 1000 of Suicasso will be sent to Maxi supporters for free. <br/>
          Simply:<br/>
          1. Follow @maxi_sui on twitter<br/>
          2. Retweet this tweet<br/>
          3. Comment your wallet address on the tweet<br/>
          4. Wait for our moderators to add you to the whitelist(Should take a few minutes)<br/><br/>
        </div>
        Then you can generate the art and mint it below.<br/>
      </div>
    </>
  )
}

const AIGCMintContainer = ({formik, userPoint, setOpen, setModalText}) => {

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
      // 找到锚点
      // let anchorElement = document.getElementById("aiResult");
      // console.log("anchorElement",anchorElement)
      // 如果对应id的锚点存在，就跳转到锚点
      // anchorElement.scrollIntoView({block: 'end', behavior: 'smooth'});

    if (formik.values.text === "") {
      await setModalText('Please describe your art');
      setOpen(true)
      return
    }
    if (userPoint <= 0) {
      await setModalText('Oops, it appears that you run out of points.\n\n' +
        'Simply comment “I need more points + wallet address” under this tweet. And our moderators will send more to you soon :-)');
      setOpen(true)
      return
    }

    if (!wallet.connected) {
      await setModalText('Please connect wallet');
      setOpen(true)
      return
    }

    // connect to Devnet
    const provider = new JsonRpcProvider(devnetConnection);
    // get tokens from the DevNet faucet server
    const objects = await provider.getObject(
      '0xd7a4fbd4c4c4fc16a5dbd88d045f0e4faacc31f0',
    );
    if (objects?.details?.data?.fields?.whitelist?.fields?.contents.indexOf(wallet?.account?.address) <= -1) {
      await setModalText('It appears you are not on the whitelist.\n' +
        '\n' +
        'Please follow the instructions on this page to get on the whitelist. If you have any doubt, please contact @Maxi_sui via twitter.');
      setOpen(true)
      return
    }
    setTimeout(() => {
    window.scrollTo({
      top: 1400,
      behavior: "smooth"
    });
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

      consumePoint(wallet?.account?.address)
    }
  }

  const [successOpen, setSuccessOpen] = useState(false);
  const [userImage, setUserImage] = useState(false);

  const mintNFT = async () => {
    if (!wallet.connected) {
      await setModalText('Please connect wallet');
      setOpen(true)
      return
    }
    if (undefined === formik.values.checked) {
      await setModalText('Please select one of the four images')
      setOpen(true)
      return
    }
    var imageString = formik.values.checked.pic;
    if (formik.values.checked.seed <= 4) {
      await setModalText('You don\'t have picture')
      setOpen(true)
      return
    }

    // connect to Devnet
    const provider = new JsonRpcProvider(devnetConnection);
    // get tokens from the DevNet faucet server
    const objects = await provider.getObject(
      '0xd7a4fbd4c4c4fc16a5dbd88d045f0e4faacc31f0',
    );
    // console.log([0].fields)
    const mintList = objects?.details?.data?.fields?.address_minted?.fields?.contents
    // console.log("mintList",mintList)
    for(var i=0;i<mintList.length;i++){
      var item=mintList[i]
      // console.log("item",item.fields.key)
      // console.log("wallet?.account?.address",wallet?.account?.address)
      if (item.fields.key === wallet?.account?.address && item.fields.value === "5") {
        await setModalText('address minted limit')
        setOpen(true)
        return
      }
    }

    setCantClick(true)
    setGenMintLoading(true)
    try {
      const url = await uploadToNFTStorage(DataURIToBlob(imageString))
      // console.log(url)
      const data = {
        packageObjectId: '0xb161ddb6354c6610807dd2ca83a38be9621aee74',
        module: 'suicasso',
        function: 'mint',
        typeArguments: [],
        arguments: [
          '0xd7a4fbd4c4c4fc16a5dbd88d045f0e4faacc31f0',
          formik.values.text,
          "ipfs://" + url,
        ],
        gasBudget: 10000,
      };
      const resData = await wallet.signAndExecuteTransaction({
        transaction: {
          kind: 'moveCall',
          data
        }
      });
      // console.log('nft minted successfully!', resData);
      // alert('congrats, a cute capybara comes to you!')
      setUserImage(imageString)
      setSuccessOpen(true)
      setCantClick(false)
      setGenMintLoading(false)
    } catch (e) {
      // console.error('nft mint failed', e);
      await setModalText('The mint failed for some reason. Please try again.');
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
            {genMintLoading ? <CircularProgress className={styles.generateLoading}/> : null}
          </Button>
          <AIGCSuccessModal setOpen={setSuccessOpen} userImage={userImage} text={""} open={successOpen}/>
          {/*<AIGCModal setOpen={setOpen} text={modalText} open={open} />*/}
        </div>
      </div>
    </>
  )
}

export default AIGCMintContainer
