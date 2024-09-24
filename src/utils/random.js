export function getRandomNumber() {
    const min = 100;
    const max = 10000000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function randomResolution() {
    const min = 100;
    const max = 10000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}