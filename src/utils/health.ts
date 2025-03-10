import os from 'os'
import envParsed from '../constants/env-parsed.js'

function bytesToMB(val: number) {
    return (val / 1024 / 1024).toFixed(2)
}

export function getSystemHealth() {
    return {
        cpuUsage: `${os.loadavg()}`,
        freeMemory: `${bytesToMB(os.freemem())} MB`,
        totalMemory: `${bytesToMB(os.totalmem())} MB`
    }
}

export function getApplicationHealth() {
    return {
        platform: process.platform,
        environment: envParsed.ENV,
        uptime: `${process.uptime().toFixed(2)} second`,
        memory: process.memoryUsage(),
        cpuUsage: process.cpuUsage()
    }
}
