import React from 'react';
import { Link } from "react-router-dom"; 
import './PageTitle.css';

export class PageTitle extends React.Component<{backLinkDisplay, backLink, pageTitle}, {}> {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="padded-2y">
        <h3 className="font-color-light">
          <Link to={this.props.backLink}>
            <span className="page-title-breadcrumb">{'< ' + this.props.backLinkDisplay}</span>
          </Link>
        </h3>
        <h1 className="font-color-dark page-title">{this.props.pageTitle}</h1>
      </div>
    );
  }
}

