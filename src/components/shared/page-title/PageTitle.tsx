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
        <Link to={this.props.backLink}>
          <h3 className="font-color-light page-title-breadcrumb">{'< ' + this.props.backLinkDisplay}</h3>
        </Link>
        <h1 className="font-color-dark page-title">{this.props.pageTitle}</h1>
      </div>
    );
  }
}