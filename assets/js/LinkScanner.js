"use strict";
(globalThis["webpackChunkbetterlinks"] = globalThis["webpackChunkbetterlinks"] || []).push([["LinkScanner"],{

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

/***/ "./dev_betterlinks/containers/TabsBrokenLinkChecker.js":
/*!*************************************************************!*\
  !*** ./dev_betterlinks/containers/TabsBrokenLinkChecker.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Badge/ProBadge */ "./dev_betterlinks/components/Badge/ProBadge.js");
/* harmony import */ var react_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-tabs */ "./node_modules/react-tabs/esm/index.js");
/* harmony import */ var _utils_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/helper */ "./dev_betterlinks/utils/helper.js");





var BrokenLinks = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return Promise.all(/*! import() | broken-links */[__webpack_require__.e("vendors-node_modules_formik_dist_formik_esm_js"), __webpack_require__.e("broken-links")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Teasers/BrokenLinks */ "./dev_betterlinks/components/Teasers/BrokenLinks.js"));
});
var FullSiteLinkChecker = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {
  return Promise.all(/*! import() | full-site-link-scanner */[__webpack_require__.e("vendors-node_modules_react-data-table-component_dist_index_cjs_js"), __webpack_require__.e("vendors-node_modules_material-ui_core_esm_Card_Card_js-node_modules_material-ui_core_esm_Card-005101"), __webpack_require__.e("vendors-node_modules_material-ui_core_esm_Box_Box_js"), __webpack_require__.e("full-site-link-scanner")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Teasers/FullSiteLinkChecker.js/index.js */ "./dev_betterlinks/components/Teasers/FullSiteLinkChecker.js/index.js"));
});

var TabsBrokenLinkChecker = function TabsBrokenLinkChecker() {
  var tabList = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Full Site Link Scanner', 'betterlinks'),
    type: 'pro'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('BetterLinks Checker', 'betterlinks'),
    type: 'pro'
  }];
  var panelList = [(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FullSiteLinkChecker, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BrokenLinks, null)];
  var brokenLinkCheckerTabList = betterLinksHooks.applyFilters('betterLinksSettingsBrokenLinkCheckerTabList', tabList);
  var brokenLinkCheckerTabPanelList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabPanelList', panelList);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.Tabs, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.TabList, null, brokenLinkCheckerTabList.map(function (item, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.Tab, {
      key: index
    }, item.label, 'pro' === item.type && !_utils_helper__WEBPACK_IMPORTED_MODULE_4__.is_pro_enabled && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Badge_ProBadge__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  })), brokenLinkCheckerTabPanelList.map(function (item, index) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_tabs__WEBPACK_IMPORTED_MODULE_3__.TabPanel, {
      key: index
    }, item);
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TabsBrokenLinkChecker);

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

/***/ "./dev_betterlinks/pages/LinkScanner.js":
/*!**********************************************!*\
  !*** ./dev_betterlinks/pages/LinkScanner.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _containers_TabsBrokenLinkChecker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../containers/TabsBrokenLinkChecker */ "./dev_betterlinks/containers/TabsBrokenLinkChecker.js");
/* harmony import */ var _containers_TopBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../containers/TopBar */ "./dev_betterlinks/containers/TopBar.js");




var LinkScanner = function LinkScanner() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_containers_TopBar__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Scanner', 'betterlinks')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_containers_TabsBrokenLinkChecker__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkScanner);

/***/ })

}]);
//# sourceMappingURL=LinkScanner.js.map