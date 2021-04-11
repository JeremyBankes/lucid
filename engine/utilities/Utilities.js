import Font from '../graphics/Font.js'

/**
 * Applies the given font to all elements with the given class
 * @param {Font} font The font to apply
 * @param {HTMLElement} element The element to apply the font to
 */
function applyPixelPerfectFontToElement(font, element) {
    const measurementSpan = document.createElement('span');
    measurementSpan.style.position = 'absolute';
    measurementSpan.style.visibility = 'hidden';
    const clone = element.cloneNode(true);
    clone.style.position = 'unset';
    clone.style.margin = 0;
    clone.style.padding = 0;
    measurementSpan.appendChild(clone);
    element.after(measurementSpan);
    const textDisplaySize = measurementSpan.getBoundingClientRect();
    const scale = Math.max(1, Math.round(textDisplaySize.height / font.lineHeight));
    measurementSpan.remove();

    const text = element.textContent;
    element.innerText = '';

    const color = getComputedStyle(element).color.match(/[0-9]+/g).map(parseFloat);
    if (color.length < 4) color.push(255);
    font.atlas.floodColor(color);

    const atlasUrl = font.atlas.toDataURL();
    for (const character of text) {
        const glyph = font.getGlyph(character);
        if (glyph) {
            const glyphElement = document.createElement('span');
            const x = glyph.xOffset * scale;
            const y = glyph.yOffset * scale;
            glyphElement.innerText = character;
            glyphElement.style.display = 'inline-block';
            glyphElement.style.width = (glyph.width * scale) + 'px';
            glyphElement.style.height = (glyph.height * scale) + 'px';
            glyphElement.style.margin = `${y}px ${((glyph.advance - glyph.width) * scale)}px 0 0`;
            glyphElement.style.backgroundPositionX = -(glyph.x * scale) + 'px';
            glyphElement.style.backgroundPositionY = -(glyph.y * scale) + 'px';
            glyphElement.style.backgroundSize = `${font.atlas.width * scale}px ${font.atlas.height * scale}px`;
            glyphElement.style.backgroundImage = `url(${atlasUrl})`;
            glyphElement.style.verticalAlign = 'top';
            glyphElement.style.userSelect = 'none';
            glyphElement.style.imageRendering = 'pixelated';
            glyphElement.style.color = 'transparent';
            element.appendChild(glyphElement);
        }
    }

    // element.after(newElement);
    // element.remove();
}

/**
 * Watches 'rootElement' for mutations and applies 'font' to all elements with 'className'
 * This is meant to allow for passive usage of 'className' to apply 'font' to all descendants of 'rootElement'
 * @param {Font} font The font to apply
 * @param {HTMLElement} rootElement The element to watch for changes
 * @param {string} className The name of the class associated with the font
 */
function registerPixelPerfectFont(font, rootElement, className) {
    const elements = rootElement.getElementsByClassName(className);
    for (const element of elements) applyPixelPerfectFontToElement(font, element);

    const observer = new MutationObserver(records => {
        for (const record of records) {
            const target = record.target;
            if (target.classList && target.classList.contains(className)) {
                for (const childNode of target.childNodes) {
                    if (childNode.nodeType === Node.TEXT_NODE) {
                        applyPixelPerfectFontToElement(font, target);
                        break;
                    }
                }
            }
        }
    });
    observer.observe(rootElement, { subtree: true, childList: true });
}

export { applyPixelPerfectFontToElement, registerPixelPerfectFont }