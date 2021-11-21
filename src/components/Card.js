import React from 'react';


const Card = ({
  name,
  keywords,
  id,
  stared,
  onStarClick
}) => { // {} destructures "props"

  var staredClass = stared ? 'stared' : '';

  return ( 
  <div className = 'tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5' >
    <img alt = "`bobbaJob"
    src = {
      `https://robohash.org/${id}?size=200x200`
    }
    /> 
    <div>
      <h5 className='f5'>{ name }</h5>
      <p>{ keywords }</p>
      <button type="button" className={staredClass} onClick={()=>onStarClick(id)} title="Star">Star</button>
    </div> 
  </div>
  );
}

export default Card;