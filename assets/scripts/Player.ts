import { _decorator, CCFloat, Component, game, Input, input, instantiate, Node, Prefab, Vec3, Animation, randomRangeInt, Scheduler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property({type: CCFloat})gravity:number;
    @property({type: CCFloat})jumpForce:number;
    @property({type: Node})ground:Node;
    @property({type: Prefab})prefabBlock:Prefab;

    private vy:number = 0;
    private baseY:number = 0;
    private hBlock = 49;
    private height:number = 0;
    private isJumping:boolean;

    private listBlock:Node[] = [];
    private tempJump;
    private tempPlayer;
    private playerAnim:Animation;

    start() {
        this.baseY = this.ground.getPosition().y+40;
        input.on(Input.EventType.TOUCH_START,this.spawnBlock,this);
        this.playerAnim = this.node.getComponent(Animation);
        this.isJumping=false;
        this.tempJump = this.jumpForce;

    }

    spawnBlock(){
        if (this.node.getPosition().y <308) {
            
            let nodeBlock = instantiate(this.prefabBlock);
            nodeBlock.setParent(this.node.parent);
            nodeBlock.setPosition(new Vec3(0,this.baseY+this.height*this.hBlock,0));
            // this.baseY += this.hBlock;
            this.height++;
            this.listBlock.push(nodeBlock);
            this.float();


            this.scheduleOnce(() => {
                this.run();
                this.isJumping = false;
            },1.08);
            
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
        if(!this.isJumping){
            if (this.vy>-200){
                this.vy -= this.gravity*deltaTime*0.5;
            }
            this.node.translate(new Vec3(0,this.vy*deltaTime,0));
            console.log(this.node.getPosition().y);
            let curPosition = this.node.getPosition();
            if(curPosition.y<=this.baseY + (this.height*this.hBlock)){          //Stay on top ketika lari
                curPosition.y = this.baseY+ (this.height*this.hBlock);
                // curPosition.y +=1;
                // this.node.setPosition(new Vec3(0,curPosition.y+0.5,0));
            }
            this.node.setPosition(curPosition);
            this.jumpForce = this.tempJump;                 //Balikin jumpForce ke nilai semula
            this.tempPlayer = this.node.getPosition().y;     //Balikin tempPlayer ke nilai semula
        }else {
            let curPosition = this.node.getPosition();
            // this.jumpForce -= this.tempJump*deltaTime;   
            if (curPosition.y<=this.baseY + (this.height*this.hBlock)){                         //Naikkan terus menerus ketika masih melompat dan dibawah blok
                this.node.setPosition(new Vec3(0,curPosition.y+0.5+(2*this.jumpForce),0));
            } 
            else{
                this.node.setPosition(new Vec3(0,curPosition.y+0.5+(0.5*this.jumpForce),0));
            }
            if(curPosition.y>308){
                this.node.setPosition(new Vec3(0,308,0));
            }
            console.log(this.node.getPosition().y);
            
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
        
    }

    getHeight(){
        return this.height;
    }

    gameOver(){
        
    }

    run(){
        this.playerAnim.play("playerRun");
    }

    float(){
        this.playerAnim.play("playerJump");
        this.isJumping = true;

    }
}

