import React from 'react';
import Card from './Card';

const CardList = ({
  jobs,
  onStarClick
}) => {
  return ( 
    <div> {
      jobs.map((user, i) => {
        return ( 
          <Card key = { jobs[i].id }
                id = { jobs[i].id }
                name = { jobs[i].name }
                keywords = { jobs[i].keywords}
                stared = { jobs[i].stared}
                onStarClick = {onStarClick}
          />
        );
      })
    } 
    </div>
  );
}

export default CardList;