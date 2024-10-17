"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Folder {
  constructor(_ref) {
    let {
      parentFolderPath,
      folderPath,
      name = "",
      onChange,
      onChangeParams
    } = _ref;
    if (folderPath) {
      folderPath = folderPath.replaceAll(_path.default.sep, "/").split("/");
      name = folderPath.pop();
      parentFolderPath = folderPath.join("/");
    }
    parentFolderPath = parentFolderPath.replaceAll(_path.default.sep, "/");
    if (name) {
      this.parentFolderPath = parentFolderPath;
      this.name = name;
    } else {
      const pathAsArray = parentFolderPath.split("/");
      this.name = pathAsArray.pop();
      this.parentFolderPath = pathAsArray.join("/");
    }
    if (onChange && typeof onChange === "function") {
      onChange(this, onChangeParams);
    }
  }

  /** @returns {string} The absolute full path including folder path and name. */
  getFullPath() {
    return (this.parentFolderPath[this.parentFolderPath.length - 1] === "/" ? this.parentFolderPath : this.parentFolderPath + "/") + this.name;
  }
}
var _default = exports.default = Folder;