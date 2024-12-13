# eframe

标签 `<e-frame>`（Emulation Frame） 是一个使用 [TypeScript](https://www.typescriptlang.org/zh/) 开发，能够让你在浏览器中创建模仿系统应用窗口的 [Web Component](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)。

使用其他语言阅读：[English](README.md) | 简体中文

## 安装

```html
<script src="https://cdn.jsdelivr.net/npm/eframe/dist/index.min.js"></script>
```

你可以直接通过 URI 将其引入到你的页面中，也可以根据自己的喜好来使用其它 CDN，例如 [UNPKG](https://unpkg.com/)。

## 使用

```html
<!DOCTYPE html>
<html lang="zh">
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

在成功加载脚本后，使用 `<e-frame>` 标签，你便可以在浏览器中看到一个模仿系统应用的窗口界面。

![](https://cdn.sa.net/2024/12/13/3MxQXPkBVqobuyw.png)

## 属性

### name

- 类型: `string`
- 默认: `null`

设置应用窗口的标题名称。

```html
<e-frame name="App">
  <!-- ... -->
</e-frame>
```

### theme

- 类型: `string`
- 默认: `"mac"`

定义标题栏的系统风格，支持 `"mac"` 与 `"windows"`。

```html
<e-frame theme="mac">
  <!-- ... -->
</e-frame>
```
