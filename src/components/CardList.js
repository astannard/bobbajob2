import React from 'react';
import Card from './Card';

const CardList = ({
  jobs,
  onStarClick
}) => {
  return ( 
    <div> {
      jobs.map((job, i) => {
        return ( 
          <Card key = { i }
                id = { job.job_id }
                name = { job.job_title }
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