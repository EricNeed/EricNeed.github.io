//i also need this to build all the planes in game
//this class should be ticked in the draw GUI loop
class PlaneMaker{
    constructor(){
        this.editorButton = [
            createIGButton(-0.35, 0.42, 0.05, 0.05, 0.5, "Left"),
            createIGButton(-0.28, 0.42, 0.05, 0.05, 0.5, "Right"),
            createIGButton(-0.21, 0.42, 0.05, 0.05, 0.5, "Front"),
            createIGButton(-0.14, 0.42, 0.05, 0.05, 0.5, "Back"),
            createIGButton(-0.07, 0.42, 0.05, 0.05, 0.5, "Up"),
            createIGButton(0.0, 0.42, 0.05, 0.05, 0.5, "Down"),
            createIGButton(0.07, 0.42, 0.05, 0.05, 0.4, "rotateX"),
            createIGButton(0.14, 0.42, 0.05, 0.05, 0.4, "rotateY"),
            createIGButton(0.21, 0.42, 0.05, 0.05, 0.4, "rotateZ"),
            createIGButton(0.28, 0.42, 0.05, 0.05, 0.4, "sizeX/rad"),
            createIGButton(0.35, 0.42, 0.05, 0.05, 0.4, "sizeY/LOD"),
            createIGButton(0.42, 0.42, 0.05, 0.05, 0.4, "sizeZ"),
            createIGButton(-0.49, 0.30, 0.05, 0.05, 0.4, "cube"),
            createIGButton(-0.49, 0.36, 0.05, 0.05, 0.4, "cylinder"),
            createIGButton(-0.49, 0.42, 0.05, 0.05, 0.4, "cone"),
        ];

        this.new_plane_index = plane_constructs.length;
        this.new_plane = plane_constructs[this.new_plane_index] = [];
        myShare.chara.y_sync_primary = false;
        myShare.chara.primary_parts[11] = this.new_plane_index;

        this.newPartHeadIndex = 0; //the begining index of current editing part of plane
    }

    tickEditorGUI(){
        //tick all the buttons
        for(let i = 0; i<this.editorButton.length; i++){
            let current_button = this.editorButton[i];
            if(!current_button.pressed){continue;}

            switch(i){
                case 0:
                break;
                case 1:
                break;
                case 2:
                break;
                case 3:
                break;
                case 4:
                break;
                case 5:
                break;
                case 6:
                break;
                case 7:
                break;
                case 8:
                break;
                case 9:
                break;
                case 10:
                    this.new_plane[this.newPartHeadIndex+6] +=
                break;
                case 11:
                    this.new_plane[this.newPartHeadIndex+7] += 0.2
                break;
                case 12:
                    console.log("adding a cube");
                    this.newPartHeadIndex = this.new_plane.length;
                    this.new_plane[this.newPartHeadIndex] = 0;
                    this.new_plane[this.newPartHeadIndex+1] = false;
                    this.fillInDefaultPlacement(this.newPartHeadIndex);
                break;
                case 13:
                    console.log("adding a cylinder");
                    this.newPartHeadIndex = this.new_plane.length;
                    this.new_plane[this.newPartHeadIndex] = 1;
                    this.new_plane[this.newPartHeadIndex+1] = false;
                    this.fillInDefaultPlacement(this.newPartHeadIndex);
                break;
                case 14:
                    console.log("adding a cone");
                    this.newPartHeadIndex = this.new_plane.length;
                    this.new_plane[this.newPartHeadIndex] = 2;
                    this.new_plane[this.newPartHeadIndex+1] = false;
                    this.fillInDefaultPlacement(this.newPartHeadIndex);
                break;
            }

            current_button.pressed = false;
            break;
        }
    }

    fillInDefaultPlacement(start_index){
        for(let i = 2;i<11; i++){
            this.new_plane[start_index+i] = 0;
        }
    }
}