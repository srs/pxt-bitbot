# BitBot Package for Microsoft PXT

[![Build Status](https://travis-ci.org/srs/pxt-bitbot.svg?branch=master)](https://travis-ci.org/srs/pxt-bitbot)
[![GitHub Tag](https://img.shields.io/github/tag/srs/pxt-bitbot.svg)]()

This library provides a Microsoft PXT package for BitBot, see
https://4tronix.co.uk/bitbot/.

## Driving the motor

Use `bitbot.motor(..)` to drive motor either forward or reverse. The value
indicates speed and is between `-1023` to `1023`. Minus indicates reverse.

```blocks
// Drive 1000 ms forward
bitbot.motor(BBMotor.All, 1023);
basic.pause(1000);

// Drive 1000 ms reverse
bitbot.motor(BBMotor.All, -1023);
basic.pause(1000);

// Drive 1000 ms forward on left and reverse on right
bitbot.motor(BBMotor.Left, 1023);
bitbot.motor(BBMotor.Right, -1023);
basic.pause(1000);
```

## Buzz sound

To use the buzzer, just use `bitbot.buzz(..)` function with either `1`
(sound) or `0` (no-sound).

```blocks
// Buzz for 100 ms
bitbot.buzz(1);
basic.pause(100);
bitbot.buzz(0);
```

## Read line sensor

The BitBot has two line-sensors: left and right. To read the value of the
sensors, use `bitbot.readLine(..)` function.

```blocks
// Read left and right line sensor
let left = bitbot.readLine(BBLineSensor.Left);
let right = bitbot.readLine(BBLineSensor.Right);
```

## Read light sensor

Light sensors can be read using `bitbot.readLight(..)` function.

```blocks
// Read left and right light sensor
let left = bitbot.readLight(BBLightSensor.Left);
let right = bitbot.readLight(BBLightSensor.Right);
```

## Read sonar value

If you have mounted the optional sonar sensor for the BitBot you can
also use the `bitbot.sonar(..)` function to read the distance to obstacles.

```blocks
// Read sonar values
let v1 = bitbot.sonar(BBPingUnit.MicroSeconds);
let v2 = bitbot.sonar(BBPingUnit.Centimeters);
let v3 = bitbot.sonar(BBPingUnit.Inches);
```

## NeoPixel helpers

The BitBot has 12 NeoPixels mounted. This library defines some helpers
for using the NeoPixels.

```blocks
// Show all leds
bitbot.neoSetColor(neopixel.colors(NeoPixelColors.Red));
bitbot.neoShow();

// Clear all leds
bitbot.neoClear();
bitbot.neoShow();

// Show led at position 1
bitbot.neoSetPixelColor(0, neopixel.colors(NeoPixelColors.Red));
bitbot.neoShow();

// Show led rainbow
bitbot.neoRainbow();
bitbot.neoShow();

// Show led rainbow and shift
bitbot.neoRainbow();
bitbot.neoShift();
bitbot.neoShow();

// Show led rainbow and rotate
bitbot.neoRainbow();
bitbot.neoRotate();
bitbot.neoShow();

// Set brightness of leds
bitbot.neoBrightness(100);
bitbot.neoShow();

// Use neo() variable
bitbot.neo().clear();
bitbot.neo().show();
```

## Supported targets

* for PXT/microbit

## License

Apache 2.0
