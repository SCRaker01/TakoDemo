import { _decorator, Component, find, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GroupObstacle')
export class GroupObstacle extends Component {

    @property({type:Prefab}) private prefabObstacle;
    public isPlayerDead:boolean = false;
    private height:number;
    private haveCheckCollision:boolean = false;
    private haveCutHeight:boolean = false;

    setHeight(height:number, baseY:number,poolObstacle){
        this.height = height;
        
        for(let i=0;i<height;i++){
            let obs;
            if(poolObstacle.length>0){
                obs = poolObstacle.shift();
            }else{
                obs =instantiate(this.prefabObstacle);
            }
            obs.setParent(this.node);
            // obs.setImage()
            obs.setPosition(new Vec3(0,i*49,0));
        }
        this.node.setPosition(new Vec3(192,baseY,0));
    }

    isHaveCutHeight():boolean{
        return this.haveCutHeight;
    }
    setHaveCutHeight(value: boolean){
        this.haveCutHeight = value;
    }

    isHaveCheckCollision():boolean{
        return this.haveCheckCollision;
    }

    getHeight():number{
        return this.height;
    }

    setHaveCheckCollision(value: boolean){
        this.haveCheckCollision = value;
    }

    setDeadCondition(value: boolean):void{
        this.isPlayerDead = value;
    }

    start() {
        
    }

    update(deltaTime: number) {
            this.node.translate(new Vec3(-250*deltaTime,0,0));
    }

}