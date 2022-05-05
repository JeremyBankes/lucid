import Assets from '/scripts/engine/assets/Assets.js';
import Input from '/scripts/engine/utilities/Input.js';
import Timer from '/scripts/engine/utilities/Timer.js';
import Tools from '/scripts/engine/utilities/Tools.js';

export default {
    tools: new Tools(),
    assets: new Assets(),
    timer: new Timer(),
    input: new Input({ root: document.body })
};