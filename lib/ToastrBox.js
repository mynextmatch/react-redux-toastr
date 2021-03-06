'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _CSSCore = require('fbjs/lib/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } //  eslint-disable-line no-unused-vars


var ToastrBox = function (_Component) {
  _inherits(ToastrBox, _Component);

  function ToastrBox(props) {
    _classCallCheck(this, ToastrBox);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _initialiseProps.call(_this);

    var options = props.item.options;

    _this.isHiding = false;
    _this.intervalId = null;
    _this.transitionIn = options.transitionIn || _config2.default.toastr.transitionIn;
    _this.transitionOut = options.transitionOut || _config2.default.toastr.transitionOut;
    return _this;
  }

  ToastrBox.prototype.componentDidMount = function componentDidMount() {
    var item = this.props.item;
    var timeOut = item.options.timeOut;

    if (typeof timeOut === 'undefined' && item.type !== 'message') {
      timeOut = _config2.default.timeOut;
    }

    if (timeOut) {
      this._setIntervalId(setTimeout(this._removeToastr, timeOut));
    }

    this._setTransition();
    (0, _utils.onCSSTransitionEnd)(this.toastrBox, this._onAnimationComplete);
  };

  ToastrBox.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  };

  ToastrBox.prototype.handleClick = function handleClick() {
    this._removeToastr();
  };

  ToastrBox.prototype.mouseEnter = function mouseEnter() {
    clearTimeout(this.intervalId);
    this._setIntervalId(null);
    this._setIsHiding(false);
  };

  ToastrBox.prototype.mouseLeave = function mouseLeave() {
    if (this.isHiding || this.props.item.type !== 'message') {
      this._setIntervalId(setTimeout(this._removeToastr, 1000));
    }
  };

  ToastrBox.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      {
        ref: function ref(_ref) {
          return _this2.toastrBox = _ref;
        },
        className: (0, _classnames2.default)('toastr', 'animated', this.props.item.type, this.props.item.options.icon, this.props.item.options.className),
        onMouseEnter: this.mouseEnter.bind(this),
        onMouseLeave: this.mouseLeave.bind(this),
        onClick: this.handleClick.bind(this)
      },
      _react2.default.createElement(
        'div',
        { className: 'message-holder' },
        this.props.item.title && _react2.default.createElement(
          'div',
          { className: 'title' },
          this.props.item.title
        ),
        this.props.item.message && _react2.default.createElement(
          'div',
          { className: 'message' },
          this.props.item.message
        ),
        this.props.item.options.component && _react2.default.createElement(
          'div',
          { className: 'message' },
          this._renderSubComponent(this.props.item.options.component)
        )
      )
    );
  };

  return ToastrBox;
}(_react.Component);

ToastrBox.displayName = 'ToastrBox';
ToastrBox.propTypes = {
  item: _react.PropTypes.object.isRequired
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this._onAnimationComplete = function () {
    var _props = _this3.props;
    var remove = _props.remove;
    var item = _props.item;
    var options = item.options;
    var id = item.id;


    if (_this3.isHiding) {
      _this3._setIsHiding(false);
      remove(id);
      if (options.onHideComplete) {
        options.onHideComplete();
      }
    } else if (!_this3.isHiding && options.onShowComplete) {
      options.onShowComplete();
    }
  };

  this._removeToastr = function () {
    if (!_this3.isHiding) {
      _this3._setIsHiding(true);
      _this3._setTransition(true);
      (0, _utils.onCSSTransitionEnd)(_this3.toastrBox, _this3._onAnimationComplete);
    }
  };

  this._setTransition = function (hide) {
    var node = _this3.toastrBox;
    var animationType = hide ? _this3.transitionOut : _this3.transitionIn;

    var onEndListener = function onEndListener(e) {
      if (e && e.target == node) {
        _CSSCore2.default.removeClass(node, animationType);
      }
    };

    (0, _utils.onCSSTransitionEnd)(_this3.toastrBox, onEndListener);
    _CSSCore2.default.addClass(node, animationType);
  };

  this._clearTransition = function () {
    var node = _this3.toastrBox;
    _CSSCore2.default.removeClass(node, _this3.transitionIn);
    _CSSCore2.default.removeClass(node, _this3.transitionOut);
  };

  this._setIntervalId = function (intervalId) {
    _this3.intervalId = intervalId;
  };

  this._setIsHiding = function (val) {
    _this3.isHiding = val;
  };

  this._renderSubComponent = function (SubComponent) {
    var removeCurrentToastrFunc = function removeCurrentToastrFunc() {
      return _this3.props.remove(_this3.props.item.id);
    };

    if ((0, _react.isValidElement)(SubComponent)) {
      return _react2.default.cloneElement(SubComponent, {
        remove: removeCurrentToastrFunc
      });
    }

    return _react2.default.createElement(SubComponent, { remove: removeCurrentToastrFunc });
  };
};

exports.default = ToastrBox;