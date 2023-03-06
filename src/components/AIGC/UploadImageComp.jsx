import styles from '../../pages/aigc/index.module.scss'
import React, { useState } from 'react'
import { Box, Button, Stack, LinearProgress, Typography } from '@mui/material'
import Dropzone from 'react-dropzone';
import BackupIcon from '@mui/icons-material/Backup';
import CropComp from './CropComp'
const UploadImageComp = ({ file, setFile, formik }) => {
  const [progress, setProgress] = useState(50);

  const onFileInput = (fs) => {
    if (!fs.length) {
      return;
    }
    const file = fs?.[0];
    setFile(file)
    setProgress(0)
  };
  return (
    <>
      <div className={styles.step2}>
        2. Upload image (Optional)
      </div>
      <div className={styles.step1Desc}>
        Works best with photos which consist only one face. <br />
        Your input image won’t be saved anywhere.
      </div>
      {file ? <CropComp file={file} setFile={setFile} formik={formik} /> :
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <Dropzone onDrop={onFileInput}>
            {
              ({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  sx={{ width: '100%' }}
                >
                  <input {...getInputProps()} />
                  <Box
                    sx={{
                      width: '100%',
                      background: '#1F1F2C',
                      /* Drop Shadow Item */
                      boxShadow: ' 0px 3px 16px rgba(47, 83, 109, 0.12)',
                      borderRadius: '20px',
                      height: 260,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      my: 2,
                    }}
                  >
                    <BackupIcon sx={{
                      color: '#fff',
                      width: '50px',
                      height: '50px'
                    }} />
                    <Typography
                      variant="body2"
                      sx={{
                        width: '100%',
                        paddingBottom: '100%',
                        padding: '1px',
                        color: ' #5142FC',
                        mt: '10px',
                        textAlign: 'center',
                        fontFamily: 'Montserrat Bold',
                        fontWeight: 700,
                        fontSize: '16px'
                      }}
                    >
                      Drag an image here or tap to upload
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        width: '100%',
                        paddingBottom: '100%',
                        padding: '20px',
                        color: '#8A8AA0',
                        textAlign: 'center',
                        fontFamily: 'Montserrat',
                        fontWeight: 400,
                        fontSize: '15px'
                      }}
                    >
                      File requirement: JPG or PNG, smaller than 5MB
                    </Typography>
                  </Box>
                </Box>
              )
            }
          </Dropzone>
          <LinearProgress
            color="inherit"
            sx={{
              marginTop: '10px',
              width: '300px',
              display: progress > 0 ? 'block' : 'none',
            }}
            variant="determinate"
            value={progress}
          />
        </Stack>
      }
    </>
  )
}

export default UploadImageComp
