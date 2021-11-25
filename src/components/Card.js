import React from 'react';


const Card = ({
  name,
  id,
  stared,
  onStarClick
}) => { // {} destructures "props"

  var staredClass = stared ? 'stared' : '';

  return ( 
  <div className = 'tc bg-dark-green dib br3 pa3 ma2 grow bw2 shadow-5' >
    <div>
      <h5 className='f5'>{ name }</h5>
      <button type="button" className={staredClass} onClick={()=>onStarClick(id)} title="Star">Star</button>
    </div> 
  </div>
  );
}

export default Card;