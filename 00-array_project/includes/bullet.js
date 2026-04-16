
class Bullet{
    constructor(){
        this.temp_bullet;
        this.has_temp_bullet = false;
        this.bulletList = [];//0: x origon, 1:y origon, 2:z origon, 3:rotationX, 4:rotationY, 5:rotationZ, 6: dist total, 7:dist current
        this.bulletSpeed = 5;
    }

    tickBullet(){
        for(let i = 0; i<this.bulletList.length; i+=8){
            if(this.has_temp_bullet){
                let start = this.bulletList.length;
                for(){}
            }

            //console.log("ticking bullet" + i);
            push();
            translate(this.bulletList[0], this.bulletList[1], this.bulletList[2]);
            rotateX(this.bulletList[3]);
            rotateY(this.bulletList[4]);
            rotateZ(this.bulletList[5]);

            //tick the bullet
            if(this.bulletList[7] < this.bulletList[6]){
                this.bulletList[7] += 1;
            }else{
                this.bulletList.splice(i, 8);
                i-=8;
            }

            translate(this.bulletList[7]*this.bulletSpeed, 0, 0);
            fill(228, 223, 84);
            noStroke();
            box(4, 1, 1);
            pop();
        }
    }

    createBullet(x, y, z, ax, ay, az, dist_total){
        temp_bullet = [x, y, z, ax, ay, az, dist_total, 0];
        this.has_temp_bullet = true;
        // let start = this.bulletList.length;
        // this.bulletList[start] = x;
        // this.bulletList[start+1] = y;
        // this.bulletList[start+2] = z;
        // this.bulletList[start+3] = ax;
        // this.bulletList[start+4] = ay;
        // this.bulletList[start+5] = az;
        // this.bulletList[start+6] = dist_total;
        // this.bulletList[start+7] = 0;
    }
}