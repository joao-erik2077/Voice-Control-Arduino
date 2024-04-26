const five = require('johnny-five');
const redLed = new five.Led(7);
const yellowLed = new five.Led(8);
const greenLed = new five.Led(9);

class LedController {
    switchLed(req, res) {
        const color = req.params.color;
        let isOn;
        switch (color) {
            case 'red':
                isOn = redLed.isOn;
                if (isOn) {
                    redLed.off();
                } else {
                    redLed.on();
                }
                res.send(`Led ${isOn ? 'on' : 'off'}`);
                break;
            case 'yellow':
                isOn = yellowLed.isOn;
                if (isOn) {
                    yellowLed.off();
                } else {
                    yellowLed.on();
                }
                res.send(`Led ${isOn ? 'on' : 'off'}`);
                break;
            case 'green':
                isOn = greenLed.isOn;
                if (isOn) {
                    greenLed.off();
                } else {
                    greenLed.on();
                }
                res.send(`Led ${isOn ? 'on' : 'off'}`);
                break;
        }
    }

    onLed(req, res) {
        const color = req.params.color;
        switch (color) {
            case 'red':
                redLed.on();
                res.send(`Led on`);
                break;
            case 'yellow':
                yellowLed.on();
                res.send(`Led on`);
                break;
            case 'green':
                greenLed.on();
                res.send(`Led on`);
                break;
        }
    }

    offLed(req, res) {
        const color = req.params.color;
        switch (color) {
            case 'red':
                redLed.off();
                res.send(`Led off`);
                break;
            case 'yellow':
                yellowLed.off();
                res.send(`Led off`);
                break;
            case 'green':
                greenLed.off();
                res.send(`Led off`);
                break;
        }
    }
}

module.exports = new LedController();
