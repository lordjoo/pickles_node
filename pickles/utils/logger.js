/**
 * Logger Module
 *
 * Logging module for (info, error, console) using winston
 *
 */

// =======================================================

import winston from "winston";

// =======================================================

const {createLogger, format, transports} = winston;
const {combine, errors, json, simple, timestamp, printf, colorize} = format;

// =======================================================

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => (process.env.NODE_ENV || "development" ? "debug" : "warn");

winston.addColors(colors);

// =======================================================

const defaultFormat = combine(
    timestamp({format: "YYYY-MM-DD hh:mm:ss:ms"}),
    json()
);

const consoleFormat = combine(simple(), colorize({all: true}));

// =======================================================

const transportsFiles = [
    new transports.File({filename: "logs/info.log", level: "info"}),
    new transports.File({filename: "logs/error.log", level: "error"}),
    new transports.File({filename: "logs/combined.log"}),
];

// =======================================================

const logger = createLogger({
    level: level(),
    format: defaultFormat,
    transports: transportsFiles,
});

// =======================================================

if (process.env.NODE_ENV !== "production") {
    logger.add(new transports.Console({format: consoleFormat}));
}

module.exports = logger;
