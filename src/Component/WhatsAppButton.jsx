import React from 'react';
import '../Style/whatsAppButton.css'

const WhatsAppButton = ({ phoneNumber }) => {
  const whatsappMessage = encodeURIComponent('Hello, I am interested in your services.');

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <button className="whatsapp-button" onClick={handleClick}>
      <img src="../Images/whatsapp.png" alt="" style={{height:"50px",width:"50px"}} className='whatsapp-icon'/>
    </button>
  );
};

export default WhatsAppButton;
