let buttons = [];
const buttonTemplate = {x:0, y:0, dx:0, dy:0, pressed:false, idleColor:[255,255,255,255], activeColor:[255,255,255,255], text:"button text", show:true};


class UserUI{
    constructor(){
        this.enable_map = false;

        this.DOWNSCALE_FACTOR = 95.5 * (windowHeight/945);// the downscale factor to fit the current screen height
        this.GUI_WIDTH = windowWidth/windowHeight * this.DOWNSCALE_FACTOR;// the width of screen in term of the gui position
        this.MAP_GUI_SIZE = floor(0.95  * this.DOWNSCALE_FACTOR);
        this.ROW_COLL = 25;// how much row and collumn, please leave this as odd number
        this.GRID_IG = 100;// if is 5, then stroken is 1/5 of grid
        this.STROKE_SIZE = 10;// how much each grid corisponding in game

        this.templateMap = [];

        // generate the map
        this.mapBG;
        this.mapSelfArrow;
        this.othersLocation;
        this.currentMapCached;
        this.angleSelfCached;
        this.REFRESH_INTERVAL = 100;
        this.current_frame = 0;
        this.preloadGUIElements();

        this.I = 0;

    }
    tickUI(cameraPos){
        // place the origininfront of the camera and draw stuff on it
        push();
        translate(cameraPos.x, cameraPos.y, cameraPos.z);
        rotateZ(cameraPos.h + HALF_PI);
        rotateX(cameraPos.v + HALF_PI);
        translate(0, -80.01, 0);
        rotateX(HALF_PI);
        noStroke();

        // draw the map
        if(this.enable_map){
            this.drawMap();
        }

        // draw the button
        this.drawButton();

        pop();
    }

    drawMap(){
        const oneGridSize = this.MAP_GUI_SIZE/this.ROW_COLL;
        const GUICorner = this.ROW_COLL/2 * oneGridSize;

        // display the 2d grid array map that shows the position of enemies
        image(this.mapBG, this.MAP_GUI_SIZE*-0.5, this.MAP_GUI_SIZE*-0.5, this.MAP_GUI_SIZE, this.MAP_GUI_SIZE);

        // only refresh once every REFRESH_INTERVAL
        if(this.current_frame <= 0){
            this.current_frame = this.REFRESH_INTERVAL;

            let cornerX = floor(myShare.chara.primary_parts[2]/this.GRID_IG)-floor(this.ROW_COLL/2);// left corner of the map
            let cornerY = floor(myShare.chara.primary_parts[3]/this.GRID_IG)-floor(this.ROW_COLL/2);// top corner

            // ploting all other users onto the map
            this.currentMapCached = structuredClone(this.templateMap);
            for(const userData of otherShares){
                if(userData.ID === myShare.ID){continue;}
                let chunkX = floor(userData.chara.primary_parts[2]/this.GRID_IG) - cornerX;
                let chunkY = floor(userData.chara.primary_parts[3]/this.GRID_IG) - cornerY;
                if(chunkX > this.ROW_COLL || chunkX < 0 || chunkY > this.ROW_COLL || chunkY < 0){
                    continue;// if out of map then dont show it
                }
                this.currentMapCached[chunkY][chunkX] = 1;
            }

            this.angleSelfCached = myShare.chara.primary_parts[8];
        }
        
        let tint_alpha = this.current_frame/this.REFRESH_INTERVAL;
        tint(500, floor(tint_alpha*255));

        // display the self arrow in the center of the map, with rotation
        push();
        rotateZ(-this.angleSelfCached - PI);
        image(this.mapSelfArrow, -oneGridSize/2, -oneGridSize/2, oneGridSize, oneGridSize);
        pop();


        for(let y = 0; y < this.ROW_COLL; y++){
            for(let x = 0; x < this.ROW_COLL; x++){
                if(!!this.currentMapCached[y][x]){
                    // image(this.othersLocation, -GUICorner + x*oneGridSize, GUICorner - (y+1)*oneGridSize, oneGridSize, oneGridSize);
                    image(this.othersLocation, -GUICorner + y*oneGridSize, -GUICorner + x*oneGridSize, oneGridSize, oneGridSize);
                }
            }
        }

        // tick the interval
        this.current_frame--;
    }

    // draw the GUI buttons
    drawButton(){
        for(const button of buttons){
            textFont(font);
            console.log(`${button.x} ${button.y} ${button.dx} ${button.dy}`);
            if(!button.show){continue};
            fill(button.pressed? button.activeColor:button.idleColor);
            rect(button.x, button.y, button.dx, button.dy);
            fill(128);
            text(button.text, button.x, button.y);
        }
    }

    // call this function when mouse left licked to check if a button is pressed
    buttonPressed(){
        const pixelToUnitX = this.GUI_WIDTH/windowWidth;
        const pixelToUnitY = this.DOWNSCALE_FACTOR/windowHeight;

        let mouseUnitX = mouseX*pixelToUnitX;
        let mouseUnitY = mouseY*pixelToUnitY;

        for(let button of buttons){
            if(mouseUnitX < button.x || mouseUnitX > button.x+button.dx || mouseUnitY > button.y+button.dy || mouseUnitY < button.y){
                continue;
            }

            button.pressed = true;
            break;
        }
    }

    preloadGUIElements(){
        this.mapSelfArrow = loadImage("assets/player_icon.png");
        this.othersLocation = loadImage("assets/enemy_icon.png");

        // generate the map
        let map_pixel = this.ROW_COLL * (this.STROKE_SIZE+1) + 1;
        this.mapBG = createImage(map_pixel, map_pixel);
        this.mapBG.loadPixels();
        for(let y = 0; y < this.mapBG.height; y++){
            for(let x = 0; x < this.mapBG.width; x++){
                this.mapBG.set(x, y, [23, 192, 2, 255]);
            }
        }
        for(let y = 1; y< this.mapBG.height; y+=this.STROKE_SIZE+1){
            for(let x = 1; x< this.mapBG.width; x+= this.STROKE_SIZE+1){
                // draw little square as the grid
                for(let x_add = 0; x_add < this.STROKE_SIZE; x_add++){
                    for(let y_add = 0; y_add < this.STROKE_SIZE; y_add++){
                        this.mapBG.set(x+x_add, y+y_add, [7, 43, 4, 255]);
                    }
                }
            }
        }
        this.mapBG.updatePixels();

        // template map for all the other players
        for(let y = 0; y < this.ROW_COLL; y++){
            this.templateMap[y] = [];
            for(let x = 0; x < this.ROW_COLL; x++){
                this.templateMap[y][x] = 0;
            }
        }
    }
}

// create a new button
function createIGButton(x, y, dx, dy){
    let new_button = structuredClone(buttonTemplate);

    new_button.x = user_ui.GUI_WIDTH * x;
    new_button.y = user_ui.DOWNSCALE_FACTOR * y;
    new_button.dy = user_ui.DOWNSCALE_FACTOR * dy;
    new_button.dx = user_ui.GUI_WIDTH * dx;

    console.log(`${new_button.x} ${new_button.y} ${new_button.dx} ${new_button.dy}`);

    buttons.push(new_button);
    return new_button;
}