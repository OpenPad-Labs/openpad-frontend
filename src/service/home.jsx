import axios from "axios";

const BaseUrl = 'https://api.maixtest.shop'
const str = '/api/v1/public'
export const getBanner = async () => {
  try {
    const res = await axios.post(`${BaseUrl}/home/banner`, {})
    console.log('res', res);
    if (res?.data?.success) {
      return res?.data?.data
    }
    return []
  } catch (error) {
    console.log('getBanner', error);
    return []
  }
}
export const getNftDetail = async (params) => {
  try {
    const res = await axios.post(`${BaseUrl}/nft/detail`,
      {
        nftCollectionAddress: '0x670d854c7da9e7fa55c1958a1aeb368b48496020',
        nftCollectionId: '12',
      }
    )
    console.log('res', res);
    if (res?.data?.success) {
      return res?.data?.data
    }
    return []
  } catch (error) {
    console.log('getNftDetail', error);
    return []
  }
}
export const getNftList = async (params) => {
  try {
    const res = await axios.post(`${BaseUrl}/nft/list`,
      { ...params }
    )
    console.log('res', res);
    if (res?.data?.success) {
      return res?.data?.data
    }
    return []
  } catch (error) {
    console.log('getNftList', error);
    return []
  }
}

export const checkMinted = async (params) => {
  try {
    const res = await axios.post(`${BaseUrl}/nft/mint/eligibility/check`,
      {
        "chainId": "string",
        "nftCollectionAddress": "string",
        "nftCollectionId": "string",
        "walletAddress": "string"
      }
    )
    console.log('res', res);
    if (res?.data?.success) {
      return res?.data?.data
    }
    return []
  } catch (error) {
    console.log('getNftList', error);
    return []
  }
}