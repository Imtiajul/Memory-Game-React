import React from 'react'
import './SingleCard.css'
function SingleCard(props) {
   function handleClick() {
      if(!props.disabled) props.handleChoice(props.card);
   }
   return (
      <div className="card">
         <div className={props.flipped ? 'flipped' : ''}>
            <img src="/images/empty-strip.jpg" alt="empty strip" className="card-front" onClick={handleClick}/>
            <img src={props.card.src} alt="Minions" className="card-back" />
         </div>
      </div>
   )
}

export default SingleCard;