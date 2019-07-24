
/**
 *  MCP23017-control blocks
 */

let inputABuffer = 0;
let inputBBuffer = 0;
let _addr = 0x20;

enum PINS {
    //% block=PIN0
    PIN0 = 0,
    //% block=PIN1
    PIN1,
    //% block=PIN2
    PIN2,
    //% block=PIN3
    PIN3,
    //% block=PIN4
    PIN4,
    //% block=PIN5
    PIN5,
    //% block=PIN6
    PIN6,
    //% block=PIN7
    PIN7,

}

enum SENSORS {
    //% block=右前センサ
    FR_SENSOR = 0,
    //% block=左前センサ
    FL_SENSOR,
    //% block=右後ろセンサ
    RR_SENSOR,
    //% block=左後ろセンサ
    RL_SENSOR,
    SENSORS_END
}
let sensor_pin = [0]
sensor_pin.length = SENSORS.SENSORS_END;

enum MCP23017REG {
    //% block=IODIRA
    IODIRA = 0,
    //% block=IODIRB
    IODIRB,
    //% block=IPOLA
    IPOLA,
    //% block=IPOLB
    IPOLB,
    //% block=GPINTENA
    GPINTENA,
    //% block=GPINTENB
    GPINTENB,
    //% block=DEFVALA
    DEFVALA,
    //% block=DEFVALB
    DEFVALB,
    //% block=INTCONA
    INTCONA,
    //% block=INTCONB
    INTCONB,
    //% block=IOCON1
    IOCON1,
    //% block=IOCON2
    IOCON2,
    //% block=GPPUA
    GPPUA,
    //% block=GPPUB
    GPPUB,
    //% block=INTFA
    INTFA,
    //% block=INTFB
    INTFB,
    //% block=INTCAPA
    INTCAPA,
    //% block=INTCAPB
    INTCAPB,
    //% block=GPIOA
    GPIOA,
    //% block=GPIOB
    GPIOB,
    //% block=OLATA
    OLATA,
    //% block=OLATB
    OLATB
}

enum ADDRESS {                     // address for MCP23017 (configurable by tying pins 15,16,17 on the mcp23017 high or low)
    //% block=0x20
    A20 = 0x20,               // 
    //% block=0x21
    A21 = 0x21,                // 
    //% block=0x22
    A22 = 0x22,                // 
    //% block=0x23
    A23 = 0x23,                // 
    //% block=0x24
    A24 = 0x24,                // 
    //% block=0x25
    A25 = 0x25,                // 
    //% block=0x26
    A26 = 0x26,                // 
    //% block=0x27
    A27 = 0x27                // 
}

/**
 * Blocks
 */
"//% weight=100 color=#0fbc12 icon="
namespace MCP23017 {
    //% block="アドレスを設定する %v" 
    export function setAddr(addr: ADDRESS) {
        _addr = addr;
    }

    //% block=GPIO入出力を変更する
    export function SetIoDir(val1: number, val2: number) {
        writeRegSeq2(MCP23017REG.IODIRA, val1, val2)
    }

    //% block
    export function ReadToBuffer() {
        inputABuffer = readReg(MCP23017REG.GPIOA)
    }

    //% block
    export function ReadPin(pin: PINS): number {
        if (inputABuffer & (0x01 << pin)) {
            return 1
        }
        else {
            return 0
        }
    }

    //% block
    export function SetSensorsToPin(sensor: SENSORS, pin: PINS) {
        sensor_pin[sensor] = pin;
    }

    //% block
    export function ReadSensor(sensor: SENSORS): number {
        if (inputABuffer & (0x01 << sensor_pin[sensor])) {
            return 1
        }
        else {
            return 0
        }
    }

    //% block
    export function readReg(reg: MCP23017REG): number {
        pins.i2cWriteNumber(
            _addr,
            reg,
            NumberFormat.Int8LE,
            true
        )
        return pins.i2cReadNumber(_addr, NumberFormat.Int8LE, false)
    }

    //% block
    export function writeReg(reg: MCP23017REG, val: number) {
        pins.i2cWriteNumber(
            _addr,
            reg,
            NumberFormat.Int8LE,
            true
        )
        pins.i2cWriteNumber(
            _addr,
            val,
            NumberFormat.Int8LE,
            false
        )
    }

    //% block
    export function writeRegSeq2(reg: MCP23017REG, val1: number, val2: number) {
        pins.i2cWriteNumber(
            _addr,
            reg,
            NumberFormat.Int8LE,
            true
        )
        pins.i2cWriteNumber(
            _addr,
            val1,
            NumberFormat.Int8LE,
            true
        )
        pins.i2cWriteNumber(
            _addr,
            val2,
            NumberFormat.Int8LE,
            false
        )
    }

}
