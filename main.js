const form = document.getElementById('form');

const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');

const nameRegex = /^[a-zA-Z\u0600-\u06FF\_'-]{3,20}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

form.addEventListener('submit', (e) => {
    // Prevent form submission for validation
    e.preventDefault();

    // Validate all fields
    const isFirstNameValid = validateForm(firstName.value.trim(), 'first-name');
    const isLastNameValid = validateForm(lastName.value.trim(), 'last-name');
    const isEmailValid = validateForm(email.value.trim(), 'email');
    const isPasswordValid = validateForm(password.value.trim(), 'password');

    // If all validations pass, submit the form
    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
        console.log('Form submitted successfully!');
        form.submit(); 
    } else {
        console.log('Form contains invalid inputs!');
    }
});

//Change Error Messages
function handdleErrors (){
    const formControls = document.querySelectorAll('.form-control');
    let errosMessages=[
        {
           empty:"First Name cannot be empty",
           hint:"First Name must be 3-15 characters, no numbers, only '_' and '-' are allowed.",
       },
       {
           empty:"Last Name cannot be empty",
           hint:"First Name must be 3-15 characters, no numbers, only '_' and '-' are allowed.",
       },
       {
           empty:"Email cannot be empty",
           hint:"Looks like this is not an email",
       },
       {
           empty:"Password cannot be empty",
           hint:"Password must be at least 8 char,and contains at least one(A-Z), one(a-z), one(0-9), *one special char (e.g., @, $, !)."
       },
   ]
    formControls.forEach((el,i)=>{
        errosMessages.forEach((msg,j)=>{
            if(i==j){
                if( el.firstElementChild.value.length==0){
                el.lastElementChild.innerHTML=`${msg.empty}`    
            }else {
                el.lastElementChild.innerHTML=`${msg.hint}`    
            }
            }
        })
    })

}


// Min Validate Function
function validateForm(value, id) {
    let regex;
    const elParent = document.querySelector(`.${id}`);
    handdleErrors ();
    if (id === 'email') {
        regex = emailRegex;
    } else if (id === 'password') {
        regex = passwordRegex;
    } else {
        regex = nameRegex;
    }

    if (value === '' || !value.match(regex)) {
        console.log(`Invalid ${id}`);
        elParent.classList.add('not-valid');
        elParent.classList.remove('valid');
        return false;
    } else {
        console.log(`Valid ${id}`);
        elParent.classList.remove('not-valid');
        elParent.classList.add('valid');
        return true;
    }
    
    
}
