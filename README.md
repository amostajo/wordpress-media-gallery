Wordpress Media Uploader
--------------------------------
[![GitHub version](https://badge.fury.io/gh/amostajo%2Fwordpress-media-uploader.svg)](https://badge.fury.io/gh/amostajo%2Fwordpress-media-uploader)
[![Bower version](https://badge.fury.io/bo/wordpress-media-uploader.svg)](https://badge.fury.io/bo/wordpress-media-uploader)

JQuery plugin for [Wordpress](https://wordpress.org/) that simplifies the development needed to upload media in custom themes and plugins.

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
    - [Basic](#html)
    - [Rendering](#rendering)
    - [Options](#options)
    - [Methods](#methods)
- [License](#license)

## Installation

Several installation options are available:

- [Download the latest release](https://github.com/amostajo/wordpress-media-uploader/releases).
- Install with [Bower](http://bower.io): `bower install wordpress-media-uploader`.

## Setup

Enqueue the javascript file and [wordpress media](https://codex.wordpress.org/Function_Reference/wp_enqueue_media):

```php
// (1) Make sure WP media gallery is enqueued
wp_enqueue_media();

// (2) Enqueue "Wordpress Media Uploader"
wp_enqueue_script(
	'wp-media-uploader',
	PATH_TO_FILE . '/wordpress-media-uploader/dist/jquery.wp-media-uploader.min.js',
	[ 'jquery', 'jquery-ui-core' ]
);
```

**NOTE:** *PATH_TO_FILE* should be replaced with the path to where `Wordpress Media Uploader` is located. You can use the non-minified version too.

**NOTE:** See [wp_enqueue_script](https://codex.wordpress.org/Function_Reference/wp_enqueue_script) codex reference for more options.

## Supports

* Images
* Files
* Videos (MP4)
* Embeded (Youtube and Vimeo)

## Usage

### Basic

Here is a simple example of how to call the *Media Gallery* from an HTML:

```html
<a href="#"
	class="insert-media"
	data-editor="my-editor"
>
	Insert into post
</a>
```

Notice how the caller has class `insert-media` and a unique identifier named at `data-editor` (you should change this to your needs). Wordpress will recognize these two properties and open its Media Gallery Uploader on click.

Now lets add the element that will handle the results returned by the uploader and a target where to place the results.

```html
<a href="#"
	class="insert-media"
	data-editor="my-editor"
>
	Insert into post
</a>

<!-- Caller -->
<span id="media-caller"></span>

<!-- Results placeholder -->
<div id="my-editor-media"></div>
```

With these in place, let's add the functionality in jQuery:

```javascript
$("#media-caller").mediaUploader({
	editor: "my-editor",
	target: "#my-editor-media"
});
```

Notice how we are indicating which `editor` and `target` is the gallery uploader targeting to.

### Rendering

Let's add a template so results are properly displayed:

```html
<a href="#"
	class="insert-media"
	data-editor="my-editor"
>
	Insert into post
</a>

<!-- Caller -->
<span id="media-caller">
	<!-- Template starts here -->
	<div class="attachment">
		<img alt="{{ alt }}" height="45">
		<input type="text" value="{{ url }}">
	</div>
	<!-- Template ends here -->
</span>

<!-- Results placeholder -->
<div id="my-editor-media"></div>
```

Once `Wordpress Media Uploader` starts, the template (HTML code) is removed from the caller and stored in a variable within the plugin. It is used then to display any media returned by *The Gallery Uploader* inside the targeted placeholder.

Available template variables (must be under parenthesis `{{}}`):

Variable   | Description       | Media types
---------- | ----------------- | ------------
`{{type}}` | Media type.       | image, file, video, embed
`{{id}}`   | Attachment ID.    | image
`{{url}}`  | Media url.        | image, file
`{{alt}}`  | Alternative text. | image
`{{img}}`  | Image url.        | video, embed

**NOTE:** When the media returned is an image, the `src` attribute is automatically binded to the `img` tag.
**NOTE:** When the media returned is a file, the `img` tag is removed.
**NOTE:** When the media returned is a video or embed, the `img` attribute is automatically binded to the `img` tag.

### Options

Javascript available options:

| Option            | Data type | Description                                                                                       |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------- |
| `editor`          | string    | ID of *The Media Gallery* uploader.                                                               |
| `target`          | string    | Element set as target placeholder for media results.                                              |
| `render`          | boolean   | Flag that indicates if plugin should render results. **Default:** true                            |
| `template`        | string    | Alternative HTML template. Plugin will use this instead of the one inside the caller.             |
| `clearTarget`     | boolean   | Flag that indicates if plugin should clear the target before rendering results. **Default:** true |
| `clearTemplate`   | boolean   | Flag that indicates if plugin should clear the template inside the caller. **Default:** true      |
| `success`         | function  | Callback function with `media` results as parameter, called after render process has finished.    |
| `filterMedia`     | function  | Callback function that filters and replaces the `media` object (as parameter) prior to being renderer. |

Here an example of how to prevent the plugin from rendering and do some custom logic instead:
```javascript
$("#media-caller").mediaUploader({
    editor: "my-editor",
    render: false,
    success: function(media) {

        // Loop media returned
        $.each(media, function() {

            // DO CUSTOM LOGIC GERE

        });
    },
    filterMedia: function(media) {

        // Sample of how to filter the media captured
        if (media.type == 'video') {
            media.img = 'default.jpg';
        }

        // Returns media filtered
        return media;
    },
});
```

### Methods

In order to use public methods. Plugin needs to be stored into a variable.

```javascript
window.mediaUploader = $("#media-caller").mediaUploader();
```

|  Method           | Description                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| `add`             | Manually adds media to plugin.                                                                    |

#### Method add()

```javascript
// Adding an individual media object
mediaUploader.add({
    type: 'image', // Supported: 'image','file'
    src: 'http://url.to.media',
    id: 707, // Media ID. (optional)
    alt: 'Image alt' // (optional)
});

// Adding multiple images passing an array as parameter.
mediaUploader.add([]);
```

## LICENSE

**Wordpress Media Uploader** is free software distributed under the terms of the MIT license.