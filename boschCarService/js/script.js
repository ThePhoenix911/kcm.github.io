"use strict";
/*    
      Author: Kagiso Cacius Mabusela
      Date:   2022/10/07
      Filename: script.js
*/





function showHide(a, b) {
    // More or less text - Show or Hide
    let parentContainer = document.querySelector(`${a}`);
    let container = document.querySelectorAll(`${b}`);

    parentContainer.addEventListener('click', e=> {
        let current = e.target;
        let isReadMoreBtn = current.className.includes('read-more-btn');
    
        if(!isReadMoreBtn) return;
    
        let currentText = e.target.parentNode.querySelector('.read-more-text');
    
        currentText.classList.toggle('read-more-text--show');
    
        current.textContent = current.textContent.includes('Read more') ? "Read less" : "Read more...";

    })
}

// Show or hide text for products
showHide("#products", ".product");

// Show or hide text for Services
showHide("#cards", ".card");





// let pList = document.querySelectorAll("div.card-content > p");

// pList.forEach(elem => {
//     let content = elem.textContent;
//     let xhr = new XMLHttpRequest();
//         xhr.open("GET", "product.html", true);
//         xhr.onload = ()=>{
//             if(xhr.readyState === XMLHttpRequest.DONE){
//                 if(xhr.status === 200){
//                     let fullCopy = content;
//                     let halfCopy = content.substring(0, 253);
//                     halfCopy += `...`;      
//                     elem.innerHTML = `${halfCopy}` + "<br>" + "<a class='seeMore' href='#'>See more</a>";
//                     let seeMore = document.querySelectorAll(".seeMore");
//                     seeMore.forEach(e => {
//                         e.style.background = "inherit";
//                         e.style.color = "deepskyblue"
//                         e.style.textDecoration = "underline";
//                         e.style.padding = "0";
//                         e.style.margin = "10px auto";

//                         e.onclick = ()=>{
//                             let xhr = new XMLHttpRequest();
//                             xhr.open("GET", "product.html", true);
//                             xhr.onload = ()=>{
//                                 if(xhr.readyState === XMLHttpRequest.DONE){
//                                     if(xhr.status === 200){
//                                        elem.innerHTML = '';
//                                        elem.innerHTML = `${fullCopy}`  + "<br>" + "<a class='seeLess' href='#'>See Less</a>";
                                        
//                                     }
//                                 }
//                             };
                            
//                             xhr.send(null);
                            
//                         };
//                     }); 
                    
                    
//                 }
//             }
//         };
        
//         xhr.send(null);
// });


// pList.forEach(elem => {
//     let content = elem.textContent;
//     let xhr = new XMLHttpRequest();
//         xhr.open("GET", "product.html", true);
//         xhr.onload = ()=>{
//             if(xhr.readyState === XMLHttpRequest.DONE){
//                 if(xhr.status === 200){
//                     if (content.length < 256) {
//                         elem.style.height = "268px";
//                     }else if(content.length === 256) {
//                         elem.style.height = "268px";
//                     }else if (content.length > 256) {
//                         // x - ((n - 1) + 4)
//                         let fullCopy = content;
//                         let halfCopy = content.substring(0, 253);
//                         halfCopy += `...`;
//                         elem.innerHTML = `${halfCopy}` + "<br>" + "<a class='seeMore' href='#'>See more</a>";
//                         let seeMore = document.querySelectorAll(".seeMore");
//                         seeMore.forEach(e => {
//                             e.style.background = "inherit";
//                             e.style.color = "deepskyblue"
//                             e.style.textDecoration = "underline";
//                             e.style.padding = "0";
//                             e.style.margin = "10px auto";
//                             e.onclick = ()=>{
//                                 let xhr = new XMLHttpRequest();
//                                 xhr.open("GET", "product.html", true);
//                                 xhr.onload = ()=>{
//                                     if(xhr.readyState === XMLHttpRequest.DONE){
//                                         if(xhr.status === 200){
//                                             if (elem == e) {
//                                                 console.log("works somehow");
//                                             }
//                                         }
//                                     }
//                                 };  
//                                 xhr.send(null); 
//                             };
//                         });
                        
//                         console.log(seeMore);
//                     }
//                 }
//             }
//         };
        
//         xhr.send(null);
// });




// SEPARATION OF DUTIES SAVED ME YET AGAIN!!!!!

let addedToCart = {
    s5Battery: {s5Battery_val: null, count: 0},
    premiumOil: {premiumOil_val: null, count: 0},
    brakePads: {brakePads_val: null, count: 0},
    steeringGear: {steeringGear_val: null, count: 0},
};

let retrieveDetails = {
    orderFname: "Full Name: ",
    orderEmail: "Email Address: ",
    orderPhone: "Phone: ",
    orderPsswrd: "Password: ",
    orderPsswrd2: "Confirmed Password: ",
    orderFnameShipping: "Full Name (Shipping): ",
    orderAddressShipping: "Address (Shipping): ",
    orderAddress2Shipping: "Address 2 (Shipping): ",
    orderCityShipping: "City (Shipping): ",
    orderSurbubShipping: "Surbub (Shipping): ",
    orderPostalShipping: "Postal (Shipping): ",
    orderFnameBilling: "Full Name (Billing): ",
    orderAddressBilling: "Address (Billing): ",
    orderAddress2Billing: "Address 2 (Billing): ",
    orderCityBilling: "City (Billing): ",
    orderSurbubBilling: "Surbub (Billing): ",
    orderPostalBilling: "Postal (Billing): ",
    orderAddressIdentical: "Address (Bill = Ship): "
};

let retrieveCardDetails = {
    cardName:   "Name (Card Owner): ",
    credit: "Credit Card Type: ",
    cardNumber: "Credit Card Number: ",
    expMonth: "Expiration Month: ",
    expYear:    "Expiration Year: ",
    cvc:    "CVC: "
};




// Makes sure that all required fields are not submitted empty
let formElements = document.querySelectorAll("#order-form input[type='text']");
let fieldCount = formElements.length;
let errorBox = document.getElementById("errorBox");

for (let i = 0; i < formElements.length; i++) {
      formElements[i].addEventListener("invalid", e=> {
            e.preventDefault();
            errorBox.textContent = "Complete all required fields";
            errorBox.style.display = "block";
      });
}



if(document.getElementById("resetButton") !== undefined) {
    let resetButton = document.getElementById("resetButton");
    let order_form = document.getElementById("order_form");
    resetButton.style.width = "max-content";

    resetButton.onclick = ()=> {
        if(!(order_form === undefined)) {
            resetButton.order_form.reset();
        }else if(!(invoice === undefined)) {
            resetButton.invoice.reset();
        }else if(!(form_grid === undefined)) {
            resetButton.form_grid.reset();
        }
        
    }
}





// Card payment validation
function cardPayment() {
    // Card payment validation
    let submitOrderInvoice = document.getElementById("submitOrderInvoice");

    //Validate the payment when the submit button is clicked
    submitOrderInvoice.addEventListener("click", ()=> {
        validateName();
        validateCard();
        validateNumber();
        validateMonth();
        validateYear();
        validateCVC();
    });




    function validateName() {
        let cardName = document.getElementById("cardName");
        //Test if a required value is missing from the cardName field
        if (cardName.validity.valueMissing) {
            //popup error message when value is missing
            cardName.setCustomValidity("Enter your name as it appears on the card");
        } else {
            //no popup error message when the field is valid
            cardName.setCustomValidity("");
        }

    }

    //Check if a credit card has been selected
    function validateCard() {
        let card = document.forms.invoice.elements.credit[0];
        if (card.validity.valueMissing) {
            card.setCustomValidity("Select your credit card");
        } else {
            card.setCustomValidity("");
        }
    }

    //Check if the card number is valid
    function validateNumber() {
        let cNum = document.getElementById("cardNumber");
        if (cNum.validity.valueMissing) {
            cNum.setCustomValidity("Enter your Card Number");
        } else if (cNum.validity.patternMismatch) {
            cNum.setCustomValidity("Enter a valid card number");
        } else if (luhn(cNum.value) === false) {
            cNum.setCustomValidity("Enter a legitimate card number");
        } else {
            cNum.setCustomValidity("");
        }
    }


    //Check that a month is selected for the expiration date
    function validateMonth() {
        let month = document.getElementById("expMonth");
        //since the first index contains the default value "mm"
        if (month.selectedIndex === 0) {
            month.setCustomValidity("Select the expiration month");
        } else {
            month.setCustomValidity("");
        }
    }

    //Check that a year is selected for the expiration date
    function validateYear() {
        let year = document.getElementById("expYear");
        //since the first index contains the default vallue "yy"
        if (year.selectedIndex === 0) {
            year.setCustomValidity("Select the expiration year");
        } else {
            year.setCustomValidity("");
        }
    }

    function validateCVC() {
        //Determine which card was selected
        let card = document.querySelector('input[name="credit"]:checked').value;
        let cvc = document.getElementById("cvc");

        //Validate the CVC value
        if (cvc.validity.valueMissing) {
            cvc.setCustomValidity("Enter your CVC number");
        } else if ((card === "amex") && !(/^\d{4}$/.test(cvc.value))) {
            cvc.setCustomValidity("Enter a 4-digit number");
        } else if ((card !== "amex") && !(/^\d{3}$/.test(cvc.value))) {
            cvc.setCustomValidity("Enter a 3-digit number");
        } else {
            cvc.setCustomValidity("");
        }
    }


    // Luhn Algorithm used for Validating Credit Card Numbers 

    function luhn(idNum) {
        let string1 = "";
        let string2 = "";

        // Retrieve the odd-numbered digits starting from the back
        for (let i = idNum.length - 1; i >= 0; i -= 2) {
            string1 += idNum.charAt(i);
        }
        // Retrieve the even-numbered digits starting from the back and double them
        for (let i = idNum.length - 2; i >= 0; i -= 2) {
            string2 += 2 * idNum.charAt(i);
        }

        // Return whether the sum of the digits is divisible by 10
        return sumDigits(string1 + string2) % 10 === 0;

        function sumDigits(numStr) {
            let digitTotal = 0;
            for (let i = 0; i < numStr.length; i++) {
                digitTotal += parseInt(numStr.charAt(i));
            }
            return digitTotal;
        }
    }
}






function addingProdToCart() {
    
    
    
    document.querySelectorAll('input[type="button"]').forEach(e => {
        e.onclick = ()=>{
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "product.html", true);
        xhr.onload = ()=>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    // inputField.value = "";
                    // scrollToBottom();
                    let counter = 0;
                    let clickedElemName = e.name;
                    let clickedElemVal = document.querySelector(`input[name="${e.name}_val"]`).value;
                    
                    for (const key in addedToCart) {
                    if(key == clickedElemName) {
                        addedToCart[key][`${clickedElemName}_val`] = clickedElemVal;
                        // console.log(addedToCart[key][`${clickedElemName}_val`]);
                        addedToCart[key]['count'] += 1;
                    }
    
                    counter += addedToCart[key]['count'];
                    }
    
                    let notifyCount = document.getElementById('counter');
                    notifyCount.style.display = "block";
                    notifyCount.innerHTML = `${counter}`;
                    console.log(counter);
    
                    // Store the addedToCart object as a JSON object in the session storage for use in other pages later
                    sessionStorage.setItem("addedToCart", JSON.stringify(addedToCart));
                    // let retreive = JSON.parse(sessionStorage.getItem('addedToCart'));
                }
            }
        };
        
        xhr.send(null);
        
        };
    });
  
}





window.addEventListener("load", ()=>{
  let resetValues = document.querySelector("#resetValues");
  if(resetValues) {
    sessionStorage.setItem("bookService", "false");
    sessionStorage.setItem("orderItem", "false");
  }
});

function confirmClicked(a, b) {
  sessionStorage.setItem(a, b);
    console.log("You can do it");
}

function redirect(a) {
  location.href = a;
  confirmClicked("bookService", "true");
}

function display() {
  let bookServiceForm = document.getElementById('form-box');
  let orderItemForm = document.getElementById('order-item');

  if(sessionStorage.getItem("bookService") === "true") {
      innerDisplayBookServiceForm();
      sessionStorage.setItem("bookService", "false");
      sessionStorage.setItem("orderItem", "false");

  }else if(sessionStorage.getItem("orderItem") === "true") {
      innerDisplayOrderItemForm();
      sessionStorage.setItem("bookService", "false");
      sessionStorage.setItem("orderItem", "false");
  }

  function innerDisplayBookServiceForm() {
      bookServiceForm.style.display = "block";
      orderItemForm.style.display = "none";
  }

  function innerDisplayOrderItemForm() {
      bookServiceForm.style.display = "none";
      orderItemForm.style.display = "block";
  }
}

function isValid() {
  let orderEmail = document.getElementById("orderEmail");
  let emailRegExp = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');
  console.log(orderEmail.value);
  if(orderEmail.value === "") {
    orderEmail.setCustomValidity('Please enter you email address');
  }else if(!emailRegExp.test(orderEmail.value)) {
    orderEmail.setCustomValidity('Please enter a valid email address');
  }else if(emailRegExp.test(orderEmail.value)) {
    orderEmail.setCustomValidity('');
  }
}






function orderDetails() {
    if(document.getElementById("order-item") !== undefined){

        // "Same as billing address"
        let orderAddressIdentical = document.getElementById("orderAddressIdentical");
      
        orderAddressIdentical.addEventListener("click", copyShippingToBilling);
        
        function copyShippingToBilling() {
              if(orderAddressIdentical.checked) {
                    let orderFnameBilling = document.getElementById("orderFnameBilling");
                    let orderFnameShipping = document.getElementById("orderFnameShipping");
                    orderFnameBilling.value = orderFnameShipping.value;
        
                    let orderAddressBilling = document.getElementById("orderAddressBilling");
                    let orderAddressShipping = document.getElementById("orderAddressShipping");
                    orderAddressBilling.value = orderAddressShipping.value;
        
                    let orderAddress2Billing = document.getElementById("orderAddress2Billing");
                    let orderAddress2Shipping = document.getElementById("orderAddress2Shipping");
                    orderAddress2Billing.value = orderAddress2Shipping.value;
        
                    let orderCityBilling = document.getElementById("orderCityBilling");
                    let orderCityShipping = document.getElementById("orderCityShipping");
                    orderCityBilling.value = orderCityShipping.value;
        
                    let orderSurbubBilling = document.getElementById("orderSurbubBilling");
                    let orderSurbubShipping = document.getElementById("orderSurbubShipping");
                    orderSurbubBilling.value = orderSurbubShipping.value;
        
                    let orderPostalBilling = document.getElementById("orderPostalBilling");
                    let orderPostalShipping = document.getElementById("orderPostalShipping");
                    orderPostalBilling.value = orderPostalShipping.value;
                    
                    
              }
        }
        
        // Makes sure that all required fields are not submitted empty
        let formElements = document.querySelectorAll("#order-form input[type='text']");
        let fieldCount = formElements.length;
        let errorBox = document.getElementById("errorBox");
        
        for (let i = 0; i < formElements.length; i++) {
              formElements[i].addEventListener("invalid", e=> {
                    e.preventDefault();
                    errorBox.textContent = "Complete all required fields";
                    errorBox.style.display = "block";
              });
        }
      
        
        // Validate form fields as soon as the user clicks the submit button
        let submitOrderDetails = document.getElementById("submitOrderDetails");
      
        submitOrderDetails.addEventListener("click", (e)=> {
      
            // Validate password
            let submitOrderDetails = document.getElementById("submitOrderDetails");
            let orderPsswrd = document.getElementById("orderPsswrd");
            let orderPsswrd2 = document.getElementById("orderPsswrd2");
      
            if (orderPsswrd.validity.patternMismatch) {
                orderPsswrd.setCustomValidity("Your password must be at least 8 characters with at least one letter and one number");
            } else if (orderPsswrd.value !== orderPsswrd2.value) {
                orderPsswrd.setCustomValidity("Your passwords do not match");
            } else {
                orderPsswrd.setCustomValidity("");
            }
      
      
            
      
            // Validate email
            isValid();
            
        });
          
      }
}



function fillTheInvoice() {
    let retreive = JSON.parse(sessionStorage.getItem('addedToCart'));
    let subTotalCal = 0;
    let invoiceTable = document.getElementById("invoiceBody");

    for (const key in retreive) {
        let invoiceLine = document.createElement("tr");
        if(retreive[key]['count']) {
            // Display the item's name
            let itemName = document.createElement("td");
            itemName.textContent = key;
            invoiceLine.appendChild(itemName);

            // Remove the line item
            let itemAction = document.createElement("td");
            let btn = document.createElement("input");
            // styling the remove button
            btn.value = "Remove";
            btn.style.padding = "5px 10px";
            btn.style.width = "80%";
            btn.style.border = "none";
            btn.style.borderRadius = "5px";
            btn.style.backgroundColor = "red";
            btn.style.color = "white";
            btn.style.cursor = "pointer";
            btn.style.textAlign = "center";
            btn.id = "itemAction";
            btn.type = "button";
            btn.addEventListener("click", ()=> {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "invoice.html", true);
                xhr.onload = ()=>{
                  if(xhr.readyState === XMLHttpRequest.DONE){
                      if(xhr.status === 200){
                        invoiceTable.removeChild(invoiceLine);
                        retreive[key][`${key}_val`] = null;
                        retreive[key]['count'] = 0;
                        // Store the addedToCart object as a JSON object in the session storage for use in other pages later
                        sessionStorage.setItem("addedToCart", JSON.stringify(retreive));
                        invoiceTable.innerHTML = '';
                        fillTheInvoice();
                      }
                  }
                };
              
                xhr.send(null);
            
            });
            
            itemAction.style.textAlign = "center";
            itemAction.appendChild(btn);
            invoiceLine.appendChild(itemAction);
            

            // Display the item's unit price
            let unitPrice = document.createElement("td");
            unitPrice.textContent = Math.round(Number(retreive[key][`${key}_val`])).toLocaleString("en-ZA", {style:"currency", currency: "ZAR"});
            unitPrice.style.textAlign = "center";
            invoiceLine.appendChild(unitPrice);
            

            // Display the quantity of ordered item
            let itemQty = document.createElement("td");
            let inputQty = document.createElement("input");
            inputQty.style.textAlign = "center";
            inputQty.type = "number";
            inputQty.value = retreive[key]['count'];
            inputQty.addEventListener("change", ()=>{
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "invoice.html", true);
                xhr.onload = ()=>{
                  if(xhr.readyState === XMLHttpRequest.DONE){
                      if(xhr.status === 200){
                          retreive[key]['count'] = inputQty.value;
                          console.log(retreive[key]['count']);      
                          sessionStorage.setItem("addedToCart", JSON.stringify(retreive));
                          invoiceTable.innerHTML = '';
                          fillTheInvoice();         
                      }
                  }
                };
              
                xhr.send(null);
            });
            itemQty.appendChild(inputQty);
            
            itemQty.style.textAlign = "center";
            invoiceLine.appendChild(itemQty);

            invoiceLine.appendChild(itemQty);
            
            

            // Calculate and Display the item's total price
            let itemTotalPrice = document.createElement("td");
            let itemTotalPriceCal = Math.round(Number(retreive[key][`${key}_val`])) * Math.round(Number(retreive[key]['count']));
            itemTotalPrice.textContent = itemTotalPriceCal.toLocaleString("en-ZA", {style:"currency", currency: "ZAR"});
            itemTotalPrice.style.textAlign = "center";
            invoiceLine.appendChild(itemTotalPrice);

            subTotalCal += itemTotalPriceCal;


            // Append each key=name pair as a table row
            invoiceTable.appendChild(invoiceLine);
          
            
          }

    }

    addInvoiceLine("Subtotal", "4", subTotalCal);
    addInvoiceLine("Tax (14%)", "4", Math.round(Number(subTotalCal * 0.14)));
    addInvoiceLine("Total", "4", Math.round(Number(subTotalCal + (subTotalCal * 0.14))));

    function addInvoiceLine(content, spanCol, contentTwo ) {
      for (let i = 0; i < 1; i++) {
        let invoiceLine = document.createElement("tr");

        // Display the item's name - subtotal
        let ItemName = document.createElement("td");
        ItemName.textContent = content;
        ItemName.colSpan = spanCol;
        invoiceLine.appendChild(ItemName);

        // Display the calculated value
        let val = document.createElement("td");
        val.textContent = contentTwo.toLocaleString("en-ZA", {style:"currency", currency: "ZAR"});
        invoiceLine.appendChild(val);
        val.style.textAlign = "center";

        // Add new row to the table
        invoiceTable.appendChild(invoiceLine);
      }
    }

    
}

function call() {
    fillTheInvoice();
}


function getsgets(a) {
  let displayOrderDetails = document.getElementById(`${a}`);
  
  let retreive = JSON.parse(sessionStorage.getItem('addedToCart'));

  for (const key in retreive) {
      
      console.log(displayOrderDetails);
      console.log(retreive);
      // Create a label containing the field name
      let fieldLabel = document.createElement("label");
      fieldLabel.textContent = `${key}: `;
      displayOrderDetails.appendChild(fieldLabel);
      console.log(displayOrderDetails);

      // Create a disabled input box with the field value
      let inputBox = document.createElement("input");
      inputBox.id = key;
      inputBox.name = key;
      inputBox.value = retreive[key][`${key}_val`];
      inputBox.disabled = true;
      displayOrderDetails.appendChild(inputBox);
  }
}


function store(a, b, c, submitbtn, fieldList, compareDetails){

    // Retrieve the text of a query string
    let qString = location.search.slice(1);

    // Replace the encoded characters in the query string
    qString = qString.replace(/\+/g, " ");
    qString = decodeURIComponent(qString);

    // Split the field=name pairs into separate array items
    let formData = qString.split(/&/g);

    for (let items of formData) {
          // Extract the field names and values
          let fieldValuePair = items.split(/=/);
          let fieldName = fieldValuePair[0];
          let fieldValue = fieldValuePair[1];
          let compareValue;        
          
        //   console.log(fieldName);
          
          // Create a label containing the field name
          let elemA = document.createElement(`${a}`);
          

          Object.entries(compareDetails).forEach((e) => {
            if(fieldName === e[0]) {
                compareValue = fieldName;
                elemA.textContent = e[1];

            }
          });

        //   if (fieldName == compareValue) {
        //     elemA.textContent = `${compareDetails}`[compareValue];
        //   }
          document.getElementById(`${b}`).appendChild(elemA);
          

          // Create a disabled input box with the field value
          let elemC = document.createElement(`${c}`);
          elemC.id = fieldName;
          elemC.name = fieldName;
          elemC.value = fieldValue;
          elemC.disabled = true;
          document.getElementById(`${b}`).appendChild(elemC);

          
    }

    // Data fields to be saved to local storage
    let formFields = document.querySelectorAll(`${fieldList}`);

    // Write each field name and value to local storage
    for(let fields of formFields){
          localStorage.setItem(fields.name, fields.value);
    }
    
}




// Customer reviews slideshow
function custSlideshow() {
    // Customer reviews slideshow
    const menuIcon = document.querySelector(".hamburger-icon");
    const navMenu = document.querySelector(".nav-menu");

    menuIcon.addEventListener("click", ()=> {
        menuIcon.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll("nav-link").forEach(n => n.addEventListener("click", ()=> {
        menuIcon.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // Test

    var slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
    showDivs(slideIndex += n);
    }

    function currentDiv(n) {
    showDivs(slideIndex = n);
    }

    function showDivs(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1};
    if (n < 1) {slideIndex = slides.length};
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" fill", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " fill";
    }
}




// Picture Slideshow
function imgSlideshow() {
    let slideNumber = 0;

    $( ()=> {
    
          $("#leftArrPersonnel").click(e => {
                if(slideNumber > 0) {
    
                      $("img.slideImages").animate(
                            {left: "+=401px"}, 1000
                      );
    
                      slideNumber--;
    
                      let currentSlide = $("img.slideImages")[slideNumber];
    
                      let slideCaption = $(currentSlide).attr("alt");
    
                      changeCaption(slideCaption);
    
                }
          });
    
          $("#rightArrPersonnel").click(e => {
                if(slideNumber < 11) {
    
                      $("img.slideImages").animate(
                            {left: "-=401px"}, 1000
                      );
    
                      slideNumber++;
    
                      let currentSlide = $("img.slideImages")[slideNumber];
    
                      let slideCaption = $(currentSlide).attr("alt");
    
                      changeCaption(slideCaption);
    
                }
          });
    
          function changeCaption(captionText) {
                $("div#caption").effect("blind", {
                      mode: "hide",
                      direction: "left"
                }, 500, ()=> $("div#caption").text(captionText))
                
                .effect("blind", {
                      mode: "show",
                      direction: "left"
                }, 500);
                
          }
    });
}


/*
function init() {

// Page Objects - mf we looking for
   let stories = document.getElementById("stories");

// Useless side bar  - current headlines
   let news = document.getElementById("news");
    
// Label - Enter a search keyword
   let sInput = document.getElementById("sInput");
   
//   Fontawes Search Icon
   let sButton = document.getElementById("sButton"); 

// div elem   
   let suggestBox = document.getElementById("suggestBox");    
 
   // Create a request object
   let xhr = new XMLHttpRequest();

   // Handle the changing request state
   xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
         if(xhr.status >= 200 && xhr.status < 300) {
            // Manage the response
            stories.innerHTML = xhr.responseText;
         }else {
            console.log("Request failed: " + xhr.statusText);
         }
      }
   }

   // Open the request and send it
   xhr.open("get", "commentary.html");
   xhr.send(null);

   // Retrieve archived articles from the web server
   sButton.onclick = () => {
      fetch("archives.pl?skey=" + encodeURIComponent(sInput.value))
      .then (response => {
         if(response.ok) {
            return response.text();
         }else {
            return "Unable to retrieve commentary";
         }
      })
      .then (comtext => stories.innerHTML = comtext)
      .then ( ()=>{
         let topic = sInput.value.toLowerCase();
             getGIF(topic);
      })
      .catch (stories.innerHTML = "Network Failure");
   }

   // Fetch current headlines from the web server
   fetch("headlines.xml")
   .then (response => response.text())
   .then (str => new DOMParser().parseFromString(str, "text/xml"))

   // Write the XML content to HTML
   .then (dom => {
      let items = dom.querySelectorAll("item");
      // Loop through esch story item
      for(let story of items) {
         let headline = story.children[0].textContent;
         let link = story.children[1].textContent;
         let summary = story.children[2].textContent;
         let htmlCode = `<article>
         <h2><a href="${link}"></a>${headline}</h2>
         <p>${summary}</p>
      </article>`;
      news.insertAdjacentHTML("beforeend", htmlCode);
      }
   });

   // Suggest keywords as is entered into the search box
   sInput.onkeyup = () => {
      if(sInput.value === "") {
         suggestBox.style.display = "none";
      }else {
         // Retrieve a list of matching keywords
         fetch("keywords.pl?suggest=" + encodeURIComponent(sInput.value))
         .then (response => response.json())
         // Build the suggestions box
         .then (keywords => {
            suggestBox.innerHTML = "";
            if(keywords.matches.length === 0) {
               suggestBox.style.display = "none";
            }else {
               // Display suggestions
               suggestBox.style.display = "block";
               // Create a list of suggestions
               for(let word of keywords.matches) {
                  let suggestion = document.createElement("div");
                  suggestion.textContent = word;
                  suggestBox.appendChild(suggestion);

                  // Add suggestion to search box when clicked
                  suggestion.onclick = () => {
                     sInput.value = word;
                     suggestBox.style.display = "none";
                     sButton.click();
                  }
               }
            }
         })
      }
   }

}

*/































            
              
              
            
  




































// const menuIcon = document.querySelector(".hamburger-icon");
// const navMenu = document.querySelector(".nav-menu");

// menuIcon.addEventListener("click", ()=> {
// 	menuIcon.classList.toggle("active");
// 	navMenu.classList.toggle("active");
// });

// document.querySelectorAll("nav-link").forEach(n => n.addEventListener("click", ()=> {
// 	menuIcon.classList.remove("active");
// 	navMenu.classList.remove("active");
// }));

// // Test

// var slideIndex = 1;
// showDivs(slideIndex);

// function plusDivs(n) {
//   showDivs(slideIndex += n);
// }

// function currentDiv(n) {
//   showDivs(slideIndex = n);
// }

// function showDivs(n) {
//   var i;
//   var slides = document.getElementsByClassName("slide");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1};
//   if (n < 1) {slideIndex = slides.length};
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" fill", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " fill";
// }