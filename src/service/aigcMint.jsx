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
export const getPoint = async (address) => {
  try {
    const res = await axios.get(`${BaseUrl}/api/v1/public/ai/points?address=` + address)
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

export const consumePoint = async (address) => {
  try {
    const res = await axios.get(`${BaseUrl}/api/v1/public/ai/points/consume?address=` + address +"&amount=1")
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

export const genaigc = async (content) => {
  try {
    const res = await axios.post(`https://api.stability.ai/v1beta/generation/stable-diffusion-512-v2-0/text-to-image`, {
        "text_prompts": [
          {
            "text": content
          }
        ],
        "start_schedule": 0.5,
        "seed": 0,
        "steps": 30,
        "cfg_scale": 7,
        "height": 512,
        "width": 512,
        "samples": 4
      },
      {
        headers: {
          "Authorization": "sk-orcI02jiYxEiIDMNIkZnofc8k9MUToSQJrFco508uVELTciH",
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
    console.log('res', res);

    return res?.data?.artifacts
    // if (res?.data?.finishReason==="SUCCESS") {
    //   return res?.data?.data
    // }
    // return
  } catch (error) {
    console.log('getBanner', error);
    return []
  }
}

export const genaigcByPic = async (content, file) => {
  try {
    let formData = new FormData()
    formData.append('init_image', file)
    // formData.append("start_schedule", 0.5)
    formData.append("seed", 0)
    formData.append("steps", 30)
    formData.append("cfg_scale", 7)
    formData.append("height", 512)
    formData.append("width", 512)
    formData.append("samples", 4)
    formData.append('text_prompts[0][text]', content)
    const res = await axios.post(`https://api.stability.ai/v1beta/generation/stable-diffusion-512-v2-0/image-to-image`, formData,
      {
        headers: {
          "Authorization": "sk-orcI02jiYxEiIDMNIkZnofc8k9MUToSQJrFco508uVELTciH",
          "Content-Type": "multipart/form-data",
          "Accept": "application/json"
        }
      })
    // console.log('res', res?.data?.artifacts);
    return res?.data?.artifacts
    // if (res?.data?.finishReason==="SUCCESS") {
    //   return res?.data?.data
    // }
    // return
  } catch (error) {
    console.log('getBanner', error);
    return []
  }
}
