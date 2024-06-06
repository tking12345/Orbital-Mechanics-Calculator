const GMe = 3.986004418e14; 
const GMk = 3.5316e12;
const MeanRe = 6.371e6;
const MeanRk = 600000;
amink = 665000;
amine = 6931000


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
        document.getElementById("error").innerHTML = "<h4 id='error' style= 'color:red'>Must choose the body you are orbiting!</h4>";   
     }   

    if(Planet == "Earth"){
        MU = GMe;
        MR = MeanRe;
        MO = amine;
    }
    
    if(Planet == "Kerbin"){
        MU = GMk;
        MR = MeanRk;
        MO = amink;
        
    }   
}

function calculate(){

    WhatPlanet();

    //vis viva calculation 
    if (Planet != 0){
        document.getElementById("error").innerHTML = null;

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
    
    if (Planet != 0){
    
        document.getElementById("error").innerHTML = null;
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
        "Total &Delta;V: " + (deltaV+deltaV2).toFixed(3) + " m/s</br>" +
        "Orbital Period: " + Period3.toFixed(3) + " Minutes</br>";

        document.getElementById("new-orbit-output").innerHTML = results3
    }
}

function calculateCoplaner(){

    WhatPlanet();
    if (Planet != 0){
        //setting variables for equations
        document.getElementById("error").innerHTML = null;
        Periapsis1 = Number(document.getElementById("Per").value);
        Apoapsis1 = Number(document.getElementById("Apo").value);
        Apoapsis2 = Number(document.getElementById("Apo2").value);
        Periapsis2 = Number(document.getElementById("Per2").value);
        phi1 = Number(document.getElementById("cur-angle").value);
    
        //semi major axies
        a1 = (((Apoapsis1 + Periapsis1) + (2 * MR))/2);
        a3 = (((Apoapsis2 + Periapsis2) + (2 * MR)) / 2);

        //angular velocity of target
        wt = Math.sqrt((MU/Math.pow(a3, 3)));
       
        //angular velocity of interceptor
        wi = Math.sqrt(MU/Math.pow(a1, 3));
        

        //semi major axis of tranfer orbit
        at = (a1+a3)/2;

        //time of flight to the target
        TOF = Math.PI * Math.sqrt(Math.pow(at, 3)/MU);

        //lead angle between target and interceptor turned from rad to degrees
        lead = (wt * TOF);
        leaddeg = (180/Math.PI) * lead;

        final = Math.PI - lead;
        

        finaldeg = (180/Math.PI) * final;

        //phi1 from deg to rad
        phi1 = (Math.PI / 180) * phi1;
        
        //time between current location and burn 1

        
        waitTime = (final-phi1)/(wt-wi);
        

        if(waitTime < 0){
            waitTime =  ((2 * Math.PI) + (final-phi1))/(wt-wi);
        }
     


        results = "Lead angle: " + leaddeg.toFixed(3) + "&deg;</br>"+
        "Final angle: " + finaldeg.toFixed(3) + "&deg;</br>"+
        "Time of flight: " + (TOF/60).toFixed(2) + " minutes</br>" +
        "Wait time: " + (waitTime/60/60).toFixed(2) + " hours</br>";+
        "Wait time: " + (waitTime/60).toFixed(2) + " minutes</br>" +
        "Wait time: " + (waitTime).toFixed(2) + " seconds</br>";


        document.getElementById("coplaner-output").innerHTML = results;
    }
}

function calculateCoorbital(){

    WhatPlanet();
    if (Planet != 0){
        //setting variables for equations
        document.getElementById("error").innerHTML = null;
        ap = 0;
        // torbits = Number(document.getElementById("orbits-target").value);
        // iorbits = Number(document.getElementById("orbits-interceptor").value);


        Periapsis1 = Number(document.getElementById("Per").value);
        Apoapsis1 = Number(document.getElementById("Apo").value);
        
        //Phi initial in deg
        phi1 =  Number(document.getElementById("co-angle").value);
        console.log("Phi1 " + phi1);

        a1 = (((Apoapsis1 + Periapsis1) + (2 * MR))/2);
        console.log("a1 " + a1);

        // //time the target will be orbiting
        // target_orbit_time = ((torbits * (Math.PI * 2)) + phi1)/Math.sqrt(MU/a1);
        // console.log("Target orbit time " + target_orbit_time);

        // //semi major axis of the phasing orbit
        // ap = (((MU  *(target_orbit_time/((Math.PI * 2)*iorbits))**2))**(1/3));
        // console.log("ap " + ap);

        // //velocity at the initial orbit
        // v1 = Math.sqrt(MU * ((2/Periapsis1) - (1/Apoapsis1)));
        // console.log("v1 " + v1);

        // //velocity at the phasing orbit
        // vp = Math.sqrt(MU * ((2/Periapsis1) - (1/ap)));
        // console.log("vp " + vp);

        // deltaV = v1 - vp;
        // console.log("deltaV " + deltaV);

        // results = "Time the target will be orbiting: " + target_orbit_time.toFixed(3) + " seconds</br>"+
        // "Semi Major Axis of the phasing orbit: " + ap.toFixed(3) + " m</br>"+
        // "Velocity at the initial orbit: " + v1.toFixed(3) + " m/s</br>"+
        // "Velocity at the phasing orbit: " + vp.toFixed(3) + " m/s</br>"+
        // "&Delta;V: " + deltaV.toFixed(3) + " m/s</br>";





        if((phi1 < 0) || (phi1 == 180)){
             //phi target in rad
            phiT = (2 * Math.PI) + ((Math.PI/180)* Math.abs(phi1));
            console.log("phiT " + phiT);
            type = "Apoapsis";
        }

        if((phi1 > 0) && (phi1 < 180)){
            //phi target in rad
           phiT = (2 * Math.PI) - ((Math.PI/180)* phi1);
           console.log("phiT " + phiT);

           type = "Periapsis";
       }
        
       console.log("type " + type);

       while(ap < MO){
            //angular velocity of target
            wt = Math.sqrt((MU/Math.pow(a1, 3)));
            console.log("wt " + wt);

            //time of flight for the target
            TOFt = phiT/wt;
            console.log("TOFt " + TOFt);
            
            //using the TOF of target, we can derive the a of the phasing orbit
            ap = Math.cbrt((Math.pow((TOFt / (2 * Math.PI)), 2) * MU));
            console.log("ap " + ap);

            phiT = (2 * Math.PI) - phiT ;
        }
       

    
        //Mechanical energy of the phasing orbit
        Ep = -MU / (2 * ap);
        console.log("Ep " + Ep);

        // Velocity of the phasing orbit at periapsis 
        Vp = Math.sqrt(2 * (Ep + (MU / a1)));
        console.log("Vp " + Vp);

        //initial orbutal velocity and the deltaV (burns are the same so multiply 1 by 2)
        v1 = Math.sqrt(MU/a1);
        console.log("v1 " + v1);

        deltaV = Math.abs(v1 - Vp);
        deltaVTotal = deltaV * 2;

        
        


        results = "Angle to travel: " + (phiT * (180/Math.PI)) + " deg</br>" +
        "V@" + type + ": " + Vp.toLocaleString() + " m/s</br>" +
        "Semi Major Axis of phasing orbit: " + ap.toLocaleString() + " m</br>" +
        "&Delta;V: " + deltaV.toLocaleString() + " m/s</br>" +
        "Total &Delta;V: " + deltaVTotal.toLocaleString() + " m/s</br>" +
        "Time of flight: " + (TOFt/60/60).toLocaleString() + " hours</br>" +
        "Time of flight: " + (TOFt/60).toLocaleString() + " minutes</br>" +
        "Time of flight: " + (TOFt).toLocaleString() + " seconds</br>" ;


        document.getElementById("coorbital-output").innerHTML = results;
    }
}
    
    
