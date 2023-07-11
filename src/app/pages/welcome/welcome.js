var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { CommonProvider } from "../../providers/common/common";
import { APIService } from "../../providers/api-service/api-service";
import { UserProvider } from "../../providers/user/user";
import { CenterProvider } from "../../providers/center/center";
import { HomePage } from "../home/home";
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomePage = /** @class */ (function () {
    function WelcomePage(navCtrl, commin, api, user, center) {
        this.navCtrl = navCtrl;
        this.commin = commin;
        this.api = api;
        this.user = user;
        this.center = center;
        this.stateSelected = true;
        this.area = {
            state: {
                selected: "",
                data: [],
            },
            district: {
                selected: "",
                data: [],
            },
            mandal: {
                selected: "",
                data: [],
            },
            village: {
                selected: "",
                data: [],
            },
        };
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        this.getStates();
    };
    WelcomePage.prototype.getStates = function () {
        var _this = this;
        this.api
            .postReq("/common/states", {})
            .then(function (res) {
            if (res.data) {
                _this.area.state.data = res.data;
            }
            else {
                _//this.commin.toastMsg("Something error occured");
            }
        })
            .catch(function (err) {
            console.log('welcomeee');
            _//this.commin.toastMsg('welcome' + err.message);
        });
    };
    WelcomePage.prototype.getDistricts = function () {
        var _this = this;
        var state_id = this.area.state.selected;
        this.commin.startLoader();
        this.api
            .postReq("/common/districts", { state_id: state_id })
            .then(function (res) {
            if (res.data) {
                _this.area.district.data = res.data;
            }
            else {
                _//this.commin.toastMsg("Something error occured");
            }
        })
            .catch(function (err) {
            _//this.commin.toastMsg(err.message);
        })
            .then(function () {
            // Finally block
            _this.commin.stopLoader();
        });
    };
    WelcomePage.prototype.getMandals = function () {
        var _this = this;
        if (!this.area.district.selected)
            return null;
        this.area.mandal = { selected: "", data: [] };
        this.area.village = { selected: "", data: [] };
        var dist_id = this.area.district.selected;
        this.commin.startLoader();
        this.api
            .postReq("/common/mandals", { district_id: dist_id })
            .then(function (res) {
            if (res.data) {
                _this.area.mandal.data = res.data;
            }
            else {
                _//this.commin.toastMsg("Something error occured");
            }
        })
            .catch(function (err) {
            _//this.commin.toastMsg(err.message);
        })
            .then(function () {
            // Finally block
            _this.commin.stopLoader();
        });
    };
    WelcomePage.prototype.getVillages = function () {
        var _this = this;
        if (!this.area.mandal.selected)
            return null;
        this.area.village = { selected: "", data: [] };
        var mandal_id = this.area.mandal.selected;
        this.commin.startLoader();
        this.api
            .postReq("/common/villages", { mandal_id: mandal_id })
            .then(function (res) {
            if (res.data) {
                _this.area.village.data = res.data;
            }
            else {
                _//this.commin.toastMsg("Something error occured");
            }
        })
            .catch(function (err) {
            _//this.commin.toastMsg(err.message);
        })
            .then(function () {
            // Finally block
            _this.commin.stopLoader();
        });
    };
    WelcomePage.prototype.continue = function () {
        var _this = this;
        var vill_id = this.area.village.selected;
        this.api
            .postReq("/common/location/select", { village_id: vill_id })
            .then(function (res) {
            if (res.status == "success" && res.token) {
                _this.user.setToken(res.token);
                _this.center.setLocation(res.data);
                _this.navCtrl.setRoot(HomePage);
                _this.center.initCenter();
            }
            else {
                _this.center.initCenter();
                _//this.commin.toastMsg("Something error occured !");
            }
        })
            .catch(function (err) {
            console.log(err);
            _//this.commin.toastMsg(err.message);
        });
    };
    WelcomePage.prototype.select_state = function (ind) {
        if (!this.area.state.data[ind])
            return null;
        this.area.state.selected = this.area.state.data[ind]._id;
        this.getDistricts();
    };
    WelcomePage.prototype.back = function () {
        this.navCtrl.setRoot(HomePage);
    };
    WelcomePage = __decorate([
        IonicPage(),
        Component({
            selector: "page-welcome",
            templateUrl: "welcome.html",
        }),
        __metadata("design:paramtypes", [NavController,
            CommonProvider,
            APIService,
            UserProvider,
            CenterProvider])
    ], WelcomePage);
    return WelcomePage;
}());
export { WelcomePage };
//# sourceMappingURL=welcome.js.map