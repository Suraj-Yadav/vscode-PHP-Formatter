var vscode = require('vscode');
const execFileSync = require('child_process').execFileSync;
var fs = require('fs');

function format(document, range, options) {
	console.log(typeof (options));
	// console.log('Starting Extensioon');
	if (range === null) {
		var start = new vscode.Position(0, 0);
		var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
		range = new vscode.Range(start, end);
	}
	var result = [];
	var content = document.getText(range);

	phpString = [];

	while (content.includes('<?php')) {
		var start = content.indexOf('<?php');
		var end = content.indexOf('?>') + '?>'.length;
		phpString += content.slice(start, end);
		content = content.slice(0, start) + '<phptag></phptag>' + content.slice(end, content.length);
	}

	// var uri = vscode.Uri.parse('file:///some/path/to/file.html');
	// var success = await vscode.commands.executeCommand('vscode.executeFormatDocumentProvider', uri, options);

	var config = vscode.workspace.getConfiguration('phpFormatter');

	console.log(config);
	console.log(config['html-beautify']['options']);

	var htmlContent = '';
	if (config['html-beautify']['enabled'])
		htmlContent = String(execFileSync('html-beautify.cmd', config['html-beautify']['options'], { input: content }));
	else
		htmlContent = content;

	var phpContent = String(execFileSync('php_beautifier.bat', config['php_beautifier']['options'], { input: phpString }));

	phpContent = phpContent.replace(RegExp('\r\n', 'g'), '\n');

	console.log(htmlContent);
	console.log(phpContent);

	var formattedContent = '';

	while (htmlContent.includes('<phptag>')) {
		let start1 = htmlContent.indexOf('<phptag>'),
			end1 = htmlContent.indexOf('</phptag>') + '</phptag>'.length,
			start2 = phpContent.indexOf('<?php'),
			end2 = phpContent.indexOf('?>') + 2,
			indentation = htmlContent.slice(htmlContent.slice(0, start1).lastIndexOf('\n') + 1, start1);
		formattedContent = formattedContent + htmlContent.slice(0, start1) + phpContent.slice(start2, end2).replace(RegExp('\n', 'g'), '\n' + indentation);
		htmlContent = htmlContent.slice(end1, htmlContent.length);
		phpContent = phpContent.slice(0, start2) + phpContent.slice(end2, phpContent.length);
	}

	formattedContent = formattedContent + htmlContent;

	// console.log(formattedContent);

	result.push(new vscode.TextEdit(range, formattedContent));

	return result;
}

function activate(context) {
	context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('php', {
		provideDocumentFormattingEdits: function (document, options, token) {
			return format(document, null, options);
		}
	}));
	context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('php', {
		provideDocumentRangeFormattingEdits: function (document, range, options, token) {
			var start = new vscode.Position(0, 0);
			var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
			return format(document, new vscode.Range(start, end), options);
		}
	}));
}

exports.activate = activate;


// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;