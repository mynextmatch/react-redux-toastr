'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toastr = {};
toastr.newestOnTop = true;
toastr.timeOut = 5000;
toastr.transitionIn = 'bounceIn';
toastr.transitionOut = 'bounceOut';

var confirm = {};
confirm.transitionIn = 'bounceInDown';
confirm.transitionOut = 'bounceOutUp';
confirm.okText = 'ok';
confirm.cancelText = 'cancel';

var config = {
  toastr: toastr,
  confirm: confirm
};

exports.default = config;