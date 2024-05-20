import { MController193000701 } from "../common/MController193000701";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Help193000701 extends base.PopupModel {
    protected onLoad(): void {
        super.onLoad();
        this.resize();
    }
    layoutLandscape(): void {
        super.layoutLandscape && super.layoutLandscape();
        this.node.getComponent(MController193000701).stateIndex = 0;
    }

    layoutPortrait(): void {
        super.layoutPortrait && super.layoutPortrait();
        this.node.getComponent(MController193000701).stateIndex = 1;
    }
}