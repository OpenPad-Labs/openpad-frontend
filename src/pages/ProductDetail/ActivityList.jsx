import {memo, useEffect, useState} from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import AccordionCard from './AccordionCard'
import { Box } from '@mui/material'
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

const ActivityList = ({nftDetail}) => {
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
      {/* <div className={styles.box1}>
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
      </div> */}
      <Box sx={{
        width:500
      }}/>
      <div className={styles.accordionCard}>
        <AccordionCard
          price={nftDetail.privateSalePrice}
          detail={nftDetail.privateSaleText}
          startTime={nftDetail.privateSaleStartTime}
          endTime={nftDetail.privateSaleEndTime}
          defaultExpanded={true}
          contractAddress={nftDetail.nftCollectionAddress}
          maxMintNum={nftDetail.privateSaleUserMaxMintNum}
        />
        <AccordionCard
          price={nftDetail.airDropPrice}
          detail={nftDetail.airDropText}
          startTime={nftDetail.airDropStartTime}
          endTime={nftDetail.airDropEndTime}
          title="Airdrop"
          contractAddress={nftDetail.nftCollectionAddress}
          maxMintNum={nftDetail.airDropUserMaxMintNum}
        />
        <AccordionCard
          price={nftDetail.publicSalePrice}
          detail={nftDetail.publicSaleText}
          startTime={nftDetail.publicSaleStartTime}
          endTime={nftDetail.publicEndTime}
          title='Public Sale'
          contractAddress={nftDetail.nftCollectionAddress}
          maxMintNum={nftDetail.publicSaleUserMaxMintNum}
        />
      </div>
    </div>
  )
}

export default ActivityList
