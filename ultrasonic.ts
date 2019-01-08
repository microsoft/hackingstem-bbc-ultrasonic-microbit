let ledTimer = 0
let lastReadPosition = 0
let distance = 0
let readPosition = 0
let duration = 0
let ledInterval = 0
pins.onPulsed(DigitalPin.P1, PulseValue.High, function () {
    duration = pins.pulseDuration()
})
ledInterval = 100
led.enable(false)
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        readPosition = 1
    } else if (pins.digitalReadPin(DigitalPin.P3) == 1) {
        readPosition = 2
    } else if (pins.digitalReadPin(DigitalPin.P4) == 1) {
        readPosition = 3
    } else if (pins.digitalReadPin(DigitalPin.P6) == 1) {
        readPosition = 4
    }
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P0, 0)
    basic.pause(5)
    distance = Math.idiv(Math.idiv(duration * 343, 1000), 2)
    if (readPosition != lastReadPosition) {
        serial.writeNumber(readPosition)
        serial.writeString(",")
        serial.writeNumber(distance)
        serial.writeLine("")
        lastReadPosition = readPosition
        pins.digitalWritePin(DigitalPin.P9, 1)
        ledTimer = input.runningTime()
    }
    if (input.runningTime() - ledTimer >= ledInterval) {
        pins.digitalWritePin(DigitalPin.P9, 0)
    }
})