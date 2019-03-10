window.onload = function () {
    //Get the Canvas and the Context and store in a var
    var canvas = document.getElementById("sky");
    var ctx = canvas.getContext("2d");

    //Set Canvas Dimensions to the Window height and width
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //Generate the snowflakes and apply attribute
    var mf = 200; //Max Flakes
    var flakes = [];

    //loop through the empty flakes array and apply attribute
    for (var i = 0; i < mf; i++) {
        flakes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 5 + 2, //min 2px and max 7px
            d: Math.random() + 1 // density of the flake
        })
    }
    //draw flakes onto the canvas
    function drawFlakes() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for (var i = 0; i < mf; i++) {
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
    }
    //animate the flakes
    var angle = 0;

    function moveFlakes() {
        angle += 0.01;
        for (var i = 0; i < mf; i++) {
            //store current flake
            var f = flakes[i];

            //update x and y coordinate of each snowflakes
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;

            //if snowflakes reaches the bottom, send a new one to the top
            if (f.y > H) {
                flakes[i] = {
                    x: Math.random() * W,
                    y: 0,
                    r: f.r,
                    d: f.d
                }
            }
            //if a snowflake reaches the right side, send a new one to the left
            if (f.x > W) {
                flakes[i] = {
                    x: f.x - W,
                    y: f.y,
                    r: f.r,
                    d: f.d
                }

                //if a snowflake reaches the left side, send a new one to the right	
            }
            if (f.x < 0) {
                flakes[i] = {
                    x: f.x + W,
                    y: f.y,
                    r: f.r,
                    d: f.d
                }

            }
        }
    }
    setInterval(drawFlakes, 25)
}