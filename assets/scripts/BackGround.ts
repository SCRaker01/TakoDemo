import { _decorator, CCInteger, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackGround')
export class BackGround extends Component {

    @property({type:Node}) private backGroundNode: Node;
    @property({type:Node}) private GroundNode: Node;
    @property({type:CCInteger}) backGroundSpeed: number;
    private layer1;
    private layer2;
    private layer3;
    start() {
        this.layer1 = this.node.getChildByName('layer1');
        this.layer2 = this.node.getChildByName('layer2');
        this.layer3 = this.node.getChildByName('layer3');
    }

    update(deltaTime: number) {
        this.layer1.setPosition(new Vec3(this.layer1.getPosition().x-(this.backGroundSpeed*deltaTime), this.layer1.getPosition().y,0));
        this.layer2.setPosition(new Vec3(this.layer2.getPosition().x-(2.5*this.backGroundSpeed*deltaTime), this.layer2.getPosition().y,0));
        this.layer3.setPosition(new Vec3(this.layer3.getPosition().x-(5*this.backGroundSpeed*deltaTime), this.layer3.getPosition().y,0));
        this.GroundNode.setPosition(new Vec3(this.GroundNode.getPosition().x-(50*this.backGroundSpeed*deltaTime), this.GroundNode.getPosition().y,0));

        if(this.layer1.getPosition().x < -1152){
            this.layer1.setPosition(new Vec3(0,this.layer1.getPosition().y,0));
        } if(this.layer2.getPosition().x < -1152){
            this.layer2.setPosition(new Vec3(-0,this.layer2.getPosition().y,0));
        } if(this.layer3.getPosition().x < -1152){
            this.layer3.setPosition(new Vec3(-0,this.layer3.getPosition().y,0));
        }
         if(this.GroundNode.getPosition().x < -382){
            this.GroundNode.setPosition(new Vec3(382,this.GroundNode.getPosition().y,0));
        }
        console.log("layer background "+ this.node.getPosition() );

    }
}


