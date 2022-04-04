import {Point} from "pixi.js";

export default {
    getDistanceSimple(aX, aY, bX, bY) {
        return Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2))
    },
    getDistance(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    },
    getAngle(originX, originY, targetX, targetY) {
        let dx = originX - targetX, dy = originY - targetY;

        let theta = Math.atan2(dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = east
        theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = east
        if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = east

        return theta;
    },
    /**
     * Converts an angle in degrees to radians
     * @param theta An angle in degrees.
     * @returns {number} An angle in radians.
     */
    toRadians(theta) {
        return theta / 180 * Math.PI;
    },
    /**
     * Converts an angle in radians to degrees.
     * @param theta An angle in radians.
     * @returns {number} An angle in degrees.
     */
    toDegrees(theta) {
        return theta / Math.PI * 180;
    },
    /**
     * Generates a number of sections and returns basic generation data to assist initialization of the canvas.
     * @param sectionCount The number of sections a 360 degree / 2pi area should be split up into.
     * @returns {*[]} Returns an array of objects containing useful pre-generated angles & data.
     */
    generateSections(sectionCount) {
        let data = [];
        let baseAngle = (2 * Math.PI) / sectionCount;
        for (let section = 0; section < sectionCount; section++) {
            let startAngle = baseAngle * section;
            let endAngle = startAngle + baseAngle;
            let centerAngle = startAngle + (baseAngle / 2.0);
            let velocityPoint = new Point(-Math.cos(centerAngle), Math.sin(centerAngle));
            data.push({startAngle, centerAngle, endAngle, velocityPoint});
        }
        return data;
    }
}