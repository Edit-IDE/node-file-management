"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  $id: "file",
  title: "file",
  type: "object",
  properties: {
    folderPath: {
      type: "string"
    },
    path: {
      type: "string"
    },
    name: {
      type: "string"
    },
    extension: {
      type: "string"
    },
    content: {
      anyOf: [{
        type: "object"
      }, {
        type: "string"
      }]
    }
  },
  required: ["folderPath"]
};