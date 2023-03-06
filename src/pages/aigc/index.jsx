import React, { memo, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AIGCMintContainer from './AIGCMintContainer'
import AIGCModal from 'src/components/AIGC/AIGCModal'
import {getBanner, getNftList} from "../../service/home";
import {useWallet} from "@suiet/wallet-kit";
import {getPoint} from "../../service/aigcMint";

const AIGCMint = () => {
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [userPoint, setUserPoint] = useState('');

  const formik = useFormik({
    initialValues: {
      text: ''
    },
    validationSchema: Yup.object({
      text: Yup.string().required('Text is required'),
    }),
    onSubmit: async (values) => {
      console.log('values', values);
      if (!values.checked) {
        await setModalText('Please select one of the four images');
        setOpen(true)
        return
      }
      await setModalText('The mint failed for some reason.Please try again.');
      setOpen(true)
    },
  });
  const wallet = useWallet();

  const initData = async () => {
    // console.log(wallet?.account?.address)
    const resultUserPoint=await getPoint(wallet?.account?.address)
    setUserPoint(resultUserPoint)
  }

  useEffect(() => {
    initData()
  }, [])

  return (
    <>
      <div className={styles.AIGCMint}>
        <div className={styles.container}>
          <AIGCMintContainer formik={formik} userPoint={userPoint} setOpen={setOpen} setModalText={setModalText}/>
        </div>
      </div>
      <AIGCModal setOpen={setOpen} text={modalText} open={open} />
    </>
  )
}

export default memo(AIGCMint)
