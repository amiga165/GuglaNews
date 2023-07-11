import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EncryptorService } from '../encryptor/encryptor.service';

// let apiurl = 'http://localhost:8094/app/v4';

// let apiurl = 'https://api-testing.meebuddy.com/app/v4';

let apiurl1 = 'https://api.meebuddy.com/common/v1/location';

let apiurl = 'https://api.meebuddy.com/app/v4';

// let newsurl="https://api.meebuddy.com/app/v4/news";

@Injectable({ 
  providedIn: 'root',
})
export class APIService {
  public base_url:any=apiurl;
	constructor(public http: HttpClient, public storage: EncryptorService) {}
	public authHeaders() {
		var token = this.storage.getItem("api-token");
		// var news_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdzX3VzZXJfZGF0YSI6eyJpZCI6IjYxYjk5OGNhNmIxOGM2MmQ1MzViZjRlNiJ9LCJpYXQiOjE2Mzk1NzM0ODgsImV4cCI6MTY0MTk5MjY4OH0.FmxxZzamT3Z7N2pqzAdMyQO-QYffE8DDPHpElSapt3w";
		// var newstoken=this.storage.getItem('news-token');
		// var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZW50ZXJfZGF0YSI6eyJ2aWxsYWdlX2lkIjoiNWZmZGU5Mzk1MjhiZWIzNTJhZmJiZDk4IiwiaWQiOiI1ZmZkZTkyYjY1NjNmZDM0YzQ2N2VkZTQiLCJkZWxpdmVyeV9jb3N0Ijo2MH0sInVzZXJfZGF0YSI6eyJpZCI6IjYxNzMxNDk5MTc1ZjA4NTU2OWIxOWM3ZCJ9LCJpYXQiOjE2MzQ5OTMzNzMsImV4cCI6MTYzNzQxMjU3M30.YCGWqaCVosqUmqrkFg8RoSXEFFG63CJAkwnNc5D_SXs'
		// console.log(token);
		if (token) {
			return new HttpHeaders({
				"X-Meebuddy-Token": token,
				// "X-News-Token":news_token
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

    postReq1(urlPath, data) {
    return new Promise((resolve, reject) => {
      this.http
        .post(apiurl1 + urlPath, data, {
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
