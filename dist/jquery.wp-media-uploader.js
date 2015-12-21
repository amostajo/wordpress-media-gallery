/*
 * Wordpress Media Uploader
 * jQuery plugin
 * https://github.com/amostajo/wordpress-media-uploader
 *
 * @author Alejandro Mostajo
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
if (typeof jQuery === 'undefined') {
	throw new Error('Wordpress Media Gallery requires jQuery');
}
(function ($) {

	'use strict';

	// Create function
	$.fn.mediaUploader = function (options)
	{
		// Plugin reference
		var self = this;

		// Plugin options
		self.settings = $.extend({
			editor: undefined,
			render: true,
			clearTemplate: true,
			clearTarget: true,
			target: undefined,
			success: undefined,
			template: undefined
		}, options );

		// Gets template from object
		self._getTemplate = function ()
		{
			if (self.settings.template != undefined) return;
			self.settings.template = $(self).html();
			// Hide content
			if (self.settings.clearTemplate)
				$(self).html('');
		}

		// Renders media into target
		self._render = function (media)
		{
			if (!self.settings.render) return;
			if (self.settings.target != undefined 
				&& $(self.settings.target).length > 0
			) {
				if (self.settings.clearTarget) $(self.settings.target).html('');
				$.each(media, function (i) {
					$(self.settings.target).append(
						self._parseMedia(this)
					);
				});
			}
		}

		// Parses an individual media item and returns it as template
		self._parseMedia = function (media) {
			if (self.settings.template == undefined) return '';
			var html = self.settings.template;
			$.each(media, function (key) {
				html = html.replace(new RegExp('{{' + key + '}}', 'g'), media[key], html);
				html = html.replace(new RegExp('{{ ' + key + ' }}', 'g'), media[key], html);
			});
			html = $(html);
			if (media.type == 'file' && $(html).find('img').length > 0) {
				$(html).find('img').remove();
			}
			if (media.type == 'image' && $(html).find('img').length > 0) {
				$(html).find('img').attr('src', media.url);
			}
			return html;
		}

		// Editor callback processing function
		self._parseEditorHTML = function (html)
		{
			var media = [];

			$.each($(html), function (index) {

				if ($(this).find('img').length > 0) {

					media.push({
						type: 'image',
						url: $(this).find('img').attr('src'),
						alt: $(this).find('img').attr('alt'),
						id: $(this).find('img').attr('class').replace(/[A-Za-z\-\s]/g, '')
					});

				} else if ($(this).is('img')) {

					media.push({
						type: 'image',
						url: $(this).attr('src'),
						alt: $(this).attr('alt'),
						id: $(this).attr('class').replace(/[A-Za-z\-\s]/g, '')
					});

				} else if ($(this).attr('href') != undefined) {

					media.push({
						type: 'file',
						url: $(this).attr('href')
					});
				}

			});

			self._render(media);

			if (self.settings.success != undefined) {
				self.settings.success(media);
			}
		};

		// Save previous event
		self.prev_send_to_editor = window.send_to_editor;

		// Editor callback
		window.send_to_editor = function (html)
		{
			if (self.settings.editor == undefined
				|| (this.activeEditor != self.settings.editor
				&& editor != self.settings.editor)
			)
				return self.prev_send_to_editor == undefined
					? undefined
					: self.prev_send_to_editor(
						html,
						this.activeEditor == undefined ? editor : this.activeEditor
					);

			self._parseEditorHTML(html);
		};

		// Get template
		self._getTemplate();
	};
}(jQuery));