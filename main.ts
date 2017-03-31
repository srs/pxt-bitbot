
/**
  * Enumeration of motors.
  */
enum Motor {
    Left,
    Right,
    All
}

/**
  * Enumeration of line sensors.
  */
enum LineSensor {
    Left,
    Right
}


/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="\uf1b9"
namespace bitbot {

    let neoStrip: neopixel.Strip = neopixel.create(DigitalPin.P13, 12, NeoPixelMode.RGB);

    /**
     * Return a neo pixel strip.
     */
    //% blockId="bitbot_neo" block="neo strip"
    export function neo(): neopixel.Strip {
        return neoStrip;
    }

    /**
      * Drive motor(s) forward or reverse.
      *
      * @param motor motor to drive.
      * @param speed speed of motor
      */
    //% blockId="bitbot_motor" block="drive motor %motor|speed %speed"
    export function motor(motor: Motor, speed: number): void {
        let forward = (speed >= 0);

        if (speed > 100) {
            speed = 100;
        } else if (speed < -100) {
            speed = 100;
        } else if (speed < 0) {
            speed = -speed;
        }

        let realSpeed = 0; // Math.round((speed * 1023) / 100);
        if (!forward) {
            realSpeed = 1023 - realSpeed;
        }

        if ((motor == Motor.Left) || (motor == Motor.All)) {
            pins.analogWritePin(AnalogPin.P0, realSpeed);
            pins.digitalWritePin(DigitalPin.P8, forward ? 0 : 1);
        }

        if ((motor == Motor.Right) || (motor == Motor.All)) {
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
    export function buzz(flag: number): void {
        pins.digitalWritePin(DigitalPin.P14, flag === 0 ? 0 : 1);
    }

    /**
      * Read line sensor.
      *
      * @param line Line sensor to read.
      */
    //% blockId="bitbot_read_line" block="read line sensor %line"
    export function readLine(line: LineSensor): number {
        if (line == LineSensor.Left) {
            return pins.digitalReadPin(DigitalPin.P11);
        } else {
            return pins.digitalReadPin(DigitalPin.P5);
        }
    }

    /**
      * Shows all LEDs to a given color (range 0-255 for r, g, b).
      *
      * @param rgb RGB color of the LED
      */
    //% blockId="bitbot_neo_show_color" block="show color %rgb=neopixel_colors"
    export function neoShowColor(rgb: number) {
        neoStrip.showColor(rgb);
    }


    // neoShow
    // neoClear
    // neoShowRainbow
    // neoShift
    // neoRotate
    // neoSetBrightness
    //


}
