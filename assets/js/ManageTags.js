"use strict";
(globalThis["webpackChunkbetterlinks"] = globalThis["webpackChunkbetterlinks"] || []).push([["ManageTags"],{

/***/ "./dev_betterlinks/components/ActionButton/index.js":
/*!**********************************************************!*\
  !*** ./dev_betterlinks/components/ActionButton/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ActionButton)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var propTypes = {
  type: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  label: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  onClickHandler: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)
};
function ActionButton(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? '' : _ref$type,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? '' : _ref$label,
    _ref$onClickHandler = _ref.onClickHandler,
    onClickHandler = _ref$onClickHandler === void 0 ? function () {} : _ref$onClickHandler,
    children = _ref.children;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "btl-tooltip"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "dnd-link-button",
    onClick: onClickHandler
  }, children ? children : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "btl btl-".concat(type)
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "btl-tooltiptext"
  }, label)));
}
ActionButton.propTypes = propTypes;

/***/ }),

/***/ "./dev_betterlinks/components/Loader/TableLoader.js":
/*!**********************************************************!*\
  !*** ./dev_betterlinks/components/Loader/TableLoader.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-content-loader */ "./node_modules/react-content-loader/dist/react-content-loader.es.js");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


var TableLoader = function TableLoader(props) {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_content_loader__WEBPACK_IMPORTED_MODULE_2__["default"], _objectSpread({
    speed: 2,
    width: '100%',
    height: '100%',
    viewBox: "0 0 532 148",
    backgroundColor: "#e8e8e8",
    foregroundColor: "#c2c2c2"
  }, props), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "2",
    rx: "0",
    ry: "0",
    width: "530",
    height: "11"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "3",
    y: "21",
    rx: "0",
    ry: "0",
    width: "527",
    height: "10"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "46",
    rx: "0",
    ry: "0",
    width: "530",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "61",
    rx: "0",
    ry: "0",
    width: "530",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "76",
    rx: "0",
    ry: "0",
    width: "530",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "91",
    rx: "0",
    ry: "0",
    width: "530",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "106",
    rx: "0",
    ry: "0",
    width: "530",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "1",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "107"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "529",
    y: "2",
    rx: "0",
    ry: "0",
    width: "3",
    height: "106"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "2",
    y: "8",
    rx: "0",
    ry: "0",
    width: "8",
    height: "16"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "25",
    y: "8",
    rx: "0",
    ry: "0",
    width: "84",
    height: "17"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "144",
    y: "10",
    rx: "0",
    ry: "0",
    width: "83",
    height: "14"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "264",
    y: "9",
    rx: "0",
    ry: "0",
    width: "77",
    height: "16"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "476",
    y: "8",
    rx: "0",
    ry: "0",
    width: "54",
    height: "18"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "374",
    y: "8",
    rx: "0",
    ry: "0",
    width: "71",
    height: "16"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "10",
    y: "39",
    rx: "0",
    ry: "0",
    width: "16",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "110",
    y: "38",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "227",
    y: "38",
    rx: "0",
    ry: "0",
    width: "65",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "341",
    y: "38",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "38",
    rx: "0",
    ry: "0",
    width: "54",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "10",
    y: "55",
    rx: "0",
    ry: "0",
    width: "16",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "110",
    y: "54",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "227",
    y: "54",
    rx: "0",
    ry: "0",
    width: "58",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "341",
    y: "54",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "54",
    rx: "0",
    ry: "0",
    width: "49",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "10",
    y: "70",
    rx: "0",
    ry: "0",
    width: "16",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "110",
    y: "69",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "227",
    y: "69",
    rx: "0",
    ry: "0",
    width: "60",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "341",
    y: "69",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "68",
    rx: "0",
    ry: "0",
    width: "56",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "10",
    y: "85",
    rx: "0",
    ry: "0",
    width: "16",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "110",
    y: "84",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "227",
    y: "84",
    rx: "0",
    ry: "0",
    width: "54",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "341",
    y: "84",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "84",
    rx: "0",
    ry: "0",
    width: "45",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "10",
    y: "100",
    rx: "0",
    ry: "0",
    width: "16",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "110",
    y: "99",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "227",
    y: "99",
    rx: "0",
    ry: "0",
    width: "58",
    height: "3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "341",
    y: "99",
    rx: "0",
    ry: "0",
    width: "39",
    height: "2"
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("rect", {
    x: "445",
    y: "99",
    rx: "0",
    ry: "0",
    width: "54",
    height: "3"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableLoader);

/***/ }),

/***/ "./dev_betterlinks/containers/AddNewTags/TagModal.js":
/*!***********************************************************!*\
  !*** ./dev_betterlinks/containers/AddNewTags/TagModal.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }




var tagModalStyles = _objectSpread(_objectSpread({}, _utils_helper__WEBPACK_IMPORTED_MODULE_3__.modalCustomStyles), {}, {
  content: _objectSpread(_objectSpread({}, _utils_helper__WEBPACK_IMPORTED_MODULE_3__.modalCustomStyles.content), {}, {
    maxWidth: '500px',
    padding: '60px 60px 30px 60px'
  })
});
var TagModal = function TagModal(_ref) {
  var open = _ref.open,
    errorMsg = _ref.errorMsg,
    closeModal = _ref.closeModal,
    __handleChange = _ref.__handleChange,
    __handleSubmit = _ref.__handleSubmit,
    row = _ref.row;
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_2___default()), {
    isOpen: open,
    onRequestClose: closeModal,
    style: tagModalStyles,
    ariaHideApp: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-close-modal",
    onClick: closeModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl btl-cancel"
  })), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_5__.Formik, {
    initialValues: {
      term_slug: row.term_slug || '',
      term_name: row.term_name || '',
      term_id: row.id || null
    },
    onSubmit: function onSubmit(values, actions) {
      return __handleSubmit(values, actions);
    }
  }, function (props) {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_5__.Form, {
      className: "w-100 btl-manage-tags-form",
      onSubmit: props.handleSubmit
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-entry-content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-entry-content-left",
      style: {
        marginBottom: '20px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      className: "btl-modal-form-label",
      htmlFor: "tags"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Tag', 'betterlinks'), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      style: {
        color: '#f97272',
        marginLeft: '2px'
      }
    }, "*")), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      style: {
        width: '100%'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(formik__WEBPACK_IMPORTED_MODULE_5__.Field, {
      id: "term_slug",
      className: "btl-modal-form-control",
      type: "text",
      name: "term_slug",
      required: true,
      onChange: function onChange(e) {
        return __handleChange(e, props);
      },
      autoFocus: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
      className: "btl_duplicate_tags",
      style: {
        color: 'red',
        height: '5px',
        display: 'block'
      }
    }, errorMsg))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
      className: "btl-modal-form-group"
    }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("label", {
      className: "btl-modal-form-label"
    }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
      type: "submit",
      className: "btl-modal-submit-button",
      disabled: '' !== errorMsg && '' !== props.values.term_slug
    }, row !== null && row !== void 0 && row.term_slug ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Update', 'betterlinks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Publish', 'betterlinks'))))));
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TagModal);

/***/ }),

/***/ "./dev_betterlinks/containers/AddNewTags/TagQuickAction.js":
/*!*****************************************************************!*\
  !*** ./dev_betterlinks/containers/AddNewTags/TagQuickAction.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ActionButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/ActionButton */ "./dev_betterlinks/components/ActionButton/index.js");





var TagQuickAction = function TagQuickAction(_ref) {
  var delete_tag = _ref.delete_tag,
    children = _ref.children;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    isOpenDeleteBox = _useState2[0],
    setIsOpenDeleteBox = _useState2[1];
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-list-view-action-wrapper"
  }, isOpenDeleteBox ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-confirm-message"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "action-text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are You Sure?', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "action-set"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "action yes",
    onClick: delete_tag
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Yes', 'betterlinks')), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "action no",
    onClick: function onClick() {
      return setIsOpenDeleteBox(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No', 'betterlinks')))) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, children, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_ActionButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClickHandler: setIsOpenDeleteBox,
    type: "delete",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete Tag', 'betterlinks')
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TagQuickAction);

/***/ }),

/***/ "./dev_betterlinks/containers/AddNewTags/index.js":
/*!********************************************************!*\
  !*** ./dev_betterlinks/containers/AddNewTags/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../redux/actions/terms.actions */ "./dev_betterlinks/redux/actions/terms.actions.js");
/* harmony import */ var _TagModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TagModal */ "./dev_betterlinks/containers/AddNewTags/TagModal.js");
/* harmony import */ var _components_ActionButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/ActionButton */ "./dev_betterlinks/components/ActionButton/index.js");









var AddNewTags = function AddNewTags(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
    errorMsg = _useState4[0],
    setErrorMsg = _useState4[1];
  var tags = props.tags,
    _props$icon = props.icon,
    icon = _props$icon === void 0 ? false : _props$icon,
    _props$row = props.row,
    row = _props$row === void 0 ? {} : _props$row,
    children = props.children;
  var openModal = function openModal() {
    setOpen(true);
  };
  var closeModal = function closeModal() {
    setOpen(false);
  };
  var __handleChange = function __handleChange(e, props) {
    var value = e.target.value;
    var isExist = (tags || []).some(function (item) {
      return item.term_slug === value;
    });
    props.setFieldValue('term_slug', value);
    if (!!isExist) {
      return setErrorMsg((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tag already exist', 'betterlinks'));
    }
    setErrorMsg('');
  };
  var __handleSubmit = function __handleSubmit(values, actions) {
    if ('' === values.term_slug) {
      return setErrorMsg((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Tag field can't be empty", 'betterlinks'));
    }
    var data = {
      ID: (row === null || row === void 0 ? void 0 : row.ID) || values.term_id,
      term_name: values.term_slug,
      term_slug: values.term_slug,
      term_type: 'tags'
    };
    props.add_new_tag(data);
    closeModal();
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (tags || []).length > 0 && icon ? (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_components_ActionButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
    type: "edit",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit Tag', 'betterlinks'),
    onClickHandler: openModal
  }, children) : (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-create-autolinks btl-create-tags"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "btl-create-autolink-button btl-create-tags-button",
    onClick: openModal
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add New Tag', 'betterlinks'))), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(_TagModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
    open: open,
    errorMsg: errorMsg,
    closeModal: closeModal,
    __handleChange: __handleChange,
    __handleSubmit: __handleSubmit,
    row: row
  }));
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    add_new_tag: (0,redux__WEBPACK_IMPORTED_MODULE_7__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_4__.add_new_tag, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(null, mapDispatchToProps)(AddNewTags));

/***/ }),

/***/ "./dev_betterlinks/containers/DeleteClicks.js":
/*!****************************************************!*\
  !*** ./dev_betterlinks/containers/DeleteClicks.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _redux_actions_clicks_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../redux/actions/clicks.actions */ "./dev_betterlinks/redux/actions/clicks.actions.js");
/* harmony import */ var _redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../redux/actions/links.actions */ "./dev_betterlinks/redux/actions/links.actions.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");











var deleteClicksOptions = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete All', 'betterlinks'),
  value: false
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete clicks older than 30 days', 'betterlinks'),
  value: 30
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete clicks older than 90 days', 'betterlinks'),
  value: 90
}];
var DeleteClicks = function DeleteClicks(_ref) {
  var fetchCustomClicksData = _ref.fetchCustomClicksData,
    dispatch_new_links_data = _ref.dispatch_new_links_data,
    propsForAnalytics = _ref.propsForAnalytics;
  var _ref2 = propsForAnalytics || {},
    customDateFilter = _ref2.customDateFilter;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    timeOutIdToClear = _useState2[0],
    setTimeOutIdToClear = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
    modalIsOpen = _useState4[0],
    setModalIsOpen = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
    successfulDeletedItemsCount = _useState6[0],
    setSuccessfulDeletedItemsCount = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('reset_modal_step_1'),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState7, 2),
    deleteStatus = _useState8[0],
    setDeleteStatus = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(deleteClicksOptions[0]),
    _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState9, 2),
    currentDaysOlderThan = _useState10[0],
    setCurrentDaysOlderThan = _useState10[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (modalIsOpen) {
      var _document;
      (_document = document) === null || _document === void 0 || (_document = _document.body) === null || _document === void 0 || (_document = _document.classList) === null || _document === void 0 || _document.add('betterlinks-delete-clicks-modal-popup-opened');
    } else {
      var _document2;
      (_document2 = document) === null || _document2 === void 0 || (_document2 = _document2.body) === null || _document2 === void 0 || (_document2 = _document2.classList) === null || _document2 === void 0 || _document2.remove('betterlinks-delete-clicks-modal-popup-opened');
    }
    return function () {
      var _document3;
      (_document3 = document) === null || _document3 === void 0 || (_document3 = _document3.body) === null || _document3 === void 0 || (_document3 = _document3.classList) === null || _document3 === void 0 || _document3.remove('betterlinks-delete-clicks-modal-popup-opened');
    };
  }, [modalIsOpen]);
  var close = function close() {
    clearTimeout(timeOutIdToClear);
    setDeleteStatus('reset_modal_step_1');
    setModalIsOpen(false);
    setCurrentDaysOlderThan(deleteClicksOptions[0]);
  };
  var handleConfirmDelete = function handleConfirmDelete() {
    if (!customDateFilter) return;
    var from = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.formatDate)(customDateFilter[0].startDate, 'yyyy-mm-dd');
    var to = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.formatDate)(customDateFilter[0].endDate, 'yyyy-mm-dd');
    setDeleteStatus('deleting');
    var daysOlderThan = (currentDaysOlderThan === null || currentDaysOlderThan === void 0 ? void 0 : currentDaysOlderThan.value) || false;
    (0,_utils_helper__WEBPACK_IMPORTED_MODULE_4__.deleteClicks)(daysOlderThan, from, to).then(function (res) {
      var _res$data;
      var timeoutId = setTimeout(function () {
        close();
      }, 3000);
      setTimeOutIdToClear(timeoutId);
      if (res !== null && res !== void 0 && (_res$data = res.data) !== null && _res$data !== void 0 && _res$data.success) {
        var _res$data2, _res$data3, _res$data4;
        setSuccessfulDeletedItemsCount(res === null || res === void 0 || (_res$data2 = res.data) === null || _res$data2 === void 0 || (_res$data2 = _res$data2.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.count);
        fetchCustomClicksData({
          data: res === null || res === void 0 || (_res$data3 = res.data) === null || _res$data3 === void 0 || (_res$data3 = _res$data3.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.new_clicks_data
        });
        dispatch_new_links_data({
          data: res === null || res === void 0 || (_res$data4 = res.data) === null || _res$data4 === void 0 || (_res$data4 = _res$data4.data) === null || _res$data4 === void 0 ? void 0 : _res$data4.new_links_data
        });
        setDeleteStatus('success');
      } else {
        setDeleteStatus('failed');
      }
    })["catch"](function (err) {
      console.log('---caught error on DeleteClicks', {
        err: err
      });
      var timeoutId = setTimeout(function () {
        close();
      }, 3000);
      setTimeOutIdToClear(timeoutId);
    });
  };
  var handleResetButtonClick1 = function handleResetButtonClick1() {
    setModalIsOpen(true);
    setDeleteStatus('reset_modal_step_1');
  };
  var handleResetButtonClick2 = function handleResetButtonClick2() {
    setDeleteStatus('reset_modal_step_2');
  };
  var handleDeleteOptionsChange = function handleDeleteOptionsChange(value) {
    setCurrentDaysOlderThan(value);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-analytic-reset-wrapeer betterlinks"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "button-primary btl-reset-analytics-initial-button",
    onClick: handleResetButtonClick1
  }, "Reset"), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)((react_modal__WEBPACK_IMPORTED_MODULE_7___default()), {
    isOpen: modalIsOpen,
    onRequestClose: close,
    ariaHideApp: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-reset-modal-popup-wrapper "
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "btl-close-modal",
    onClick: close
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("i", {
    className: "btl btl-cancel"
  })), deleteStatus === 'reset_modal_step_1' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-reset-modal-popup btl-reset-modal-popup-step-1 betterlinks-body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, "Pick the range of BetterLinks Analytics that you want to reset."), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "select_apply"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "btl-modal-select--full ",
    classNamePrefix: "btl-react-select",
    onChange: handleDeleteOptionsChange,
    options: deleteClicksOptions,
    value: currentDaysOlderThan,
    isMulti: false
  }), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "button-primary btl-btn-reset-analytics btl-btn-reset-apply-1",
    onClick: handleResetButtonClick2
  }, "Apply"))), deleteStatus === 'reset_modal_step_2' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-reset-modal-popup btl-reset-modal-popup-step-2 betterlinks-body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, "This Action Cannot be undone. Are you sure you want to continue?"), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h4", null, "Clicking ", (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      fontWeight: 700
    }
  }, "Reset Clicks"), " will permanently delete the clicks data from database and it cannot be restored again.", (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    style: {
      display: 'Block'
    }
  }, "Click 'cancel' to abort.")), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "btl-btn-reset-popup-step-2-buttons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "button-primary btl-btn-reset-apply-2",
    onClick: handleConfirmDelete
  }, "Reset Clicks"), (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "button-primary btl-btn-reset-cancel",
    onClick: function onClick() {
      return setDeleteStatus('reset_modal_step_1');
    }
  }, "Cancel"))), deleteStatus === 'deleting' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, "Deleting..."), deleteStatus === 'success' && successfulDeletedItemsCount !== 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, "Success!!! ", (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "success_delete_count"
  }, successfulDeletedItemsCount), " clicks record Deleted!!!"), deleteStatus === 'success' && successfulDeletedItemsCount === 0 && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, (currentDaysOlderThan === null || currentDaysOlderThan === void 0 ? void 0 : currentDaysOlderThan.value) === false && "You don't have any clicks data", (currentDaysOlderThan === null || currentDaysOlderThan === void 0 ? void 0 : currentDaysOlderThan.value) === 30 && "You don't have clicks data older than 30 days", (currentDaysOlderThan === null || currentDaysOlderThan === void 0 ? void 0 : currentDaysOlderThan.value) === 90 && "You don't have clicks data older than 90 days"), deleteStatus === 'failed' && (0,react__WEBPACK_IMPORTED_MODULE_1__.createElement)("h2", null, "Failed!!"))));
};
var mapStateToProps = function mapStateToProps() {
  return {};
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchCustomClicksData: (0,redux__WEBPACK_IMPORTED_MODULE_9__.bindActionCreators)(_redux_actions_clicks_actions__WEBPACK_IMPORTED_MODULE_5__.fetchCustomClicksData, dispatch),
    dispatch_new_links_data: (0,redux__WEBPACK_IMPORTED_MODULE_9__.bindActionCreators)(_redux_actions_links_actions__WEBPACK_IMPORTED_MODULE_6__.dispatch_new_links_data, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDispatchToProps)(DeleteClicks));

/***/ }),

/***/ "./dev_betterlinks/containers/TopBar.js":
/*!**********************************************!*\
  !*** ./dev_betterlinks/containers/TopBar.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");
/* harmony import */ var _redux_actions_activity_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../redux/actions/activity.actions */ "./dev_betterlinks/redux/actions/activity.actions.js");
/* harmony import */ var _redux_actions_favouritesort_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../redux/actions/favouritesort.actions */ "./dev_betterlinks/redux/actions/favouritesort.actions.js");
/* harmony import */ var _DeleteClicks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DeleteClicks */ "./dev_betterlinks/containers/DeleteClicks.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Badge/ProBadge */ "./dev_betterlinks/components/Badge/ProBadge.js");


var _excluded = ["is_pro", "render"];











var propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().string),
  render: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func)
};
var TopBar = function TopBar(_ref) {
  var _ref$is_pro = _ref.is_pro,
    is_pro = _ref$is_pro === void 0 ? false : _ref$is_pro,
    _ref$render = _ref.render,
    render = _ref$render === void 0 ? function () {} : _ref$render,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  var propsForAnalytics = props.propsForAnalytics;
  var mode = props.activity.darkMode;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(mode),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    isDarkMode = _useState2[0],
    setIsDarkMode = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (mode) {
      document.body.classList.add('betterlinks-dark-mode');
    } else {
      document.body.classList.remove('betterlinks-dark-mode');
    }
  }, []);
  var darkModeHandler = function darkModeHandler(mode) {
    if (mode) {
      document.body.classList.add('betterlinks-dark-mode');
    } else {
      document.body.classList.remove('betterlinks-dark-mode');
    }
    props.update_theme_mode(mode);
    setIsDarkMode(mode);
  };
  var currentPage = betterLinksQuery.get('page');
  var sortByFav = props.favouriteSort.sortByFav;
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "topbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "topbar__logo_container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "topbar__logo"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("img", {
    src: _utils_helper__WEBPACK_IMPORTED_MODULE_5__.plugin_root_url + "assets/images/logo-large".concat(isDarkMode ? '-white' : '', ".svg"),
    alt: "logo"
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "topbar__logo__text"
  }, props.label), is_pro && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_9__["default"], null)), render()), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "topbar-inner"
  }, currentPage === 'betterlinks' && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-view-control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Favorite Links', 'betterlinks'),
    className: "btl-link-view-toggler btl-sortby-fav ".concat(sortByFav ? 'active' : ''),
    onClick: function onClick() {
      return props.sortFavourite(!sortByFav);
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "favorite-svg",
    viewBox: "0 0 512 512",
    xmlSpace: "preserve"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("path", {
    className: "fav-icon-svg-path",
    d: "M392.2 317.5c-3 2.9-4.4 7.1-3.7 11.3L414 477.4c1.2 7-3.5 13.6-10.5 14.9-2.8.5-5.6 0-8.1-1.3L262 420.9c-3.7-2-8.2-2-12 0L116.6 491c-3.1 1.7-6.8 1.9-10.1.8-6-2.1-9.5-8.1-8.5-14.4l25.4-148.5c.7-4.2-.7-8.4-3.7-11.4L11.9 212.4c-5.1-5-5.2-13.1-.2-18.2 2-2 4.6-3.3 7.3-3.7l149.1-21.7c4.2-.6 7.8-3.2 9.7-7l66.7-135c2.6-5.3 8.4-8.1 14.2-6.9 3.9.7 7.2 3.3 8.9 6.9l66.7 135c1.9 3.8 5.5 6.4 9.7 7l149 21.6c7 1 11.9 7.6 10.9 14.6-.4 2.7-1.7 5.3-3.7 7.2l-108 105.3z"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('List View', 'betterlinks'),
    className: "btl-link-view-toggler ".concat(props.activity.linksView == 'list' ? 'active' : ''),
    onClick: function onClick() {
      return props.linksView('list');
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-list"
  })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Grid View', 'betterlinks'),
    className: "btl-link-view-toggler ".concat(props.activity.linksView == 'grid' ? 'active' : ''),
    onClick: function onClick() {
      return props.linksView('grid');
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-grid"
  })))), (propsForAnalytics === null || propsForAnalytics === void 0 ? void 0 : propsForAnalytics.isResetAnalytics) && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_DeleteClicks__WEBPACK_IMPORTED_MODULE_8__["default"], {
    propsForAnalytics: propsForAnalytics
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("label", {
    className: "theme-mood-button",
    htmlFor: "theme-mood",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Theme Mode', 'betterlinks')
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    type: "checkbox",
    name: "theme-mood",
    id: "theme-mood",
    value: isDarkMode,
    onChange: function onChange() {
      return darkModeHandler(!isDarkMode);
    },
    checked: isDarkMode
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "theme-mood"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-sun"
  })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("i", {
    className: "btl btl-moon"
  }))))));
};
TopBar.propTypes = propTypes;
// TopBar.defaultProps = defaultProps;

var mapStateToProps = function mapStateToProps(state) {
  return {
    activity: state.activity,
    favouriteSort: state.favouriteSort
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    linksView: (0,redux__WEBPACK_IMPORTED_MODULE_11__.bindActionCreators)(_redux_actions_activity_actions__WEBPACK_IMPORTED_MODULE_6__.linksView, dispatch),
    sortFavourite: (0,redux__WEBPACK_IMPORTED_MODULE_11__.bindActionCreators)(_redux_actions_favouritesort_actions__WEBPACK_IMPORTED_MODULE_7__.sortFavourite, dispatch),
    update_theme_mode: (0,redux__WEBPACK_IMPORTED_MODULE_11__.bindActionCreators)(_redux_actions_activity_actions__WEBPACK_IMPORTED_MODULE_6__.update_theme_mode, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDispatchToProps)(TopBar));

/***/ }),

/***/ "./dev_betterlinks/pages/ManageTags.js":
/*!*********************************************!*\
  !*** ./dev_betterlinks/pages/ManageTags.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../redux/actions/terms.actions */ "./dev_betterlinks/redux/actions/terms.actions.js");
/* harmony import */ var _containers_TopBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../containers/TopBar */ "./dev_betterlinks/containers/TopBar.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _containers_AddNewTags__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../containers/AddNewTags */ "./dev_betterlinks/containers/AddNewTags/index.js");
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-data-table-component */ "./node_modules/react-data-table-component/dist/index.cjs.js");
/* harmony import */ var _components_Loader_TableLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Loader/TableLoader */ "./dev_betterlinks/components/Loader/TableLoader.js");
/* harmony import */ var _containers_AddNewTags_TagQuickAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../containers/AddNewTags/TagQuickAction */ "./dev_betterlinks/containers/AddNewTags/TagQuickAction.js");
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.esm.js");
/* harmony import */ var react_router_dom_cjs_react_router_dom_min__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom/cjs/react-router-dom.min */ "./node_modules/react-router-dom/cjs/react-router-dom.min.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }














var ManageTags = function ManageTags(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({}),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    bulkActionData = _useState2[0],
    setBulkActionData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
    toggledClearRows = _useState4[0],
    setToggleClearRows = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(''),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState5, 2),
    searchText = _useState6[0],
    setSearchText = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState7, 2),
    selectedClicksType = _useState8[0],
    setClicksType = _useState8[1];
  var _props$terms = props.terms,
    tags = _props$terms.tags,
    tag_analytics = _props$terms.tag_analytics;
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (!tags) {
      props.fetch_all_tags();
      props.fetch_terms_data();
    }
  }, []);
  var columns = [{
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Tags', 'betterlinks'),
    selector: 'tags',
    sortable: false,
    cell: function cell(row) {
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_containers_AddNewTags__WEBPACK_IMPORTED_MODULE_7__["default"], {
        tags: tags || [],
        icon: true,
        row: row
      }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
        style: {
          textDecoration: 'underline'
        }
      }, row.term_name));
    }
  }, _objectSpread(_objectSpread({
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Link Count', 'betterlinks'),
    selector: 'link_count'
  }, _utils_helper__WEBPACK_IMPORTED_MODULE_11__.is_extra_data_tracking_compatible && {
    sortFunction: (0,_utils_helper__WEBPACK_IMPORTED_MODULE_11__.sortFunction)('link_count')
  }), {}, {
    cell: function cell(row) {
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, +((row === null || row === void 0 ? void 0 : row.link_count) || 0));
    }
  }), {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Analytics', 'betterlinks'),
    selector: 'link_count',
    sortable: false,
    cell: function cell(row) {
      var _tag_analytics$total_, _tag_analytics$unique;
      var total_clicks = (tag_analytics === null || tag_analytics === void 0 || (_tag_analytics$total_ = tag_analytics['total_clicks']) === null || _tag_analytics$total_ === void 0 ? void 0 : _tag_analytics$total_[row.id]) || 0;
      var unique_clicks = (tag_analytics === null || tag_analytics === void 0 || (_tag_analytics$unique = tag_analytics['unique_clicks']) === null || _tag_analytics$unique === void 0 ? void 0 : _tag_analytics$unique[row.id]) || 0;
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
        className: "dnd-link-button btl-tooltip"
      }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
        className: "btl-tooltiptext"
      }, "Clicks: ", total_clicks, " / Unique Clicks: ", unique_clicks), total_clicks > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react_router_dom_cjs_react_router_dom_min__WEBPACK_IMPORTED_MODULE_12__.Link, {
        to: _utils_helper__WEBPACK_IMPORTED_MODULE_11__.route_path + 'admin.php?page=betterlinks-analytics&tag_id=' + row.id
      }, total_clicks, "/", unique_clicks) : (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", null, total_clicks, "/", unique_clicks)));
    }
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Action', 'betterlinks'),
    selector: 'link_count',
    sortable: false,
    cell: function cell(row) {
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_containers_AddNewTags_TagQuickAction__WEBPACK_IMPORTED_MODULE_10__["default"], {
        delete_tag: function delete_tag() {
          return props.delete_tag([{
            tag_id: row.id || row.ID
          }]);
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_containers_AddNewTags__WEBPACK_IMPORTED_MODULE_7__["default"], {
        tags: tags || [],
        icon: true,
        row: row
      }));
    }
  }];
  var __handleSearch = function __handleSearch(e) {
    setSearchText(e.target.value);
  };
  var getFilteredTags = function getFilteredTags() {
    var _ref;
    var regex = new RegExp(searchText, 'gi');
    var matchedTags = (_ref = tags || []) === null || _ref === void 0 ? void 0 : _ref.filter(function (item) {
      return ((item === null || item === void 0 ? void 0 : item.term_slug) || '').match(regex);
    });
    var sortedTags = (0,_utils_helper__WEBPACK_IMPORTED_MODULE_11__.sortByClicksTag)(selectedClicksType === null || selectedClicksType === void 0 ? void 0 : selectedClicksType.value, matchedTags, tag_analytics);
    return Array.isArray(sortedTags) ? sortedTags : tags;
  };
  var subHeaderComponent = (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(TagActions, {
    bulkActionData: bulkActionData,
    setToggledClearRows: function setToggledClearRows() {
      return setToggleClearRows(!toggledClearRows);
    },
    delete_tag: props.delete_tag
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-autolink-filter btl-click-filter"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("input", {
    id: "search_autolink",
    type: "search",
    placeholder: "Search Tags",
    value: searchText,
    onChange: __handleSearch
  })), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_13__["default"], {
    className: "btl-list-view-select btl-shortable-filter",
    classNamePrefix: "btl-react-select",
    placeholder: "Sort by Clicks",
    options: [{
      value: 'total_clicks-desc',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Most Clicks', 'betterlinks')
    }, {
      value: 'total_clicks-asc',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Least Clicks', 'betterlinks')
    }, {
      value: 'unique_clicks-desc',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Most Unique Clicks', 'betterlinks')
    }, {
      value: 'unique_clicks-asc',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Least Unique Clicks', 'betterlinks')
    }],
    value: selectedClicksType,
    onChange: function onChange(e) {
      return setClicksType(e);
    },
    isClearable: true
  }));
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_containers_TopBar__WEBPACK_IMPORTED_MODULE_5__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Manage Tags', 'betterlinks'),
    render: function render() {
      return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_containers_AddNewTags__WEBPACK_IMPORTED_MODULE_7__["default"], {
        tags: tags
      });
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-list-view"
  }, tags ? (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react_data_table_component__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "btl-list-view-table",
    columns: columns,
    data: getFilteredTags(),
    pagination: true,
    subHeader: true,
    highlightOnHover: true,
    subHeaderComponent: subHeaderComponent,
    persistTableHead: true,
    selectableRows: true,
    selectableRowsVisibleOnly: true,
    onSelectedRowsChange: function onSelectedRowsChange(e) {
      return setBulkActionData(e);
    },
    clearSelectedRows: toggledClearRows
  }) : (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(_components_Loader_TableLoader__WEBPACK_IMPORTED_MODULE_9__["default"], null))));
};
var TagActions = function TagActions(props) {
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({}),
    _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState9, 2),
    bulkAction = _useState10[0],
    setBulkAction = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState12 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState11, 2),
    warning = _useState12[0],
    setWarning = _useState12[1];
  var handleDeleteTags = function handleDeleteTags(bulkActionData) {
    if (bulkAction.value !== 'delete') return setWarning(true);
    setWarning(false);
    var selectedTags = bulkActionData.selectedRows.map(function (item) {
      return {
        tag_id: item.id || item.ID
      };
    });
    props.delete_tag(selectedTags, bulkAction);
    setBulkAction({});
    return props.setToggledClearRows();
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(React.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-links-filter"
  }, props.bulkActionData && props.bulkActionData.selectedCount > 0 && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-bulk-actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)(react_select__WEBPACK_IMPORTED_MODULE_13__["default"], {
    className: "btl-list-view-select",
    classNamePrefix: "btl-react-select",
    defaultValue: {
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Bulk Actions', 'betterlinks')
    },
    value: bulkAction !== null && bulkAction !== void 0 && bulkAction.value ? bulkAction : {
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Bulk Actions', 'betterlinks')
    },
    options: [{
      value: 'delete',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Delete', 'betterlinks')
    }],
    onChange: function onChange(e) {
      return setBulkAction(e);
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "btl-tooltip"
  }, (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("button", {
    className: "btl-link-apply-button",
    onClick: function onClick() {
      return handleDeleteTags(props.bulkActionData);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Apply', 'betterlinks')), warning && (bulkAction === null || bulkAction === void 0 ? void 0 : bulkAction.value) !== 'delete' && (0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("span", {
    className: "btl-tooltiptext"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Please Select Action', 'betterlinks')))), props.children));
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    terms: state.terms
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetch_all_tags: (0,redux__WEBPACK_IMPORTED_MODULE_14__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_4__.fetch_all_tags, dispatch),
    fetch_terms_data: (0,redux__WEBPACK_IMPORTED_MODULE_14__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_4__.fetch_terms_data, dispatch),
    delete_tag: (0,redux__WEBPACK_IMPORTED_MODULE_14__.bindActionCreators)(_redux_actions_terms_actions__WEBPACK_IMPORTED_MODULE_4__.delete_tag, dispatch)
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(mapStateToProps, mapDispatchToProps)(ManageTags));

/***/ }),

/***/ "./node_modules/react-content-loader/dist/react-content-loader.es.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-content-loader/dist/react-content-loader.es.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BulletList: () => (/* binding */ ReactContentLoaderBulletList),
/* harmony export */   Code: () => (/* binding */ ReactContentLoaderCode),
/* harmony export */   Facebook: () => (/* binding */ ReactContentLoaderFacebook),
/* harmony export */   Instagram: () => (/* binding */ ReactContentLoaderInstagram),
/* harmony export */   List: () => (/* binding */ ReactContentLoaderListStyle),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var uid = (function () {
    return Math.random()
        .toString(36)
        .substring(6);
});

var SVG = function (_a) {
    var _b = _a.animate, animate = _b === void 0 ? true : _b, animateBegin = _a.animateBegin, _c = _a.backgroundColor, backgroundColor = _c === void 0 ? '#f5f6f7' : _c, _d = _a.backgroundOpacity, backgroundOpacity = _d === void 0 ? 1 : _d, _e = _a.baseUrl, baseUrl = _e === void 0 ? '' : _e, children = _a.children, _f = _a.foregroundColor, foregroundColor = _f === void 0 ? '#eee' : _f, _g = _a.foregroundOpacity, foregroundOpacity = _g === void 0 ? 1 : _g, _h = _a.gradientRatio, gradientRatio = _h === void 0 ? 2 : _h, _j = _a.gradientDirection, gradientDirection = _j === void 0 ? 'left-right' : _j, uniqueKey = _a.uniqueKey, _k = _a.interval, interval = _k === void 0 ? 0.25 : _k, _l = _a.rtl, rtl = _l === void 0 ? false : _l, _m = _a.speed, speed = _m === void 0 ? 1.2 : _m, _o = _a.style, style = _o === void 0 ? {} : _o, _p = _a.title, title = _p === void 0 ? 'Loading...' : _p, _q = _a.beforeMask, beforeMask = _q === void 0 ? null : _q, props = __rest(_a, ["animate", "animateBegin", "backgroundColor", "backgroundOpacity", "baseUrl", "children", "foregroundColor", "foregroundOpacity", "gradientRatio", "gradientDirection", "uniqueKey", "interval", "rtl", "speed", "style", "title", "beforeMask"]);
    var fixedId = uniqueKey || uid();
    var idClip = fixedId + "-diff";
    var idGradient = fixedId + "-animated-diff";
    var idAria = fixedId + "-aria";
    var rtlStyle = rtl ? { transform: 'scaleX(-1)' } : null;
    var keyTimes = "0; " + interval + "; 1";
    var dur = speed + "s";
    var gradientTransform = gradientDirection === 'top-bottom' ? 'rotate(90)' : undefined;
    return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", __assign({ "aria-labelledby": idAria, role: "img", style: __assign(__assign({}, style), rtlStyle) }, props),
        title ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("title", { id: idAria }, title) : null,
        beforeMask && (0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(beforeMask) ? beforeMask : null,
        (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { role: "presentation", x: "0", y: "0", width: "100%", height: "100%", clipPath: "url(" + baseUrl + "#" + idClip + ")", style: { fill: "url(" + baseUrl + "#" + idGradient + ")" } }),
        (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("defs", null,
            (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("clipPath", { id: idClip }, children),
            (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("linearGradient", { id: idGradient, gradientTransform: gradientTransform },
                (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", { offset: "0%", stopColor: backgroundColor, stopOpacity: backgroundOpacity }, animate && ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("animate", { attributeName: "offset", values: -gradientRatio + "; " + -gradientRatio + "; 1", keyTimes: keyTimes, dur: dur, repeatCount: "indefinite", begin: animateBegin }))),
                (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", { offset: "50%", stopColor: foregroundColor, stopOpacity: foregroundOpacity }, animate && ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("animate", { attributeName: "offset", values: -gradientRatio / 2 + "; " + -gradientRatio / 2 + "; " + (1 +
                        gradientRatio / 2), keyTimes: keyTimes, dur: dur, repeatCount: "indefinite", begin: animateBegin }))),
                (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", { offset: "100%", stopColor: backgroundColor, stopOpacity: backgroundOpacity }, animate && ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("animate", { attributeName: "offset", values: "0; 0; " + (1 + gradientRatio), keyTimes: keyTimes, dur: dur, repeatCount: "indefinite", begin: animateBegin })))))));
};

var ContentLoader = function (props) {
    return props.children ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SVG, __assign({}, props)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ReactContentLoaderFacebook, __assign({}, props));
};

var ReactContentLoaderFacebook = function (props) { return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentLoader, __assign({ viewBox: "0 0 476 124" }, props),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "48", y: "8", width: "88", height: "6", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "48", y: "26", width: "52", height: "6", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "56", width: "410", height: "6", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "72", width: "380", height: "6", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "88", width: "178", height: "6", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "20", cy: "20", r: "20" }))); };

var ReactContentLoaderInstagram = function (props) { return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentLoader, __assign({ viewBox: "0 0 400 460" }, props),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "31", cy: "31", r: "15" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "58", y: "18", rx: "2", ry: "2", width: "140", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "58", y: "34", rx: "2", ry: "2", width: "140", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "60", rx: "2", ry: "2", width: "400", height: "400" }))); };

var ReactContentLoaderCode = function (props) { return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentLoader, __assign({ viewBox: "0 0 340 84" }, props),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "0", width: "67", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "76", y: "0", width: "140", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "127", y: "48", width: "53", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "187", y: "48", width: "72", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "18", y: "48", width: "100", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "71", width: "37", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "18", y: "23", width: "140", height: "11", rx: "3" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "166", y: "23", width: "173", height: "11", rx: "3" }))); };

var ReactContentLoaderListStyle = function (props) { return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentLoader, __assign({ viewBox: "0 0 400 110" }, props),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "0", rx: "3", ry: "3", width: "250", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "20", y: "20", rx: "3", ry: "3", width: "220", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "20", y: "40", rx: "3", ry: "3", width: "170", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "0", y: "60", rx: "3", ry: "3", width: "250", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "20", y: "80", rx: "3", ry: "3", width: "200", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "20", y: "100", rx: "3", ry: "3", width: "80", height: "10" }))); };

var ReactContentLoaderBulletList = function (props) { return ((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ContentLoader, __assign({ viewBox: "0 0 245 125" }, props),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "10", cy: "20", r: "8" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "25", y: "15", rx: "5", ry: "5", width: "220", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "10", cy: "50", r: "8" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "25", y: "45", rx: "5", ry: "5", width: "220", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "10", cy: "80", r: "8" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "25", y: "75", rx: "5", ry: "5", width: "220", height: "10" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", { cx: "10", cy: "110", r: "8" }),
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("rect", { x: "25", y: "105", rx: "5", ry: "5", width: "220", height: "10" }))); };

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContentLoader);

//# sourceMappingURL=react-content-loader.es.js.map


/***/ })

}]);
//# sourceMappingURL=ManageTags.js.map