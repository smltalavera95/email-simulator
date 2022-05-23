'use strict'

//Variables
const mailForm = document.querySelector('#mailForm');
const btnSubmit = document.querySelector('#submit');
const btnReset = document.querySelector('#clear');
const fieldFrom = document.querySelector('#email');
const fieldTo = document.querySelector('#emailto');
const fieldSubject = document.querySelector('#subject');
const fieldMessage = document.querySelector('#message');
const rEx= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let valueEmail;

//Listener
eventListeners();
function eventListeners(){  
    document.addEventListener('DOMContentLoaded', startApp);
    fieldFrom.addEventListener('blur', checkForm)
    fieldTo.addEventListener('blur', checkForm);
    fieldSubject.addEventListener('blur', checkForm);
    fieldMessage.addEventListener('blur', checkForm);
    mailForm.addEventListener('submit', sendEmail);
    btnReset.addEventListener('click', resetForm);
}

//Functions
function startApp(){
    btnSubmit.disabled= true;
    btnSubmit.classList.add('bg-opacity-30', 'cursor-not-allowed');
    
}
function checkForm(e){
    /*Check if the field has a value, if is check if border red is there, remove it and 
    add border green.
    If not add border red and make the callback to show the error.
    */
    if(e.target.value.length >0){
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        e.target.classList.add('border', 'border-green-500');
        if(e.target.classList.contains('border-red-500')){
            e.target.classList.remove('border-red-500');
        }
    }else{
        if(e.target.classList.contains('border-green-500')){
            e.target.classList.remove('border-green-500');
        }
        e.target.classList.add('border', 'border-red-500');
        showError('All the fields are required');
    }

    //Validate the email, first checking if the target is on email
    if(e.target.type == "email"){
        valueEmail = e.target.value;
        if(rEx.test(valueEmail.toLowerCase())){
            e.target.classList.add('border', 'border-green-500');
            if(e.target.classList.contains('border-red-500')){
                e.target.classList.remove('border-red-500');
            }
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            btnSubmit.classList.remove('cursor-not-allowed');
        }else{
            if(e.target.classList.contains('border-green-500')){
                e.target.classList.remove('border-green-500');
            }
            e.target.classList.add('border', 'border-red-500');
            showError('Email is not correct');
        }
    }

    //If everthing is fine remove the css classes and available the button
    if(rEx.test(fieldFrom.value) && rEx.test(fieldTo.value) && fieldSubject !== ''  && fieldMessage !== ''){
        btnSubmit.classList.remove('cursor-not-allowed', 'bg-opacity-30');
        btnSubmit.disabled= false;
    }
}
/*
    Function to show the error and get the message.
*/
function showError(msg){
    const messageError = document.createElement('p');

    messageError.textContent = msg;
    messageError.classList.add('border', 'border-red-500', 'bg-red-100', 'text-red-500', 'p-3', 'text-center', 'error');

    const errors = document.querySelectorAll('.error');

    if(errors.length==0){
        mailForm.appendChild(messageError);
    }
    
}

/**
 * Emulating the send of Email
 */
function sendEmail(e){
    e.preventDefault();

    //Showing spinner
    const spinner = document.querySelector('.animate-spin');

    spinner.style.display= 'flex';

    setTimeout(()=>{
        spinner.style.display = "none";

        //Msg Send it
        const parr = document.createElement('p');
        //Msg content
        parr.textContent='Your email has been sent!';
        parr.classList.add('msg-submit', 'bg-green-100');

        //Inserting MSG
        mailForm.insertBefore(parr, spinner.parentElement);   

        setTimeout(()=>{
            parr.remove();
            startApp();
            resetForm();
        }, 5000)
    }, 3000);
}

//Reset Form
function resetForm(){
    mailForm.reset();
    startApp();
}