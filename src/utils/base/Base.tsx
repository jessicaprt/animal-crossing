import React from 'react'; 

export class Base extends React.Component<{match: any}, {data: any}> {
  private _baseEndpoint = 'https://acnhapi.com/v1a';
  
  /**
   * GET call
   * @param request
   */
  _get = async(request: string): Promise<any> => {
    const url = `${this._baseEndpoint}${request}`;
    
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message) 
    }

    return body;
  }

  /**
   * update state
   * @param key 
   * @param value 
   */
  _changeState(key: string, value: any) {
    let currentState = this.state.data;
    currentState[key] = value;

    this.setState({
      data: currentState
    });
  }
}