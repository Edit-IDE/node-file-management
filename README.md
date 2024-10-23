# node-file-management
Set of JS objects to manage files using Node JS

## Installation
```sh
npm install @editide/file-management
```

## Example usage

Watch the [example-usage](./example-usage.mjs) script.

You can execute it using `npm run test`

Otherwise, simply import it like so :
```js
const { ServerFile, ServerFolder } = require("@editide/file-management");
```

You can instanciate a file object using it's exact path with `filePath`
```js
const rootPath = require("./rootPath"); // Returns this project root folder's path
new ServerFile({
    filePath: rootPath + "LICENCE",
});
```

or with serapate fields :
```js
const readmeFile = new ServerFile({
    folderPath: rootPath,
    name: "README",
    extension: "md"
});
```

Then just add a dot to the file object and `Ctrl + Space` to autocomplete to see properties and methods.

## Notes

It may be imperfect, but it does already helps me winning a lot of time.