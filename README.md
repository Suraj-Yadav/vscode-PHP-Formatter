# php-formatter README

A PHP formatter for VS Code, uses html-beautify and php_beautifier. 

## Requirements

* `js-beautify`
* `php_beautifier` 

## Extension Settings

* `phpFormatter.php_beautifier.options`: Options to be passed to PHP_Beautifier. See `php_beautifier --help` for options. 
* `phpFormatter.html-beautify.enabled`: Enable/Disable formatting of HTML part.
* `phpFormatter.html-beautify.options`: Options to be passed to html-beautify. See `html-beautify -help` for options.

## Installation
1. Download the file `php-formatter-0.0.1.vsix`. Install it using `code php-formatter-0.0.1.vsix`. 
2. Install `js-beautify`.
	* **[Python]** Install with Python:
		```
		$ pip install jsbeautifier
		```   
	* **[NodeJS]** Install with NodeJS:
		```
		$ npm -g install js-beautify
		```
3. Install `php_beautifier`.
	1. Make sure you have `PEAR` Package Manager installed. If not, get it at http://pear.php.net/manual/en/installation.getting.php.
	2. Install PHP_Beautifier
		```
		$ pear install PHP_Beautifier
		```
		
## Roadmap
*	Use inbuilt vscode html formatter instead of `html-beautify`. 

## Known Issues

Nothing Found Yet.  

## Release Notes

### 1.0.0

Initial release of php-formatter
