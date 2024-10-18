"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  $id: "folder",
  title: "folder",
  type: "object",
  properties: {
    folderPath: {
      type: "string"
    },
    name: {
      type: "string"
    }
  },
  required: ["folderPath"]
};