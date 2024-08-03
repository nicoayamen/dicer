import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#423e6b',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  outline: 'none',
  color: 'white',
  textAlign: 'center'
};

export default function MatchedModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.onClose();
  }

  return (
    <div>
      <Button onClick={(e) => { props.onMatch(e); handleOpen(); }}>Yay</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You've matched with {props.userName}!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Let's Roll! Go to Messages!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}