

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa4TuXymnlM0EAjev0DyrBkoen0KU7pfE",
  authDomain: "miro-2c03c.firebaseapp.com",
  databaseURL: "https://miro-2c03c-default-rtdb.firebaseio.com/",
  projectId: "miro-2c03c",
  storageBucket: "miro-2c03c.appspot.com",
  messagingSenderId: "289727089942",
  appId: "1:289727089942:web:b99c81bd1e8c4ca8bf9437",
  measurementId: "G-3JEM9XFS4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);





var keyPressed = false;
$(document).on('keydown', function(e) {
  var key, fo , fr, focusOverlay, focusRadius, pinRadius, pinColor, pr, ct, cursorType, pc;
  if (keyPressed === false) {


    if(keyPressed == false){
        
        // Get Focus overlay power 
        fo = ref(database, 'focusOverlay/value');
        focusOverlay = 0.2;
        onValue(fo, (snapshot) => {
        focusOverlay =  0.2 +  parseFloat(snapshot.val()/10);
        });


        // Get Focus radius 
        fr = ref(database, 'focusRadius/value');
        focusRadius = 50;
        onValue(fr, (snapshot) => {
        focusRadius =  50 +  parseFloat(snapshot.val() * 10);
        });

        // Get Pin radius 
        pr = ref(database, 'pinRadius/value');
        pinRadius = 20;
        onValue(pr, (snapshot) => {
        pinRadius =  20 +  parseFloat(snapshot.val() * 10);
        });

        // Get Pin color 
        pc = ref(database, 'pinColor/value');
        pinColor = "#000000";
        onValue(pc, (snapshot) => {
        pinColor = snapshot.val();
        });

        // Get cursor type 
        ct = ref(database, 'cursorType/value');
        cursorType = "focus";
        onValue(ct, (snapshot) => {
        cursorType = snapshot.val();
        });

    }

    keyPressed = true;



    key = e.keyCode;
    if (key=='18') {
       $(document).mousemove(function(e) {
            if(keyPressed == true){
                if(cursorType == 'focus')
                    $('#html2canvasContainer').css({
                        'background':'radial-gradient( 50px 50px at '+ e.clientX +'px '+ e.clientY +'px, transparent, transparent ' + focusRadius + 'px, rgba(0,0,0,' + focusOverlay + ') '+ parseInt(focusRadius+50)+'px)',
                        'opacity' : '1'
                    });
                else 
                    $('#html2canvasContainer').css({
                        'background':'radial-gradient( 50px 50px at '+ e.clientX +'px '+ e.clientY +'px, '+pinColor+'91, '+pinColor+'91 '+ pinRadius+'px, rgba(0,0,0,0) '+ parseInt(pinRadius+50) +'px)',
                        'opacity' : '1'
                    });
            }
        });     
    }
  }
  $(this).on('keyup', function() {
    if (keyPressed === true) {
        keyPressed = false;
        $('#html2canvasContainer').css({  'opacity':'0' });
    }
  });
});