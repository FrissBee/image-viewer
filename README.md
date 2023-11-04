# Image viewer

An easy to integrate image viewer for your website.

# Preview

If you first want to see if the image viewer is what you are looking for, [you can see it here](https://image-viewer.frissbee.de/).

# Implementation

1. Clone or download the repo
2. Implement the `image-viewer.js` file in your project
3. Implement the `<image-viewer></image-viewer>` HTML tag in your site
4. Pass the image viewer the image data in your JS file (see the `settings-image-viewer.js` file in this repo)
5. For the design use the attributes in the `<image-viewer></image-viewer>` HTML tag

This repo shows some examples.

# Example of implementation with the default settings

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Title</title>

    <!-- 1. Implement the "image-viewer.js" file -->
    <script src="./assets/js/image-viewer.js"></script>
    <!-- 2. Implement your "*.js" settings file -->
    <script src="./assets/js/settings-image-viewer.js" defer></script>
  </head>

  <body>
    <!-- Some Content -->

    <!-- 3. Implementation of the "<image-viewer></image-viewer>" HTML tag -->
    <image-viewer></image-viewer>

    <!-- Some Content -->
  </body>
</html>
```

# All attributes

See the examples and comments in the files for more information.

The following attributes are available:

#### For the slider

- `thumbnail-height` => height of the image slider
- `color-bg` => background color of the image slider
- `color-icon` => color of the next and preview button
- `radius-slider` => radius of the image slider
- `slider-border` => border of the image slider

#### For the image

- `margin-image` => distance between image and slider
- `radius-image` => radius of the image
- `image-border` => border of the image
