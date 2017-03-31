
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

    /**
      * Drive motor(s) forward or reverse.
      *
      * @param motor motor to drive.
      * @param speed speed of motor
      */
    //% blockId="bitbot_motor" block="motor %motor|speed %speed"
    export function motor(motor: Motor, speed: number): void {
      var forward = (speed >= 0);

      if (speed > 100) {
        speed = 100;
      } else if (speed < -100) {
        speed = 100;
      } else if (speed < 0) {
        speed = -speed;
      }

      var realSpeed = Math.round((speed * 1023) / 100);
      if (!forward) {
        realSpeed = 1023 - realSpeed;
      }

      if ((motor == Motor.Left) || (motor == Motor.All)) {
        pings.analogWritePin(AnalogPin.P0, realSpeed);
        pings.digitalWritePin(AnalogPin.P8, forward ? 0 : 1);
      }

      if ((motor == Motor.Right) || (motor == Motor.All)) {
        pings.analogWritePin(AnalogPin.P1, realSpeed);
        pings.digitalWritePin(AnalogPin.P12, forward ? 0 : 1);
      }
    }

    /**
      * Sound a buzz.
      *
      * @param flag [0-1] Flag to set (0) for off and (1) for on; eg: 0.
      */
    //% blockId="bitbot_buzz" block="buzz %flag"
    export function buzz(flag: number): void {
      pins.digitalWritePin(DigitalPin.P14, flag === 0 ? 0 : 1);
    }

    /**
      * Read line sensor.
      *
      * @param line Line sensor to read.
      */
    //% blockId="bitbot_read_line" block="line %line"
    export function readLine(line: LineSensor): number {
      if (line == Line.Left) {
        return pins.digitalReadPin(DigitalPin.P11);
      } else {
        return pins.digitalReadPin(DigitalPin.P5);
      }
    }
}
