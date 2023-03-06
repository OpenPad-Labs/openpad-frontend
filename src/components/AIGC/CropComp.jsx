import ReactCrop from 'react-image-crop'
import React, { useEffect, useRef, useState } from 'react'
import { Box, IconButton, Button } from '@mui/material'
import deleteIcon from '../../assets/img/page/aigc/deleteIcon.svg'
import confirmicon from '../../assets/img/page/aigc/confirmicon.svg'
import styles from '../../pages/aigc/index.module.scss'

const canvasToImage = function (image, crop) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = imageWidth;
  canvas.height = imageWidth;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    imageWidth,
    imageWidth
  );
  const url = canvas.toDataURL('image/jpeg');
  return url
};
const saveMyImage = function (canvas, filename) {
  let strData = canvas.toDataURL('image/jpeg');
  strData = strData.replace('image/jpeg', 'image/octet-stream');
  const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  save_link.href = strData;
  save_link.download = filename + '.jpeg';
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  save_link.dispatchEvent(event);
};

const imageWidth = 512

function saveCroppedImg(image, crop, fileName) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = imageWidth;
  canvas.height = imageWidth;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    imageWidth,
    imageWidth
  );
  saveMyImage(canvas, fileName)
}

async function imageToFile(image, crop, formik) {
  try {
    let file = null
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = imageWidth;
    canvas.height = imageWidth;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      imageWidth,
      imageWidth
    );
    await canvas.toBlob(blob => {
      if (blob) {
        file = new File([blob], "crop.png");
        formik.setFieldValue('cropFile', file)
      }
    })
    return file
  } catch (error) {
    console.log('imageToFile', error);
  }
}

function CropComp({ file, setFile, formik }) {
  const imageRef = useRef(null)
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 45,
    y: 45,
    width: 512,
    height: 512
  });
  const [src, setSrc] = useState('');
  const [cropSrc, setCropSrc] = useState('');
  useEffect(() => {
    if (file) {
      const s = URL.createObjectURL(file);
      setSrc(s)
    }
  }, [file])
  return (
    <>
      {
        cropSrc
          ? <Box
            sx={{
              position: 'relative',
              my: 2,
            }}>
            <Box
              component='img'
              src={cropSrc}
            />
            <IconButton
              aria-label="more"
              id="long-button"
              aria-haspopup="true"
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 60,
                height: 60,
              }}
              onClick={() => {
                setCropSrc('');
              }}
            >
              <img src={deleteIcon} />
            </IconButton>
          </Box>
          : <Box
            sx={{
              width: 600,
              // minHeight: 600,
              border: '1px solid #fff',
              position: 'relative',
              mt: 2,
              // '.ReactCrop': {
              //   height: '100%',
              //   '.ReactCrop__child-wrapper': {
              //     height: '100%',
              //     img: {
              //       height: '100%'
              //     }
              //   }
              // }
            }}
          >
            <ReactCrop
              crop={crop}
              onChange={c => {
                setCrop({
                  ...c,
                  width: c.width,
                  height: c.width
                })
              }}
            >
              <Box
                ref={imageRef}
                src={src}
                component='img'
              />
            </ReactCrop>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-haspopup="true"
              sx={{
                position: 'absolute',
                right: 70,
                top: 0,
                width: 60,
                height: 60,
              }}
              onClick={async () => {
                const url = canvasToImage(imageRef?.current, crop);
                setCropSrc(url)
                formik.setFieldValue('cropUrl', url)
                imageToFile(imageRef?.current, crop, formik)                
              }}
            >
              <img src={confirmicon} />
            </IconButton>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-haspopup="true"
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                width: 60,
                height: 60,
              }}
              onClick={() => {
                setFile(null);
              }}
            >
              <img src={deleteIcon} />
            </IconButton>
          </Box>
      }

      {/* <Button
        variant="contained"
        className={styles.mintNowForFree}
        onClick={async () => {
          const cropImage = await saveCroppedImg(imageRef?.current, crop, 'crop-image')
        }}
        sx={{
          my: 2,
          marginBottom: '10px !important'
        }}
      >
        Save Image
      </Button>
      <Button
        variant="contained"
        className={styles.mintNowForFree}
        onClick={async () => {
          const cropImage = await getCroppedBlob(imageRef?.current, crop, 'crop-image')
          console.log('cropImage', cropImage);
        }}
        sx={{
          my: 2,
          marginBottom: '10px !important'
        }}
      >
        Get Blob
      </Button> */}
    </>
  )
}

export default CropComp
