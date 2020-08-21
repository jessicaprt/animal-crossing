import React from 'react'; 

export class Base extends React.Component<{}, {data: any}> {
  private _baseEndpoint = 'http://acnhapi.com/v1';
  
  _get = async(request: string): Promise<any> => {
    const url = `${this._baseEndpoint}${request}`;
    
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message) 
    }

    return body;
  }
}