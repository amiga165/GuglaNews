import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";



@Injectable({
  providedIn: 'root'
})
export class EncryptorService {
  public key;
	public iv;
  constructor() {
     this.key = localStorage.getItem("encrypt_key");
    this.iv = localStorage.getItem("encrypt_iv");
    if (!this.key) {
      this.key = this.genRanHex(16);
      localStorage.setItem("encrypt_key", this.key);
      }
    if (!this.iv) {
      this.iv = this.genRanHex(16);
      localStorage.setItem("encrypt_iv", this.iv);
    } 
  }
  genRanHex = size => {
		var text = "";
		var possible = "0123456789abcdef";
		for (var i = 0; i < size; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	};
  getItem(key) {
		var encrypted = localStorage.getItem(key);
		if (!encrypted) return null;
		try {
			return CryptoJS.AES.decrypt(encrypted, this.key, {
				keySize: 16,
				iv: this.iv,
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7,
			}).toString(CryptoJS.enc.Utf8);
		} catch (error) {
			console.log("givving Null")
			return null;
		}
	}

  setItem(key, value) {
		var encrypted = CryptoJS.AES.encrypt(value.toString(), this.key, {
			keySize: 16,
			iv: this.iv,
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		});
		localStorage.setItem(key, encrypted);
	}

	getObject(key) {
		var encrypted = localStorage.getItem(key);
		if (!encrypted) return {};
		try {
			var decoded = CryptoJS.AES.decrypt(encrypted, this.key, {
				keySize: 16,
				iv: this.iv,
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7,
			}).toString(CryptoJS.enc.Utf8);
			return JSON.parse(decoded);
		} catch (error) {
			return {};
		}
	}

	setObject(key, obj) {
		var value = JSON.stringify(obj);
		var encrypted = CryptoJS.AES.encrypt(value.toString(), this.key, {
			keySize: 16,
			iv: this.iv,
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		});
		localStorage.setItem(key, encrypted);
	}

	getList(key) {
		var encrypted = localStorage.getItem(key);
		if (!encrypted) return {};
		var decoded = CryptoJS.AES.decrypt(encrypted, this.key, {
			keySize: 16,
			iv: this.iv,
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		}).toString(CryptoJS.enc.Utf8);
		try {
			return new Set(JSON.parse(decoded));
		} catch (error) {
			return new Set();
		}
	}

	setList(key, set) {
		var value = JSON.stringify(Array.from(set));
		var encrypted = CryptoJS.AES.encrypt(value.toString(), this.key, {
			keySize: 16,
			iv: this.iv,
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7,
		});
		localStorage.setItem(key, encrypted);
	}
}
