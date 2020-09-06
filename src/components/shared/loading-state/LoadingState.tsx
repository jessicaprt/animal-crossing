import React from 'react';
import './LoadingState.css';
import Skeleton from '@material-ui/lab/Skeleton';


export class LoadingState extends React.Component {
  render() {
    return (
      <div className="main--flex padded-4y padded-2x">
        <div className="loading-skeleton">
          <Skeleton variant="rect" width={140} height={140} />
        </div>
        <div className="loading-skeleton">
          <Skeleton variant="rect" width={140} height={140} />
        </div>
        <div className="loading-skeleton">
          <Skeleton variant="rect" width={140} height={140} />
        </div>
        <div className="loading-skeleton">
          <Skeleton variant="rect" width={140} height={140} />
        </div>
        <div className="loading-skeleton">
          <Skeleton variant="rect" width={140} height={140} />
        </div>
        <div className="loading-skeleton">
          <Skeleton variant="rect" width={140} height={140} />
        </div>
        <div className="loading-skeleton">
          <Skeleton variant="rect" width={140} height={140} />
        </div>
        <div className="loading-skeleton">
          <Skeleton variant="rect" width={140} height={140} />
        </div>
        <div className="loading-skeleton">
          <Skeleton variant="rect" width={140} height={140} />
        </div>
      </div>
    );
  }
}