//i also need this to build all the planes in game
//this class should be ticked in the draw GUI loop
class PlaneMaker{
    constructor(){
        this.editorButton = [
            createIGButton(-0.28, 0.42, 0.05, 0.05, 0.5, "Left"),
            createIGButton(-0.21, 0.42, 0.05, 0.05, 0.5, "Right"),
            createIGButton(-0.14, 0.42, 0.05, 0.05, 0.5, "Front"),
            createIGButton(-0.07, 0.42, 0.05, 0.05, 0.5, "Back"),
            createIGButton(0.0, 0.42, 0.05, 0.05, 0.5, "Up"),
            createIGButton(0.07, 0.42, 0.05, 0.05, 0.5, "Down"),
            createIGButton(0.14, 0.42, 0.05, 0.05, 0.4, "rotateX"),
            createIGButton(0.21, 0.42, 0.05, 0.05, 0.4, "rotateY"),
            createIGButton(0.28, 0.42, 0.05, 0.05, 0.4, "rotateZ"),
        ];

        myShare.chara.y_sync_primary = false;
    }

    tickEditorGUI(){
        
    }
}