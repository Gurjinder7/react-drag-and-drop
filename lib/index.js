"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } // import { forwardRef, useState } from "react";
var DragAndDrop = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var _ref$setFileData = _ref.setFileData,
    setFileData = _ref$setFileData === void 0 ? function (e) {
      return e;
    } : _ref$setFileData,
    _ref$id = _ref.id,
    id = _ref$id === void 0 ? "uploadFile" : _ref$id,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? "" : _ref$style,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? "" : _ref$size,
    _ref$accept = _ref.accept,
    accept = _ref$accept === void 0 ? "" : _ref$accept;
  var _React$useState = _react["default"].useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    file = _React$useState2[0],
    setFile = _React$useState2[1];
  var _React$useState3 = _react["default"].useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    showWarning = _React$useState4[0],
    setShowWarning = _React$useState4[1];
  var handleDrag = function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  };
  var handleDrop = function handleDrop(e) {
    var _e$dataTransfer$files;
    e.preventDefault();
    e.stopPropagation();
    if ((_e$dataTransfer$files = e.dataTransfer.files) !== null && _e$dataTransfer$files !== void 0 && _e$dataTransfer$files[0]) {
      checkSize(e.dataTransfer.files[0]);
    }
  };
  var uploadFile = function uploadFile(e) {
    var _e$target$files;
    if ((_e$target$files = e.target.files) !== null && _e$target$files !== void 0 && _e$target$files[0]) {
      checkSize(e.target.files[0]);
    }
  };
  var formatFileSize = function formatFileSize(value) {
    if (value > 1000000) {
      return Number(value / (1024 * 1024)).toFixed(2) + " MB";
    }
    return (Number(value / (1024 * 1024)) * 1000).toFixed(2) + " KB";
  };
  var removeFile = function removeFile(e) {
    e.stopPropagation();
    e.preventDefault();
    setFile(null);
  };
  var checkSize = function checkSize(file) {
    setShowWarning(false);
    console.log(file);
    if (!!size) {
      if (file.size > Number(size) * 1000000) {
        setFile(null);
        setShowWarning(true);
      } else {
        setFileData(file);
        setFile(file);
      }
    } else {
      setFileData(file);
      setFile(file);
    }
  };
  return /*#__PURE__*/_react["default"].createElement("label", {
    onDragEnter: function onDragEnter(e) {
      return handleDrag(e);
    },
    onDragLeave: function onDragLeave(e) {
      return handleDrag(e);
    },
    onDragOver: function onDragOver(e) {
      return handleDrag(e);
    },
    onDrop: function onDrop(e) {
      return handleDrop(e);
    },
    htmlFor: id,
    className: style
  }, "Choose Or drop a file", /*#__PURE__*/_react["default"].createElement("input", {
    onChange: function onChange(e) {
      return uploadFile(e);
    },
    id: id,
    ref: ref,
    type: "file",
    placeholder: "",
    accept: accept,
    className: "inputfile"
  }), file && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("p", null, file === null || file === void 0 ? void 0 : file.name), /*#__PURE__*/_react["default"].createElement("p", null, formatFileSize(file === null || file === void 0 ? void 0 : file.size))), showWarning && /*#__PURE__*/_react["default"].createElement("p", null, "File size limited to: ", size, " MB"), /*#__PURE__*/_react["default"].createElement("span", {
    onClick: function onClick(e) {
      return removeFile(e);
    },
    title: "Remove added file"
  }, "\uD83D\uDDD9"));
});
var _default = exports["default"] = DragAndDrop;