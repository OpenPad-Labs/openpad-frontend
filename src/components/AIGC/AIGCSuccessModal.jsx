import { Modal, Box, Typography, Button } from "@mui/material"
import { display } from "@mui/system"
import styles from "../../pages/aigc/index.module.scss";
import image8 from "../../assets/img/page/aigc/image8.png";
import React from "react";

const AIGCSuccessModal = ({
  text = "",
  setOpen,
  open, userImage=""
}) => {
  return (
    <Modal
      open={open}
      onClose={() => { setOpen(false); }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '427px',
          background: ' #343444',
          borderRadius: '13px',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Typography
          sx={{
            color: '#fff',
            fontFamily: 'Montserrat Bold',
            fontWeight: 600,
            fontSize: '16px',
            my: 2,
            whiteSpace: 'pre-line'
          }}
        >Great! You have successfully minted one AIGC NFT!</Typography>
        <img className={styles.dialogSuccessImg} src={userImage} alt=''/>
        <Typography
          sx={{
            color: '#C4C4C4',
            fontFamily: 'Montserrat Bold',
            fontWeight: 600,
            fontSize: '16px',
            my: 2,
            whiteSpace: 'pre-line'
          }}
        >Tip: Right click to save your art</Typography>
        <Typography
          sx={{
            color: '#C4C4C4',
            fontFamily: 'Montserrat Bold',
            fontWeight: 600,
            fontSize: '16px',
            my: 2,
            whiteSpace: 'pre-line'
          }}
        >Be sure to share your creation using #suicasso on twitter!</Typography>

        <Button
          variant="contained"
          sx={{
            color: '#000',
            fontFamily: 'Montserrat Bold',
            fontWeight: 600,
            fontSize: '14px',
            background: '#FFFFFF',
            borderRadius: '30px',
            width: 150,
            height: 50,
            "&:hover": {
              backgroundColor: '#fff',
            }
          }}
          onClick={() => { setOpen(false) }}
        >
          OK
        </Button>
      </Box>
    </Modal >
  )
}
export default AIGCSuccessModal
