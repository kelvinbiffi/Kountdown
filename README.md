# Countdown
Countdown JS Plugin

## Installation

[CDNScript](https://cdn.jsdelivr.net/gh/kelvinbiffi/Countdown@1.1/kountdown.js)

```html
<body>

    ...
    ...

    <!-- Colar script antes de fechar a tag body-->
    <script src="https://cdn.jsdelivr.net/gh/kelvinbiffi/Countdown@1.1/kountdown.js"></script>
</body>
```

or 

Clone the repository and download de Script

## Usage

```html
<div data-kountdown="DATE|POSITION|CALLBACK"></div>
```

OR

```javascript
new Kountdown(element, date, position).create();
new Kountdown(element, date, position).create(function (date) {
  console.log(date);
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.