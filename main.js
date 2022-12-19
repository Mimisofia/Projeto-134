img = "";
objects = [];
status = "";

function preload()
{
    song = loadSong('alarm.mp3');
}

function setup()
{
    canvas = createCanvas (380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: Detectando objetos";
}

function modelLoaded()
{
    console.log("Modelo carregado");
    status = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error,results)
{
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objetos detectados ";
            document.getElementById("numberOfObjects").innerHTML = "Bebê encontrado: "+ objects.length;
            stop("alarm.mp3");
            document.getElementById("numberOfObjects").innerHTML = "Bebê  não encontrado: "+ objects.length;
            play("alarm.mp3");
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }

    }
    
}    