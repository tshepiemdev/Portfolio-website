// Initialize emailjs
emailjs.init(EMAILJS_PUBLIC_KEY);

// Form
const form = document.getElementById('contactForm');

// Valiadate form inputs
function validateInputsAndSubmit() {
    const submitBtn = document.getElementById('btnSubmit');
    const loaderView = document.getElementById('loaderView');
    const txtFirstName = document.getElementById('txtFirstName');
    const txtLastName = document.getElementById('txtLastName');
    const txtEmail = document.getElementById('txtEmail');

    const radPositionInput = document.querySelector('input[name="position"]:checked');
    const radPosition = radPositionInput ? radPositionInput.value.trim() : "";

    const chkReasons = [];
    let selectedReasons = document.querySelectorAll('input[name="contactreason"]:checked');
    selectedReasons.forEach(item => {
        chkReasons.push(item.value.trim());
    });
    const reasonsWithSpaces = chkReasons.join(", ");

    const txtMessage = document.getElementById('txtMessage');

    // Generate email id for futurer use and tracking
    const mainPart = Date.now().toString().slice(-8); // last 8 digits of timestamp
    const randomPart = Math.floor(Math.random() * 1000); // 0–999
    const mail_id = "T" + mainPart + "-" + randomPart;

    // variables
    const first_name = txtFirstName.value.trim();
    const last_name = txtLastName.value.trim();
    const user_email = txtEmail.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const user_position = radPosition;
    const contact_reasons = reasonsWithSpaces;
    const message = txtMessage.value.trim();

    // validate form data
    // name
    if (first_name === "") {
        alert("Your First Name is required.");
        
    } else if (first_name.length < 2) {
        alert("Your First Name must be at least 2 characters.");

    } else if (first_name.length > 40) {
        alert("Your First Name is a bit long, I'm sorry.");

    // surname
    } else if (last_name === "") {
        alert("Your Last Name is required.");

    } else if (last_name.length < 2) {
        alert("Your Last Name must be at least 2 characters.");

    } else if (last_name.length > 50) {
        alert("Your Last Name is a bit long, I'm sorry.");

    // Email
    } else if (user_email === "") {
        alert("Your Email Address is required.");

    } else if (!emailPattern.test(user_email)) {
        alert("Please enter a valid email.");

    // postion
    } else if (!user_position) {
        alert("You're contacting as is required.");

    // reason
    } else if (contact_reasons.length === 0) {
        alert("Reason for contact is required.");

    // message
    } else if (message.length > 1000) {
        alert("Your detailed message is too long.");
    
    } else if (!mail_id || mail_id.trim() === "") {
        alert("Mail ID is missing. Don't worry, It's not you fault.");   

    // finally execute
    } else {
        // disable submit button
        submitBtn.disabled = true;
        submitBtn.style.opacity = 0.8;
        submitBtn.textContent = "Submitting...";
        
        // show loader
        loaderView.style.display = 'flex';

        // Prepare EmailJS parameters
        const params = {
            mail_id: mail_id,
            first_name: first_name,
            last_name: last_name,
            from_email: user_email,
            position: user_position,
            reason: contact_reasons,
            message: message
        };

        // Send email
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
        .then(() => {
            successDialogResponse();
            form.reset();

        })
        .catch(() => {
            errorDialogResponse("Error: " + error.text || error + ". Please retry.");

        }).finally(() => {
        // reset button and loader
            submitBtn.disabled = false;
            submitBtn.style.opacity = 1;
            submitBtn.textContent = "Submit";
            loaderView.style.display = 'none';

        });
        
    }

}

// Submit form data

form.addEventListener("submit", function(e) {
    e.preventDefault();
    validateInputsAndSubmit();
});

// Off other chks when other is clicked
const chkOther = document.getElementById('chkOther');
const otherCheckboxes = document.querySelectorAll('.reasonCheckboxes');

chkOther.addEventListener("change", function() {
    if (this.checked) {
        otherCheckboxes.forEach(cb => cb.checked = false);
       
    }
});

otherCheckboxes.forEach(cb => {
    cb.addEventListener("change", function() {
    if (this.checked) {
        chkOther.checked = false;
    }
});
});

// Success dialog response
const dialogResponseView = document.getElementById('dialogView'); 
const btnCloseDialog = document.getElementById('btnCloseDialog');

function successDialogResponse() {
    // show dialog
    dialogResponseView.style.display = 'flex';
}

// close dialog
btnCloseDialog.addEventListener("click", () => {
    dialogResponseView.style.display = 'none';
});

//
// Error dialog response
const dialogResponseView2 = document.getElementById('dialogView2'); 
const errorTextLbl = document.getElementById('errorTextLbl');
const btnCloseDialog2 = document.getElementById('btnCloseDialog2');

function errorDialogResponse(error_message) {
    // show dialog
    errorTextLbl.textContent = error_message;
    dialogResponseView2.style.display = 'flex';
}

// close dialog
btnCloseDialog2.addEventListener("click", () => {
    dialogResponseView2.style.display = 'none';
});

//
// handles default sent as...
const radIndividual = document.getElementById('btnIndividual');

radIndividual.click();

//
// Download cv view
const downloadCvView =  document.getElementById('downloadCvView');
const btnsDownloadCV = document.querySelectorAll('.all-download-cv-buttons');
const btnConfirmDownload =  document.getElementById('btnConfirmDownload');
const btnCloseDCvView =  document.getElementById('btnCloseDCvView');

// Open download cv view
btnsDownloadCV.forEach(btnsDownloadCV => {
    btnsDownloadCV.addEventListener("click", () => {
    downloadCvView.style.display = "flex";
});
});

// Close view
btnConfirmDownload.addEventListener("click", () => {
    downloadCvView.style.display = "none";
});

btnCloseDCvView.addEventListener("click", () => {
    downloadCvView.style.display = "none";
});

// btn more options
const bottomMenuOptionsView = document.getElementById('bottomMenuOptions');
const btnMoreOptions = document.getElementById('btnMoreOptions');
const optionsIconImage = document.getElementById('optionsIcon');
const toolTipText = document.getElementById('toolTip');

optionsIconImage.src = "assets/images/icons/menu-dots.svg";

btnMoreOptions.addEventListener("click", () => {
  const isHidden = !bottomMenuOptionsView.classList.contains("show");

  // toggle visibility
  bottomMenuOptionsView.classList.toggle("show", isHidden);

  // update tooltip text
  toolTipText.textContent = isHidden ? "Close" : "More options";

  // toggle icon image
  optionsIconImage.src = isHidden
    ? "assets/images/icons/cross-small.svg"
    : "assets/images/icons/menu-dots.svg";
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (bottomMenuOptionsView.classList.contains("show")) {
    // check if the click is NOT inside the menu or button
    if (!bottomMenuOptionsView.contains(e.target) && !btnMoreOptions.contains(e.target)) {
      bottomMenuOptionsView.classList.remove("show");
      toolTipText.textContent = "More options";
      optionsIconImage.src = "assets/images/icons/menu-dots.svg";
    }
  }
});

// Optional: prevent clicks inside menu from closing it
bottomMenuOptionsView.addEventListener("click", (e) => {
  e.stopPropagation();
});


const themeLabel = document.querySelectorAll('.themeLabel');
const workingOnItView = document.getElementById('workingOnItView');

themeLabel.forEach(label => {
  label.addEventListener("click", () => {
    workingOnItView.style.display = 'flex';

    setTimeout(() => {
      workingOnItView.style.display = 'none';
    }, 3000);
  });
});
