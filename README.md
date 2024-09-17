# Description
node-ftpper is a wrapper for the popular nodejs FTP client module node-ftp
It tried to provide a more simple way to use FTP in nodejs


# Requirements

* [node.js](http://nodejs.org/) -- v0.8.0 or newer


# Dependencies

node-ftp

# Installation

    npm install ftpper

# Usage

## Initialization
To crate an instance of the wrapper use the following code:

```javascript
var ftpper = require('ftpper');
var ftps = ftpper(configs);
```
where `configs` is an array of the ftp server configuration:
```javascript
[{
  host:host1,
  user:username,
  password:password
 },
 {
  host:host2
  user:username
  password:password
 }
]);
```

# Examples

```javascript
ftps.uploadDir('local_site/', '/remote_site/test/', results=>{
	console.log("ftp uploaded");
});
ftps.chmod(['file1','file2','file3'], 755);
```

