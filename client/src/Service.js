import request from 'request';

class Service {
  async signUp(body) {
    return new Promise((resolve, reject) => {
      let options = {
        url: 'http://localhost:1337/api/signup',
        method: 'POST',
        body: body,
        headers: {
          'Accept': 'application/json'
        },
        json: true
      }
      request(options, (err, res, body) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(body);
      });
    });
  }
  async login(body) {
    return new Promise((resolve, reject) => {
      let options = {
        url: 'http://localhost:1337/api/login',
        method: 'POST',
        body: body,
        json: true
      }
      request(options, (err, res, body) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        else if (body == false) {
          reject(err);
        }
        resolve(body);
      });
    });
  }
  async otp(body) {
    return new Promise((resolve, reject) => {
      let options = {
        url: 'http://localhost:1337/api/otp',
        method: 'POST',
        body: body,
        json: true
      }
      console.log(body);
      request(options, (err, res, body) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        else if (body == false) {
          reject(err);
        }
        console.log(body);
        resolve(body);
      });
    });
  }
  async verifyOtp(body) {
    return new Promise((resolve, reject) => {
      let options = {
        url: 'http://localhost:1337/api/verifyotp',
        method: 'POST',
        body: body,
        json: true
      }
      console.log(body);
      request(options, (err, res, body) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        else if (body == false) {
          reject(err);
        }
        resolve(body);
      });
    });
  }
}

export default Service;