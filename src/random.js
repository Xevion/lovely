import {Point} from "pixi.js";

export default {
    /**
     * Returns a random integer value from [min, max].
     * @param min The minimum integer value to be returned (inclusive).
     * @param max The maximum integer value to be returned (inclusive).
     * @returns {number} A random integer value.
     */
    randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },
    /**
     * Returns a floating point value from [min, max).
     * @param min The minimum value (inclusive) to be returned.
     * @param max The maximum value (non-inclusive) to be returned.
     * @returns {*} A random floating point value.
     */
    uniform(min, max) {
        return (Math.random() * (max - min)) + min;
    },
    /**
     * Returns a random item from inside the array.
     * @param array An array of any length.
     * @returns {null|*} Returns an item if there is at least 1 item inside the array. Otherwise, returns null.
     */
    choice: function (array) {
        if (array.length < 1) return null;
        else if (array.length === 1) return array[0];
        return array[this.randInt(0, array.length - 1)];
    },
    /**
     * Generates a point inside a rectangle defined by its center and a width & height.
     * May not be the most efficient method, but it's fine for now.
     * @param center The center of the rectangle.
     * @param height The height of the rectangle.
     * @param width The width of the rectangle.
     * @returns {Point} A point inside the rectangle defined by these arguments.
     */
    pointInRectangle(center, height, width) {
        let widthOffset = width / 2.0, heightOffset = height / 2.0;
        return new Point(
            this.uniform(center.x - widthOffset, center.y + widthOffset),
            this.uniform(center.y - heightOffset, center.y + heightOffset));
    },
    /**
     * Generates a random point inside a circle (or disc, if minRadius > 0).
     * @param center The position at which the circle is centered on.
     * @param minRadius The minimum radius the point could be from the center.
     * @param maxRadius The maximum radius the point could be from the center.
     * @returns {Point} A point inside the disc.
     */
    pointInCircle(center, minRadius, maxRadius) {
        const radius = this.uniform(minRadius, maxRadius);
        const angle = this.uniform(0, Math.PI * 2);
        return new Point(
            Math.cos(angle) * radius + center.x,
            Math.sin(angle) * radius + center.y
        );
    },
    /**
     *
     * @param min A point object representing the minimum X and Y values to be generated.
     * @param max A point object representing the maximum X and Y values to be generated.
     * @param minDistance The minimum distance each point must be from each other.
     * @param maxPoints The maximum number of points to be generated.
     * @param maxIterations The maximum number of generation attempts to be made before generating.
     * @returns {*[]} An array containing up to {maxPoints} points.
     */
    spacedPointsInRectangle(min, max, minDistance, maxPoints, maxIterations) {
        const minX = min.x;
        const minY = min.y;
        const maxX = max.x;
        const maxY = max.y;
        let pointCount = 0;
        let iterations = 0;
        let points = [];

        // Generate a point until both maximums are satisfied
        while (pointCount < maxPoints && iterations < maxIterations) {
            iterations++;
            let newPoint = new Point(this.uniform(minX, maxX), this.uniform(minY, maxY));
            if (!points.some((otherPoint) => this.getDistance(newPoint, otherPoint) < minDistance)) {
                pointCount++;
                points.push(newPoint);
            }
        }
        return points
    }
};