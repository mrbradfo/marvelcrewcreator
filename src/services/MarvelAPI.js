import axios from 'axios';

export class MarvelAPI {

  md5 = require('blueimp-md5');

  constructor() {
    this.privateKey = process.env.REACT_APP_PRIVATE_API_KEY
    this.publicKey = process.env.REACT_APP_PUBLIC_API_KEY;
    this.ts = new Date().getTime();
    this.hash = this.md5(this.ts + this.privateKey + this.publicKey);
  }

  getAuthInfo() {
    return {
      apikey: this.publicKey,
      hash: this.hash,
      ts: this.ts
    };
  }



  getCharacters(param = {}) {
    const params = {...param, ...this.getAuthInfo()};

    //grab the base url for the Marvel API from .env
    const baseURL = process.env.REACT_APP_MARVEL_API_BASE_URL;

    return axios.get(baseURL, { params: params })
      .then((response) => {
        return response.data.data;
      });
  }

  getCharacter(id, config = {}) {
    const params = { ...config, ...this.getAuthInfo() };

    const endpoint = process.env.REACT_APP_MARVEL_API_BASE_URL + '/' + id;

    return axios.get(endpoint, { params: params })
      .then((response) => {
        return response.data.data;
      });
  }

}
