import { EncryptorService } from './encryptor/encryptor.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

let apiurl = 'https://api-testing.meebuddy.com/common/v1/location';

@Injectable({
  providedIn: 'root',
})
export class LocationApiService {
  constructor(public http: HttpClient, public storage: EncryptorService) {}
  public authHeaders() {
    var token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWxsZXJfaWQiOiI2MWI0OTMyZmFiZTA2NzE4Y2QyNjNhYmUiLCJpYXQiOjE2Mzk0NjYzNTQsImV4cCI6MTY0MTg4NTU1NH0.I-OXU0KHRArMKse04XRqLm8Lgr1s7xCHgkXublu48do';
    //this.storage.getItem('api-token');
    // var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZW50ZXJfZGF0YSI6eyJ2aWxsYWdlX2lkIjoiNWZmZGU5Mzk1MjhiZWIzNTJhZmJiZDk4IiwiaWQiOiI1ZmZkZTkyYjY1NjNmZDM0YzQ2N2VkZTQiLCJkZWxpdmVyeV9jb3N0Ijo2MH0sInVzZXJfZGF0YSI6eyJpZCI6IjYxNzMxNDk5MTc1ZjA4NTU2OWIxOWM3ZCJ9LCJpYXQiOjE2MzQ5OTMzNzMsImV4cCI6MTYzNzQxMjU3M30.YCGWqaCVosqUmqrkFg8RoSXEFFG63CJAkwnNc5D_SXs'
    // console.log(token);
    if (token) {
      return new HttpHeaders({
        'X-Meebuddy-Token': token,
      });
    }
    return new HttpHeaders({});
  }

  getReq(urlPath) {
    return new Promise((resolve, reject) => {
      this.http
        .get(apiurl + urlPath, { headers: this.authHeaders() })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  postReq(urlPath, data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(apiurl + urlPath, data, {
          headers: this.authHeaders(),
        })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            reject(err.error);
          }
        );
    });
  }

  putReq(urlPath, data) {
    return new Promise((resolve, reject) => {
      this.http
        .put(apiurl + urlPath, data, {
          headers: this.authHeaders(),
        })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            err.message = err.error.message || 'Internal Server Error';
            reject(err);
          }
        );
    });
  }

  patchReq(urlPath, data) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(apiurl + urlPath, data, {
          headers: this.authHeaders(),
        })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            err.message = err.error.message || 'Internal Server Error';
            reject(err);
          }
        );
    });
  }

  deleteReq(urlPath) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(apiurl + urlPath, {
          headers: this.authHeaders(),
        })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          (err) => {
            err.message = err.error.message || 'Internal Server Error';
            reject(err);
          }
        );
    });
  }
}
