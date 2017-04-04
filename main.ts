
/**
  * Enumeration of motors.
  */
enum BBMotor {
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="all"
    All
}

/**
  * Enumeration of line sensors.
  */
enum BBLineSensor {
    //% block="left"
    Left,
    //% block="right"
    Right
}

/**
  * Enumeration of light sensors.
  */
enum BBLightSensor {
    //% block="left"
    Left,
    //% block="right"
    Right
}

/**
 * Ping unit for sesnor.
 */
enum BBPingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

/**
 * Custom blocks
 */
//% weight=10 color=#0fbc11 icon="\uf1b9"
namespace bitbot {

    let neoStrip: neopixel.Strip;

    /**
     * Return a neo pixel strip.
     */
    //% blockId="bitbot_neo" block="neo strip"
    //% weight=5
    export function neo(): neopixel.Strip {
        if (!neoStrip) {
            neoStrip = neopixel.create(DigitalPin.P13, 12, NeoPixelMode.RGB)
        }

        return neoStrip;
    }

    /**
      * Drive motor(s) forward or reverse.
      *
      * @param motor motor to drive.
      * @param speed speed of motor
      */
    //% blockId="bitbot_motor" block="drive motor %motor|speed %speed"
    //% weight=100
    export function motor(motor: BBMotor, speed: number): void {
        let forward = (speed >= 0);

        if (speed > 1023) {
            speed = 1023;
        } else if (speed < -1023) {
            speed = 1023;
        }

        let realSpeed = speed;
        if (!forward) {
            realSpeed = 1023 - realSpeed;
        }

        if ((motor == BBMotor.Left) || (motor == BBMotor.All)) {
            pins.analogWritePin(AnalogPin.P0, realSpeed);
            pins.digitalWritePin(DigitalPin.P8, forward ? 0 : 1);
        }

        if ((motor == BBMotor.Right) || (motor == BBMotor.All)) {
            pins.analogWritePin(AnalogPin.P1, realSpeed);
            pins.digitalWritePin(DigitalPin.P12, forward ? 0 : 1);
        }
    }

    /**
      * Sound a buzz.
      *
      * @param flag Flag to set (0) for off and (1) for on.
      */
    //% blockId="bitbot_buzz" block="buzz sound %flag"
    //% weight=95
    export function buzz(flag: number): void {
        pins.digitalWritePin(DigitalPin.P14, flag === 0 ? 0 : 1);
    }

    /**
      * Read line sensor.
      *
      * @param sensor Line sensor to read.
      */
    //% blockId="bitbot_read_line" block="read line sensor %sensor"
    //% weight=90
    export function readLine(sensor: BBLineSensor): number {
        if (sensor == BBLineSensor.Left) {
            return pins.digitalReadPin(DigitalPin.P11);
        } else {
            return pins.digitalReadPin(DigitalPin.P5);
        }
    }

    /**
      * Read light sensor.
      *
      * @param sensor Light sensor to read.
      */
    //% blockId="bitbot_read_light" block="read light sensor %sensor"
    //% weight=90
    export function readLight(sensor: BBLightSensor): number {
        if (sensor == BBLightSensor.Left) {
            pins.digitalWritePin(DigitalPin.P16, 0);
            return pins.analogReadPin(AnalogPin.P2);
        } else {
            pins.digitalWritePin(DigitalPin.P16, 1);
            return pins.analogReadPin(AnalogPin.P2);
        }
    }

    /**
      * Shows all LEDs to a given color (range 0-255 for r, g, b).
      *
      * @param rgb RGB color of the LED
      */
    //% blockId="bitbot_neo_set_color" block="set pixels to %rgb=neopixel_colors"
    //% weight=80
    export function neoSetColor(rgb: number) {
        neo().showColor(rgb);
    }

    /**
     * Set LED to a given color (range 0-255 for r, g, b).
     *
     * @param offset position of the NeoPixel in the strip
     * @param rgb RGB color of the LED
     */
    //% blockId="bitbot_neo_set_pixel_color" block="set pixel color at %offset|to %rgb=neopixel_colors"
    //% weight=80
    export function neoSetPixelColor(offset: number, rgb: number): void {
        neo().setPixelColor(offset, rgb);
    }

    /**
      * Show leds.
      */
    //% blockId="bitbot_neo_show" block="show leds"
    //% weight=76
    export function neoShow(): void {
        neo().show();
    }

    /**
      * Clear leds.
      */
    //% blockId="bitbot_neo_clear" block="clear leds"
    //% weight=75
    export function neoClear(): void {
        neo().clear();
    }

    /**
      * Shows a rainbow pattern on all LEDs.
      */
    //% blockId="bitbot_neo_rainbow" block="set led rainbow"
    //% weight=70
    export function neoRainbow(): void {
        neo().showRainbow(1, 360);
    }

    /**
     * Shift LEDs forward and clear with zeros.
     */
    //% blockId="bitbot_neo_shift" block="shift led pixels"
    //% weight=66
    export function neoShift(): void {
        neo().shift(1);
    }

    /**
     * Rotate LEDs forward.
     */
    //% blockId="bitbot_neo_rotate" block="rotate led pixels"
    //% weight=65
    export function neoRotate(): void {
        neo().rotate(1);
    }

    /**
     * Set the brightness of the strip.
     *
     * @param brightness a measure of LED brightness in 0-255. eg: 255
     */
    //% blockId="bitbot_neo_brightness" block="set led brightness %brightness"
    //% weight=10
    export function neoBrightness(brightness: number): void {
        neo().setBrigthness(brightness);
    }

    /**
    * Read distance from sonar module connected to accessory connector.
    *
    * @param unit desired conversion unit
    */
    //% blockId="bitbot_sonar" block="read sonar as %unit"
    //% weight=7
    export function sonar(unit: BBPingUnit): number {
        // send pulse
        let trig = DigitalPin.P15;
        let echo = DigitalPin.P15;

        let maxCmDistance = 500;

        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        let d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case BBPingUnit.Centimeters: return d / 58;
            case BBPingUnit.Inches: return d / 148;
            default: return d;
        }
    }
}
