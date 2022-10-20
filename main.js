predection_1="";

Webcam.set({
    width:350, 
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
         document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

    });
}

console.log('ml5 version:', ml5.verssion);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nEHodhNda/model.json', modelLoaded);
function modelLoaded(){
    console.log('model loaded!');
}


function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The prediction is "+prediction_1;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult (error, results) {
    if (error) {
        console.error(error);
    }else{
        console.log(results);
        prediction_1=results[0].label;
        document.getElementById("result_emotion_name").innerHTML=prediction_1;
        speak();
        if(results[0].label=="peace")
        {
            document.getElementById("update_emoji").innerHTML="&#x270C;";
        }
        if(results[0].label=="thumbs up")
        {
            document.getElementById("update_emoji").innerHTML="&#x1F44D;";
        }

        if(results[0].label=="fist")
        {
            document.getElementById("update_emoji").innerHTML="&#x270A;";
        }

    }
}