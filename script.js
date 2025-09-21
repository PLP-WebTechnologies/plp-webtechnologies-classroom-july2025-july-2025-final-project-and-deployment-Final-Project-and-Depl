//Getting the HTML elements using their id's
const MyForm=document.getElementById("form");
const TheName=document.getElementById("name");
const TheEmail=document.getElementById("email address");
const PhoneNumber=document.getElementById("phone number");
const Comments=document.getElementById("Addition");

//Getting the Errors using their id's
 const nameError=document.getElementById("nameError");
 const emailError=document.getElementById("emailError");
 const phoneError=document.getElementById("PhonenumberError");
 const commentsError=document.getElementById("additionError");


//Adding the event listener to the form
MyForm.addEventListener('submit', function(event)
{
    if (TheName.value.trim() === ''){
   //Preventing the browser from reloading and submitting the form
    event.preventDefault();
    //Showing the error message below the name input field
    nameError.innerHTML = "Name is required!"


    }
    if (TheEmail.value.trim() === ''){
        event.preventDefault()
        emailError.innerHTML="Email is required"
    }
    if(PhoneNumber.value.trim() === ''){
        event.preventDefault()
    phoneError.innerHTML="Phone Number is required"
    }
    if(Comments.value.trim() === ''){
        commentsError.innerHTML="Comment on anything"
    }
    
    
});

    



