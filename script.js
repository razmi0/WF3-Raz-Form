"use strict";


import {getGoodRandomNumber , generatePassword} from "./tp-05.js";


//#region //o CONSIGNE
// Indiquer les champs obligatoires
// --

// 1. Cibler tous les éléments qui possède l'attribut "required"
// 2. remoter sur son élément parent
// 3. Cibler l'élément frere "label"
// 4. Injecter la class "required" sur l'element "label"

// HTML

// <!--
// 1. Indiquer les champs obligatoires
// 2. Générer les listes de selections du champ "Birthday"
// 3. Controle JS lorsque l'utilisateur quitte le champ
// 4. Controle JS lorsque l'utilisateur soummet le formulaire
// 5. Personnaliser un message d'erreur en fonction du champ
// -->
//#endregion //o END CONSIGNE

//#region //o INIT VAR
const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];
const arr_required = document.querySelectorAll("[required]");
const form = document.querySelector("form");
const select_day = document.querySelector('[name="birthday[day]"]');
const select_month = document.querySelector('[name="birthday[month]"]');
const select_year = document.querySelector('[name="birthday[year]"]');
const password_button = document.querySelector('#genPassword');
const el_firstname = document.querySelector("input[name=firstname]");
const el_lastname = document.querySelector("input[name=lastname]");
const el_email = document.querySelector("input[name=email]");
const el_password = document.querySelector("input[name=password]");
const arr_inputs = [el_firstname , el_lastname , el_email];
const date = new Date();
const year = date.getFullYear();
const minYear = year - 100;
const lengthPassword = 10;
const urlGoodRandom  = `https://www.random.org/integers/?num=${lengthPassword}&min=0&max=100&col=1&base=10&format=plain&rnd=new`;

//#endregion //o END INIT VAR

//#region //o INIT FUNCTION

function setRequiredIndicators() {
  for (const item of arr_required) {
    let parent;
    let label;

    if (item.nodeName === "INPUT") {
      parent = item.parentNode;
    } else if (item.nodeName === "SELECT") {
      parent = item.parentNode.parentNode.parentNode;
    }

    if (parent.nodeName === "DIV") {
      label = parent.querySelector("label");
    } else {
      label = parent;
    }

    label.classList.add("required");
  }
}

function setBirthdayOptions() {
  //DAYS
  for (let i = 1; i <= 31; i++) {
    let el_option = document.createElement("option");
    el_option.value = i;
    el_option.innerText = i <= 9 ? `0${i}` : i;

    select_day.append(el_option);
  }
  //MONTHS
  for (let i = 0; i < months.length; i++) {
    let el_option = document.createElement("option");
    el_option.value = i + 1;
    el_option.innerText = months[i];

    select_month.append(el_option);
  }
  //YEARS
  for (let i = year; i >= minYear; i--) {
    let el_option = document.createElement("option");
    el_option.innerText = i;

    select_year.append(el_option);
  }
}

function isInputValid(el_target) {

    const target_value = el_target.value;
    const target_type  = el_target.type;
    const target_name  = el_target.name;
    let error = false;

    //? TEST LONGUEUR === 0

    if (!target_value.length) {
        setError(el_target, ` ❌ Input ${target_name} can't be empty`);
        error = true;
    }

    //? TEST REG EXP TYPE TEXT

    if (target_type === "text") {
        if (!/^[a-z][a-z-]*[a-z]?$/i.test(target_value)) {
            setError(el_target,` ❌ ${target_name} must contain only alphabetic characters`);
            error = true;
        }
        return error;
    }

    //? TEST REG EXP TYPE EMAIL

    else if (target_type === "email"){

        if (!/^[0-9a-zA-Z-.$#]+@[0-9a-zA-Z-$#]+.[a-zA-Z]{2,5}$/i.test(target_value)) {
            setError(el_target,` ❌ Your ${target_name} format must be words@words.word`);
            error = true;
        }
        return error;
    }
}

function setError(target, message) {
  let el_error = document.createElement("div");
  el_error.classList.add("error");
  el_error.innerText = message;

  target.classList.add("is-invalid");
  target.parentNode.append(el_error);
  console.log("error");

}

function setValid(target, message) {
    let el_valid = document.createElement("div");
    el_valid.classList.add("valid");
    el_valid.innerText = message;
  
    target.classList.add("is-valid");
    target.parentNode.append(el_valid);
    console.log("valid");
}

function removeError(target = null) {
  // IF ERROR ON SUBMIT TARGET IS NULL
  if (target === null) {
    const isInvalid = document.querySelectorAll(".is-invalid");

    for (const item of isInvalid) {
      item.classList.remove("is-invalid");
    }

    const errors = document.querySelectorAll(".error");

    for (const item of errors) {
      item.remove();
    }
  }
  // IF TARGET IS NOT TARGET, TARGET POINT TO THE INPUT
  else {

    let error = document.querySelector('.error');

    error.remove();
    target.classList.remove('is-invalid');
    target.value = "";

  }
}

function removeValid(target = null) {
      // IF ERROR ON SUBMIT TARGET IS NULL
  if (target === null) {
    const isValid = document.querySelectorAll(".is-valid");

    for (const item of isValid) {
      item.classList.remove("is-valid");
    }

    const valids = document.querySelectorAll(".valid");

    for (const item of valids) {
      item.remove();
    }
  }
  // IF TARGET IS NOT TARGET, TARGET POINT TO THE INPUT
  else {

    let valid = document.querySelector('.valid');

    valid.remove();
    target.classList.remove('is-valid');
    target.value = "";

  }
}
//#endregion //o END INIT FUNCTION

//#region //o BLOC INSTRUCTIONS

setRequiredIndicators();
setBirthdayOptions();

//? GENERATE PASSWORD IF NEEDED

password_button.addEventListener ( 'click', () => {
    getGoodRandomNumber(urlGoodRandom)
      .then((randomNumbers) => {
        const new_password = (generatePassword(randomNumbers));
        console.log(`New password is : ${new_password.value} and his length is ${new_password.length}`)
        el_password.textContent = new_password.value;
        
      })
      .catch("Nop promesse failed ");
  
})

//? CONTROLE FORMULAIRE

form.addEventListener("submit", (e) => {
  let error = false;

  //RESET FORM
  removeError();

  //CHECK TEXT INPUT
  error = isInputValid(el_firstname);
  error = isInputValid(el_lastname);
  error = isInputValid(el_email);

  if (error) {
    e.preventDefault();
  }
});


arr_inputs.forEach(input => {
    input.addEventListener( 'blur' , (e) => {
        if (input.value){
            let error = isInputValid(input);
            if (error === false) {
                setValid(input , ` ✔ I must say it, it's a beautiful ${input.name}`);
            }
        }
        else {
            removeValid(input);
        }
    });

    input.addEventListener ( 'focus' , (e) => {
        removeError(input);
    });
});

//#endregion //o BLOC INSTRUCTIONS