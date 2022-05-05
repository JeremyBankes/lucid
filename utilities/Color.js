export default class Color {

    /**
     * @param {object} options
     * @param {number|string} [options.hex]
     * @param {number} [options.red]
     * @param {number} [options.green]
     * @param {number} [options.blue]
     * @param {number} [options.alpha]
     * @param {[number, number, number, number]} [options.rgba]
     * @param {[number, number, number]} [options.rgb]
     */
    constructor(options) {
        if ('hex' in options) {
            let alpha = true;
            if (typeof (options.hex) === 'string') {
                if (options.hex.startsWith('#')) {
                    options.hex = options.hex.substring(1);
                    alpha = options.hex.length !== 6;
                }
                options.hex = parseInt(options.hex, 16);
            }
            [this.red, this.green, this.blue, this.alpha] = Color.fromHex(options.hex, alpha);
        } else if ('red' in options && 'green' in options && 'blue' in options) {
            this.red = Color.handleChannel(options.red);
            this.green = Color.handleChannel(options.green);
            this.blue = Color.handleChannel(options.blue);
            this.alpha = 'alpha' in options ? options.alpha : 255;
        } else if ('rgba' in options) {
            this.red = Color.handleChannel(options.rgba[0]);
            this.green = Color.handleChannel(options.rgba[1]);
            this.blue = Color.handleChannel(options.rgba[2]);
            this.alpha = Color.handleChannel(options.rgba[3]);
        } else if ('rgb' in options) {
            this.red = Color.handleChannel(options.rgb[0]);
            this.green = Color.handleChannel(options.rgb[1]);
            this.blue = Color.handleChannel(options.rgb[2]);
            this.alpha = 255;
        }
    }

    /**
     * @param {number} percentage
     */
    getDarker(percentage) {
        return new Color({
            red: this.red * (1 - percentage),
            green: this.green * (1 - percentage),
            blue: this.blue * (1 - percentage),
        });
    }

    toHex() {
        return Color.toHex(this.red, this.green, this.blue, this.alpha);
    }

    /**
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @param {number} alpha
     */
    static toHex(red, green, blue, alpha) {
        let color = BigInt(0);
        color += BigInt(red) << 24n;
        color += BigInt(green) << 16n;
        color += BigInt(blue) << 8n;
        color += BigInt(alpha);
        return Number(color);
    }

    /**
     * @param {string|number|bigint} hex
     * @param {boolean} alpha
     */
    static fromHex(hex, alpha = false) {
        if (typeof (hex) === 'string') {
            if (hex.startsWith('#')) {
                hex = hex.slice(1, hex.length);
            }
            hex = parseInt(hex, 16);
        }
        hex = BigInt(hex);
        if (alpha) {
            return [
                Number((hex & 0xFF000000n) >> 24n),
                Number((hex & 0x00FF0000n) >> 16n),
                Number((hex & 0x0000FF00n) >> 8n),
                Number((hex & 0x000000FFn) >> 0n),
            ];
        } else {
            return [
                Number((hex & 0xFF0000n) >> 16n),
                Number((hex & 0x00FF00n) >> 8n),
                Number((hex & 0x0000FFn) >> 0n),
                255
            ]
        }
    }

    /**
     * @param {number} channel
     */
    static handleChannel(channel) {
        return Math.max(0, Math.min(255, Math.round(channel)));
    }

}