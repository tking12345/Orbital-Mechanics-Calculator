const GMe = 3.986004418e14;
const GMk = 3.5316e12;
const MeanRe = 6.371e6;
const MeanRk = 600000;

MU = 0;
MR = 0;

//planet choice
function WhatPlanet(){
    if(document.getElementById('Earth').checked) {   
        Planet = "Earth";  
     }  
    
     else if(document.getElementById('Kerbin').checked) {   
         Planet = "Kerbin";
     }   
    
     else { 
        Planet = 0;  
        document.getElementById("error").innerHTML = "Must choose the body you are orbiting!";   
     }   

    if(Planet == "Earth"){
        MU = GMe;
        MR = MeanRe;
    }
    
    if(Planet == "Kerbin"){
        MU = GMk;
        MR = MeanRk;
    }   
}

function calculate(){

    WhatPlanet();

    //vis viva calculation 
    if (Planet != 0){

        var Apoapsis1 = Number(document.getElementById("Apo").value);
        var Periapsis1 = Number(document.getElementById("Per").value);


        var a1 = (((Apoapsis1 + Periapsis1) + 2 * MR)/2);

        var VAP1 = Math.sqrt((MU*((2/(Apoapsis1 + MR))-(1/a1)))); 
        var VPE1 = Math.sqrt(MU*((2/(Periapsis1+MR))-(1/a1))); 
        var Period1 = ((2*Math.PI)*Math.sqrt((Math.pow(a1,3)/MU)))/60;

        results1 =  
        "Selected planet: " + Planet + "</br>" + 
        "Apoapsis: "+ Apoapsis1.toLocaleString() + "m" +"</br>"+
        "Periapsis: " + Periapsis1.toLocaleString() + "m" +"</br>" + 
        "Semi Major Axis: " + a1.toLocaleString() + "m" +"</br>" +
        "V@AP: " + VAP1.toLocaleString() + "m/s" + "</br>"+
        "V@PE: " + VPE1.toLocaleString()  +"m/s" +"</br>" +
        "Orbital Period: " + Period1.toFixed(2) + " Minutes"+ "</br>";

        //result of the calculation sent to page
        document.getElementById("orbit-info-output").innerHTML = results1; 
    }
}

function calculateHohmann(){

    WhatPlanet();
    var Periapsis1 = Number(document.getElementById("Per").value);
    var Apoapsis1 = Number(document.getElementById("Apo").value);
    var Apoapsis2 = Number(document.getElementById("Apo2").value);
    var Periapsis2 = Number(document.getElementById("Per2").value);
    var a1 = (((Apoapsis1 + Periapsis1) + (2 * MR))/2);

    //Burn 1
    var a2 = (((Apoapsis2 + Periapsis1) + (2 * MR))/2);
    var VPE1 = Math.sqrt((MU * ((2 / (Periapsis1 + MR))-(1 / a1)))); 
    var VAP2 = Math.sqrt((MU * ((2 / (Apoapsis2 + MR))-(1 / a2)))); 
    var VPE1_1 = Math.sqrt(MU * ((2 / (Periapsis1 + MR))-(1 / a2)));
    var deltaV = Math.abs(VPE1_1 - VPE1);
    var Period2 = ((2*Math.PI)*Math.sqrt((Math.pow(a2,3)/MU)))/60;

    newApoapsis = Math.max(Apoapsis2,Periapsis1);
    newPeriapsis = Math.min(Apoapsis2, Periapsis1);
    newVAP = Math.min(VAP2, VPE1_1);
    newVEP = Math.max(VAP2, VPE1_1);

    results2 = "Transfer orbit after burn 1: </br>" + 
    "Apoapsis: " + newApoapsis.toLocaleString() + " m</br>" + 
    "Periapsis: " + newPeriapsis.toLocaleString() + " m</br>" +
    "Semi Major Axis: " + a2.toLocaleString() + " m</br>" + 
    "V@AP: " + newVAP.toLocaleString() + " m/s</br>" +
    "V@PE: " + newVEP.toLocaleString() +" m/s</br>"+
    "&Delta;V: " + deltaV.toLocaleString() + " m/s</br>" + 
    "Orbital Period: " + Period2.toFixed(2) + " Minutes</br>"+
    "Time in transfer orbit: " + (Period2/2).toFixed(2) + " Minutes</br> ";

    document.getElementById("hohmann-transfer-output").innerHTML = results2

    newApoapsis = null;
    newPeriapsis = null;
    newVAP = null;
    newVEP = null;
    //Burn 2
    var a3 = (((Apoapsis2 + Periapsis2) + (2 * MR)) / 2);


    var VAP2_2 =Math.sqrt((MU * ((2 / (Apoapsis2 + MR))-(1 / a3)))); 
    var VPE2 = Math.sqrt(MU * ((2 / (Periapsis2 + MR))-(1 / a3))); 
    var deltaV2 = Math.abs(VAP2_2 -VAP2) ;
    var Period3 = (((2*Math.PI)*Math.sqrt((Math.pow(a3,3)/MU)))/60);
     
    newApoapsis = Math.max(Periapsis2, Apoapsis2);
    newPeriapsis = Math.min(Periapsis2, Apoapsis2);
    newVAP = Math.min(VAP2_2, VPE2);
    newVEP = Math.max(VAP2_2, VPE2);

    results3 = "New orbit after burn 2: </br>" + 
    "Apoapsis: " + newApoapsis.toLocaleString()+ " m</br>" + 
    "Periapsis: " + newPeriapsis.toLocaleString() + " m</br>" +
    "Semi Major Axis: " + a3.toLocaleString() + " m</br>" + 
    "V@AP: " + VAP2_2.toLocaleString() + " m/s</br>" +
    "V@PE: " + VPE2.toLocaleString() +" m/s</br>"+
    "&Delta;V: " + deltaV2.toLocaleString() + " m/s</br>" +
    "Total &Delta;V: " + (deltaV+deltaV2) + " m/s</br>" +
    "Orbital Period: " + Period3.toFixed(3) + " Minutes</br>";

    document.getElementById("new-orbit-output").innerHTML = results3
}
    
    
