let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

class Box{
    constructor(size, color){
        this.size = size;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }
};

class Player extends Box {
    constructor(){
        super(50 ,"blue");
        this.x = 0;
        this.y = 225;
        this.speed = 0;
    
    }
    
    move(){
        this.x += this.speed;
    }
    //collision logic
    collidesWith(otherBox) {
        return (
          this.x < otherBox.x + otherBox.size &&
          this.x + this.size > otherBox.x &&
          this.y < otherBox.y + otherBox.size &&
          this.y + this.size > otherBox.y
        );
    }
};

class Enemy extends Box {
    constructor(speed){
        super(50, "red");
        this.speed = speed;
    }

    move(){
        //Changing the position of the blocks to make them move
        e1.y += e1.speed;
        e2.y += e2.speed;
        //for bouncing back of the enemies block
        if(this.y + this.size > 500)
        {
            this.speed = -(Math.abs(this.speed));
        }
        if(this.y < 0)
        {
            this.speed = Math.abs(this.speed);
        }
    }
};

//draws the rectangle
function draw(box){
    context.fillStyle = box.color;
    context.fillRect(box.x, box.y, box.size, box.size);
}

let player = new Player();
let e1 = new Enemy(2);
let e2 = new Enemy(4);
//positioning the enemies
e1.x = 120;
e2.x = 290;

function updateGame(){
    //requestAnimationFrame makes the aniation smooth
    window.requestAnimationFrame(() => {
        context.clearRect(0, 0, 500, 500);
        e1.move();
        e2.move();
        player.move();
        if(player.collidesWith(e1) || player.collidesWith(e2))
        {
            alert("Game over");
        }
        draw(player);
        draw(e1);
        draw(e2);
        updateGame();
    })
}
//invoing the function updateGame.
updateGame();

//Adding event listeners to window
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      player.speed = 5;
    }

    if(e.key === "ArrowLeft")
    {
        player.speed = -5;
    }
});

window.addEventListener("keyup", () => {
    player.speed = 0;
});
