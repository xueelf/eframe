# eframe

The `<e-frame>` (Emulation Frame) is a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) developed using [TypeScript](https://www.typescriptlang.org/), that allows you to create emulated system application window directly within a browser.

Read this in other languages: English | [简体中文](./README_zh.md)

## Installation

```html
<script src="https://cdn.jsdelivr.net/npm/eframe/dist/index.min.js"></script>
```

You can directly include it in your page via a URI, or use other CDNs such as [UNPKG](https://unpkg.com/) as you prefer.

## Usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Example</title>
    <style>
      .margin {
        margin: 1rem;
      }
    </style>
  </head>
  <body>
    <e-frame name="App">
      <div class="margin">hello world</div>
    </e-frame>

    <script src="https://cdn.jsdelivr.net/npm/eframe/dist/index.min.js"></script>
  </body>
</html>
```

After successfully loading the script, use the `<e-frame>` tag to create a window that mimics a native system application.

![window](https://cdn.sa.net/2024/12/13/3MxQXPkBVqobuyw.png)

## Attributes

### name

- Type: `string`
- Default: `null`

Set the title of the application window.

```html
<e-frame name="App">
  <!-- ... -->
</e-frame>
```

### theme

- Type: `string`
- Default: `"mac"`

Define the system style of the title bar, supporting `"mac"` and `"windows"`.

```html
<e-frame theme="mac">
  <!-- ... -->
</e-frame>
```
