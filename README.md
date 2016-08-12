# php-formatter README

A PHP formatter for VS Code, uses html-beautify and php_beautifier. 

## Requirements

* `js-beautify`
* `php_beautifier` 

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Installation
1. Get the Extension from somewhere.
2. Install `js-beautify`.
	* **[Python]** Install with Python:
		```
		$ pip install jsbeautifier
		```   
	* **[NoodeJS]** Install with NodeJS
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
*	Add options to pass to `php_beautifier`. 

## Known Issues

Nothing Found Yet.  

## Release Notes

### 1.0.0

Initial release of php-formatter
