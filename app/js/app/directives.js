'use strict';

define(["angular", "angular-route", "app/filters", "jsx!app/directives/content_editor", "app/directives/FileBrowser", "app/directives/Modal", "app/services/FigureUploader", "app/directives/TextEditor", "app/directives/ScooterVersion"], function() {

	var ContentEditor = require("jsx!app/directives/content_editor");

	/* Directives */

	angular.module('scooter.directives', [])

	.directive('appVersion', ['version', function(version) {
	    return function(scope, elm, attrs) {
	    	elm.text(version);
	    };
	}])

	.directive("contentEditor", ["SnippetLoader", "TagLoader", "IdLoader", "$filter", function(snippetLoader, tagLoader, idLoader, $filter) {

		function link(scope, element, attrs) {
			scope.$watch("document", function(newVal, oldVal, scope) {
				console.log("document changed!", scope.document);
				ContentEditor.fileLoader = scope.fileLoader;
				ContentEditor.figureUploader = scope.figureUploader;
				ContentEditor.snippetLoader = snippetLoader;
				ContentEditor.getTagList = tagLoader;
				ContentEditor.getIdList = idLoader;
				ContentEditor.dateFilter = $filter("date");
				scope.editor = new ContentEditor(element[0], scope.document);
			})

			element.on("docChanged", function(e, oldDoc, newDoc) {
	            var newJson = JSON.stringify(newDoc, null, 2);
	            scope.onChange(newJson);
	        });
		}

		return {

			scope: {
				document: "=",
				onChange: "=",
				fileLoader: "=",
				figureUploader: "=",
			},

			restrict: "EA",

			link: link,
		};
	}])

	.directive("textEditor", require("app/directives/TextEditor"))

	.directive("fileBrowser", require("app/directives/FileBrowser"))

	.directive("modal", require("app/directives/Modal"))

	.directive("scooterVersion", require("app/directives/ScooterVersion"))

});
