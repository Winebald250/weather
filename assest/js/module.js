'use strict';
export const weekDayNames = [
    "Sunday",   // Sunday should come first in many locales
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export const getDate = (dateUnix, timezone) => {
    const date = new Date((dateUnix + timezone) * 1000);
    const weekDayName = weekDayNames[date.getDay()]; // Use local day instead of UTC day
    const monthName = monthNames[date.getMonth()];   // Use local month instead of UTC month

    return `${weekDayName}, ${date.getDate()} ${monthName}`;
};

export const getTime = (timeUnix, timezone) => {
    const date = new Date((timeUnix + timezone) * 1000);
    const hours = date.getHours(); // Use local hours
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    return `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
};

export const getHours = (timeUnix, timezone) => {
    const date = new Date((timeUnix + timezone) * 1000);
    const hours = date.getHours();  // Use local hours
    const period = hours >= 12 ? "PM" : "AM";
    return `${hours % 12 || 12} ${period}`;
};

/**
 * Convert meters per second to kilometers per hour.
 * @param {number} mps - meters per second
 * @returns {number} kilometers per hour
 */
export const mps_to_kmh = mps => {
    return mps * 3.6;  // Direct conversion from mps to km/h
};

export const aqiText = {
    1: {
        level: "Good",
        message: "Air quality is considered satisfactory, and air pollution poses little or no risk."
    },
    2: {
        level: "Fair",
        message: "Air quality is acceptable; however, for some pollutants, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution."
    },
    3: {
        level: "Moderate",
        message: "Members of sensitive groups may experience health effects. The general public is not likely to be affected."
    },
    4: {
        level: "Poor",
        message: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects."
    },
    5: {
        level: "Very Poor",
        message: "Health warnings of emergency conditions. The entire population is more likely to be affected."
    }
};
