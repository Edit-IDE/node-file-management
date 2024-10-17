// # Example Usage of the node file management library.

// ## Files

// ### Importing the libraries at the beginning of a script.
// To use this JavaScript code library, you need to import it as so :
// ```js
import mime from 'mime'; // ESM is require(d)
import File from "./src/model/file/File.class.js";
import Folder from "./src/model/folder/Folder.class.js";
import { ServerFile, ServerFolder } from "./src/model/server.js";
import rootPath from "./rootPath.cjs"; // Returns this project root folder's path
// ```
// Free to see each file path content.

// Talking about `import`, using it as JS module ([ESM](https://nodejs.org/api/esm.html)) would look like this : 
// import File from "./model/file/File.class";
// import { ServerFile } from "./model/server";
// import rootPath from "./rootPath";



// ### Creating an object using the files class
// The `File` `class` is for client side, meaning that it does not include read and write methods
// It's content is then undefined intil set.
const licenceFile = new File({
    filePath: rootPath + "LICENCE",
});

// The ServerFile class is obviously for the Server side,
// it does include file content if existant on the machine executing the script.
const serverLicenceFile = new ServerFile(licenceFile);

// About execution, if (you execute this script) {
//     then the following console instruction would display this software licence.
// },
console.log("Found server's licence file : \n\n\%o\n", serverLicenceFile);


serverLicenceFile.delete()
console.log("Licence file deleted.\n");

console.log(
    "Does that file exists anymore ? : " + (
        serverLicenceFile.exists() ?
            "Yes"
        :
            "No"
    ) + "\n"
);

serverLicenceFile.create();
console.log("File restored using the ServerFolder `content` attribute.\n");

serverLicenceFile.rename("LICENCE.md");
console.log("File renamed to Markdown format\n");

serverLicenceFile.moveTo("./legal");
console.log("File moved to a legal folder.\n");

const copiedFile = serverLicenceFile.copyTo("test/yolo");
console.log("File copied to a legal/test/yolo folder.\n");

// And finally replacing the original LICENCE file, without any extension.
serverLicenceFile.saveAs("../LICENCE");
console.log('File saved back to the root path as "LICENCE".\n');

// By using the ServerFile class, we actually created a ServerFolder (see `copyTo` method)

// ## Folders


// Let's instantiate the LICENCE folder as an object we can control.
// As for files, the Folder class is for client side.
const licenceFolder = new Folder({
    parentFolderPath: rootPath,
    name: "legal"
});
console.log('Getting the legal folder created previously.\n');

// And the server one is logically : ServerFolder !
const legalServerFolder = new ServerFolder(licenceFolder);
console.log("It contains the markdown licence file we created : \n\n%o\n", legalServerFolder.getFiles());

// It has the same methods as ServerFile expect it does not have "content",

legalServerFolder.moveTo("./test");
console.log('We move it to a folder named test : \n\n%o\n', legalServerFolder);

const serverLicenceFolder = legalServerFolder.copyTo("licences");
console.log('We copy it to a folder named licences : \n\n%o\n', serverLicenceFolder);

console.log("Deleting those unused folder to get everything back to normal...\n\n\n");
serverLicenceFolder.emptyContent();
serverLicenceFolder.delete();
legalServerFolder.delete();

const rootFolder = new ServerFolder({ folderPath: rootPath});
console.log('Now working with this project root folder : \n\n%o\n', rootFolder);


// but it does have childrens instead, like files
console.log("Root folder's files : %o\n", rootFolder.getAllFiles());
console.log("Root stats : %o\n", rootFolder.getStats());

// other folders
console.log("Root folder's subfolders : %o\n", rootFolder.getSubFolders());

// We can also search files with specific name
console.log(
    "Files with a Markdown (.md) extension : %o\n",
    rootFolder.getFiles({
        regex: /.md/
    })
);

// or files with specific content
console.log(
    'Files with "EditIDE" in their content : %o\n',
    rootFolder.getAllFilesWithContent(/EditIDE/).map( x => x.getFullPath() )
);

console.log(
    "Mime type using an external library : \n\n\%o\n",
    new Set(
        rootFolder.getAllFiles(
            // { // if commented, returns absolute file paths as string
            //     asObjectType: "server"
            // }
        ).map(
            // Getting mime type from file extention or absolute path
            file => mime.getType(file.extension ?? file)
        )
    )
);
