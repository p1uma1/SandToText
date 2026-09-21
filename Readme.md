# Sand2Text

Interactive particle text morphing for HTML Canvas.

## Install

npm install sand2text

## Usage

```js
import Sand2Text from "sand2text";

const canvas = document.querySelector("#canvas");

const sand = new Sand2Text(canvas, {
    font: "80px Verdana",
    gap: 3,
});

sand.setText("Hello");

setTimeout(()=>{
    sand2text.setText("World");
},3000)
