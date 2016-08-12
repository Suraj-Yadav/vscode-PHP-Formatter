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

	var htmlContent = String(execFileSync('html-beautify.cmd', [], { input: content }));

	var phpContent = String(execFileSync('php_beautifier.bat', [], { input: phpString }));

	console.log(htmlContent);
	console.log(phpContent);

	content = '';

	while (htmlContent.includes('<phptag>')) {
		let start1 = htmlContent.indexOf('<phptag>'),
			end1 = htmlContent.indexOf('</phptag>') + '</phptag>'.length,
			start2 = phpContent.indexOf('<?php'),
			end2 = phpContent.indexOf('?>') + 2,
			indentation = htmlContent.slice(htmlContent.slice(0, start1).lastIndexOf('\n') + 1, start1);
		content = content + htmlContent.slice(0, start1) + phpContent.slice(start2, end2).replace(RegExp('\n', 'g'), '\n' + indentation);
		htmlContent = htmlContent.slice(end1, htmlContent.length);
		phpContent = phpContent.slice(0, start2) + phpContent.slice(end2, phpContent.length);
	}

	content = content + htmlContent;

	// console.log(content);

	result.push(new vscode.TextEdit(range, content));

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