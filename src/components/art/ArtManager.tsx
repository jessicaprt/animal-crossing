import React from 'react';
import { Base } from '../../utils/base/Base';

export class ArtManager extends Base {
  /**
   * get a list of all artworks
   */
  _getAllArt() {
    return this._get('/art');
  }
}