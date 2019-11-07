# Countdown
Countdown JS Plugin

## Installation

[CDNScript](https://cdn.jsdelivr.net/gh/kelvinbiffi/Countdown@master/kountdown.js)

or 

Clone the repository and download de Script

## Usage

```javascript
new Kountdown(element, date, position).create();
new Kountdown(element, date, position).create(function (date) {
  console.log(date);
});
```

Parameters values:
* ELEMENT Query String element or DOM Element who host the Kountdown
* DATE Date string or Date Object for Kountdown reference calculator
* POSITION Relative position BEFORE BEGIN END AFTER, as default BEGIN
* CALLBACK Kountdown Style already existent

The pattern is ELEMENT DATE POSITION CALLBACK, see the below example to know more or access the link [Kountdown](https://kelvinbiffi.github.io/Kountdown/)
 
To use for specifics element using javascript, follow the below pattern
```javascript
// Interval to wait Plugin exists
var waitKountdown = setInterval(function () {
  if (Kountdown) {
    clearInterval(waitKountdown);
    
    // Usege to specific element
    var element = document.querySelector('selector of element');
    var kountdown = new Kountdown(element, '2047-11-08T00:00:00', 'END');
    kountdown.create(function (date) {
      console.log(date);
    });
  }
}, 100);
```

To use for specifics element using html only, follow the below pattern
```html
<div data-kountdown="2019-11-08T00:00:00"></div>
<div data-kountdown="2019-11-08T00:00:00|END|NODOTS"></div>
<div data-kountdown="2019-11-08T00:00:00|AFTER"></div>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.