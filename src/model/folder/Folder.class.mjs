import path from "path";

class Folder {
    constructor({
        parentFolderPath,
        folderPath,
        name = "",
        onChange,
        onChangeParams
    }) {
        if(folderPath) {
            folderPath = folderPath.replaceAll(path.sep, "/").split("/");
            name = folderPath.pop();
            parentFolderPath = folderPath.join("/");
        }
        parentFolderPath = parentFolderPath.replaceAll(path.sep, "/");
        if(name) {
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
        return (
            this.parentFolderPath[this.parentFolderPath.length - 1] === "/" ?
                this.parentFolderPath
            :
                this.parentFolderPath + "/"
        ) + this.name;
    }
}

export default Folder;