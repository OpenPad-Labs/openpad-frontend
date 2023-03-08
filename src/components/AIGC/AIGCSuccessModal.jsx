import { Modal, Box, Typography, Button } from "@mui/material"
import { display } from "@mui/system"
import styles from "../../pages/aigc/index.module.scss";
import image8 from "../../assets/img/page/aigc/image8.png";
import React from "react";

const AIGCSuccessModal = ({
  text = "",
  setOpen,
  open, userImage="",
                            scanUrl=""

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
        >Great! You have successfully minted one AIGC NFT(<a href={scanUrl} target='_blank' style={{color:'#5142FC'}}>View on Sui Scan</a>)!</Typography>
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
        >Be sure to share your creation using <a href='https://twitter.com/hashtag/Suicasso' target='_blank' style={{color:'#5142FC'}}>#suicasso</a> on twitter!</Typography>

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
          onClick={() => {
            // setOpen(false)
            window.open("https://twitter.com/intent/tweet?text=Do%20you%20like%20my%20first%20%23Suicasso%20NFT%3F%20First%20AIGC%20%23NFT%20on%20%23SUI%20IS%20LIVE%20on%20%40Maxi_sui%20%F0%9F%8E%89%20Let's%20Mint%20More%20at%20https%3A%2F%2Fmaxi.to%2Fsuicasso&in_reply_to=1632245849362415617");
          }}
        >
          Tweet now
        </Button>
      </Box>
    </Modal >
  )
}
export default AIGCSuccessModal
