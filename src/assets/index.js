
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
const starCountRef = ref(database, 'focusOverlay/value');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
    console.log(data)
});

$(document).ready(function(){





    // Init setting panel toggle
    togglePanel('focus');

    // Setting panel action handling
    $("#focusToggle").click(function(){
        togglePanel('focus');
        set(ref(database, 'cursorType/'), { value: 'focus',});
    });
    $("#pinToggle").click(function(){
        togglePanel('pin');
         set(ref(database, 'cursorType/'), { value: 'pin',});
    });


    $(document).on('change', '#focusOverlay', function(){
        set(ref(database, 'focusOverlay/'), { value: $(this).val(),});
    })
    $(document).on('change', '#focusRadius', function(){
        set(ref(database, 'focusRadius/'), { value: $(this).val(),});
    })
    $(document).on('change', '#pinRadius', function(){
        set(ref(database, 'pinRadius/'), { value: $(this).val(),});
    })
    $(document).on('change', '#pinColor', function(){
        set(ref(database, 'pinColor/'), { value: $(this).val(),});
    })

})



// Function to toggle setting panel
function togglePanel(target){
    $('.setting-block').slideUp(function(){     
        $('.setting-block > div').hide()
        $('.'+target+'-setting').show();
        $('.setting-block').slideDown();
    })
}