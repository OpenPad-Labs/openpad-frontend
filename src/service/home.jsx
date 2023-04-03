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
    const res = await axios.post(`${BaseUrl}/nft/detail`,params
    )
    // console.log('res', res);
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

export const getObjectSelf = async (params) => {
  try {
    const res = await axios.post('https://fullnode.testnet.sui.io:443/',
      {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "sui_getObject",
        "params": [
          params,
          {
            "showType": true,
            "showOwner": true,
            "showPreviousTransaction": true,
            "showDisplay": false,
            "showContent": true,
            "showBcs": false,
            "showStorageRebate": true
          }
        ]
      }
    )
    console.log('res', res);
      return res?.data
  } catch (error) {
    console.log('getObject', error);
    return []
  }
}
