
/**
 *  MCP23017-control blocks
 */

let outputABuffer = 0;
let outputBBuffer = 0;
let _addr = 0x20;


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
    //% block
    export function setAddr(addr: ADDRESS) {
        _addr = addr;
    }
    //% block
    export function readReg(reg: number): number {
        pins.i2cWriteNumber(
            _addr,
            reg,
            NumberFormat.Int8LE,
            true
        )
        return pins.i2cReadNumber(_addr, NumberFormat.Int8LE, false)
    }

    //% block
    export function writeReg(reg: number, val: number) {
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

}
