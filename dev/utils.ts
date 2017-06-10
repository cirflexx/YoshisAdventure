class Utils{
public static checkCollision(go1: GameObject, go2: GameObject): boolean {

    return (go1.x < go2.x + go2.width && 
            go1.x + go1.width > go2.x &&
            go1.y < go2.y + go1.height && 
            go1.height + go1.y > go2.y);
    }
    

    
}