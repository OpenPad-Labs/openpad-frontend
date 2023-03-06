import axios from "axios";

const BaseUrl = 'https://api.maixtest.shop'
const str = '/api/v1/public'
export const checkEligibility = async () => {
  try {
    const res = await axios.post(`${BaseUrl}/nft/mint/eligibility/check`, {
      chainId: 1111,
      walletAddress: 1111,
      nftCollectionId: 3111,
      nftCollectionAddress: 1111,
    })
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
export const signature = async () => {
  try {
    const res = await axios.post(`${BaseUrl}/nft/mint/signature/content`, {
      chain_id: 1111,
      wallet_address: 1111,
      nftCollection_id: 3111,
      nftCollection_address: 1111,
    })
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