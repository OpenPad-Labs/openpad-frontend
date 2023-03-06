import {create} from "ipfs-http-client";
import React, {useState, useEffect} from 'react'
import axios from "axios";


export async function upload(file) {

  const projectId = '';   // <---------- your Infura Project ID
  const projectSecret = '';  // <---------- your Infura Secret
  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    }
  });
  try {
    const created = await client.add(file);
    const url = `/${created.path}`;
    console.log(url)
    // setUrlArr(prev => [...prev, url]);
    return url
  } catch (error) {
    console.log(error.message);
  }
}


export function DataURIToBlob(dataURI) {

  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
    ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}



export async function uploadToNFTStorage(file) {
  try {
    let formData = new FormData()
    formData.append('file', file)
    // formData.append("start_schedule", 0.5)
    const res = await axios.post(`https://api.nft.storage/upload`, formData,
      {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRBY0I5MzcxODgwQzMyYmNCZjdiRDJENjA3NmRGMjY4ZTQzZTVmZDUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0ODk2Njc1NTc2NCwibmFtZSI6ImRldiJ9.YOo-EkPfX5dkUc9NW8neZ5coduE9Op4s10t0SnQAe3o",
          "x-agent-did": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRBY0I5MzcxODgwQzMyYmNCZjdiRDJENjA3NmRGMjY4ZTQzZTVmZDUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0ODk2Njc1NTc2NCwibmFtZSI6ImRldiJ9.YOo-EkPfX5dkUc9NW8neZ5coduE9Op4s10t0SnQAe3o",
          "Content-Type": "multipart/form-data",
          "Accept": "application/json"
        }
      })
    // console.log('res', res);
    return res?.data?.value?.cid
    // if (res?.data?.finishReason==="SUCCESS") {
    //   return res?.data?.data
    // }
    // return
  } catch (error) {
    console.log('getBanner', error);
    return []
  }
}
