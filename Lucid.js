import Assets from './assets/Assets.js';
import Input from './utilities/Input.js';
import Timer from './utilities/Timer.js';
import Tools from './utilities/Tools.js';

export default {
    tools: new Tools(),
    assets: new Assets(),
    timer: new Timer(),
    input: new Input({ root: document.body })
};