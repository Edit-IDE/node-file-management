"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class File {
  constructor(_ref) {
    let {
      folderPath,
      name,
      extension,
      filePath,
      content = "",
      onChange,
      onChangeParams
    } = _ref;
    // Sanitazing the path separator to always be a slash "/"
    folderPath = folderPath && folderPath.replaceAll(_path.default.sep, '/');
    name = name && name.replaceAll(_path.default.sep, '/');
    filePath = filePath && filePath.replaceAll(_path.default.sep, '/');
    if (filePath) {
      this.buildFileFromFilePath(filePath);
    } else {
      this.buildFileFromFolderPathAndName(folderPath, name, extension);
    }
    this.setContent(content);
    if (onChange && typeof onChange === "function") {
      onChange(this, onChangeParams);
    }
  }

  /**
   * This function will extract the folder path, the name, and the extension.
   * @param {string} filePath
   */
  buildFileFromFilePath(filePath) {
    let filePaths = filePath.split("/");
    let fileNameWithExtension = filePaths.pop();

    /** Handling extensions */
    if (fileNameWithExtension.includes(".")) {
      let fileName = fileNameWithExtension.split(".");
      if (fileName.length > 1) {
        this.extension = fileName.pop();
      }
      this.name = fileName.join("."); // If there is other dots then the extension one we put them back
    } else {
      this.name = fileNameWithExtension;
    }
    this.folderPath = filePaths.join("/");
  }

  /**
   * Build the file with the separate parameters.
   * folderPath and name are required.
   * @param {string} folderPath 
   * @param {string} name 
   * @param {?string} extension
   */
  buildFileFromFolderPathAndName(folderPath, name, extension) {
    this.folderPath = folderPath;
    this.name = name;
    if (extension) {
      this.extension = extension;
    } else {
      const tmp = name.split(".");
      // Handling extension if present.
      if (tmp.length > 1) {
        this.extension = tmp.pop();
      }
      this.name = tmp.join("."); // If there is other dots then the extension one we put them back
    }
  }

  /**
   * @param {string} content 
   * @returns {File} this
   */
  setContent(content) {
    this.content = content;
    return this;
  }

  /** @returns {string} The absolute full path including file's folder path, with file name and extension. */
  getFullPath() {
    return (this.folderPath[this.folderPath.length - 1] === "/" ? this.folderPath : this.folderPath + "/") + (this.name + (this.extension ? "." + this.extension : ""));
  }
}
var _default = exports.default = File;