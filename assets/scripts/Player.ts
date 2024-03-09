import { _decorator, CCFloat, Component, Input, input, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property({type: CCFloat})gravity:number;
    @property({type: Node})ground:Node;
    @property({type: Prefab})prefabBlock:Prefab;

    private vy:number = 0;
    private baseY:number = 0;
    private hBlock = 49;
    private height:number = 0;

    private listBlock:Node[] = [];

    start() {
        this.baseY = this.ground.getPosition().y+40;
        input.on(Input.EventType.TOUCH_START,this.spawnBlock,this);
    }

    spawnBlock(){
        if (this.node.getPosition().y <308) {
            let nodeBlock = instantiate(this.prefabBlock);
            nodeBlock.setParent(this.node.parent);
            nodeBlock.setPosition(new Vec3(0,this.baseY+this.height*this.hBlock,0));
            // this.baseY += this.hBlock;
            this.height++;
            this.listBlock.push(nodeBlock);

        }
    }

    cutPlayer(hObstacle:number,groupObstacle:Node){
        //this.height -= hObstacle;
        for(let i=0;i<hObstacle;i++){
            let block = this.listBlock.shift();
            block.setParent(groupObstacle,true);
        }
        
    }

    cutHeight(hObstacle:number){
        this.height -= hObstacle;
    }

    update(deltaTime: number) {
        this.vy -= this.gravity*deltaTime;
        this.node.translate(new Vec3(0,this.vy*deltaTime,0));
        let curPosition = this.node.getPosition();
        if(curPosition.y<this.baseY + (this.height*this.hBlock)){
            curPosition.y = this.baseY+ (this.height*this.hBlock);
        }
        let count = 0;
        for(let i=this.listBlock.length-1;i>=0;i--){
            let block = this.listBlock[i];
            let targetPosition = this.baseY+(this.height-1-count)*this.hBlock; 
            if(block.position.y>targetPosition){
                block.translate(new Vec3(0,this.vy*deltaTime,0));
                if(block.position.y<targetPosition){
                    block.setPosition(new Vec3(0,targetPosition,0));
                }
            }
            count++;
        }
        this.node.setPosition(curPosition);
    }

    getHeight(){
        return this.height;
    }

    gameOver(){
        
    }
}

