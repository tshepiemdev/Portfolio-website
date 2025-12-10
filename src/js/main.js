// SideBar
// Handle sidebar visibility
const sideBarView = document.getElementById('sidebarView');
const btnCloseSideBar = document.getElementById('closeSideBar');
const btnOpenSideBar = document.getElementById('btnSideMenu');

btnOpenSideBar.addEventListener("click", () => {
    sideBarView.style.display = "flex";
});

btnCloseSideBar.addEventListener("click", () => {
    sideBarView.style.display = "none";
});

// Sidebar nav links
const sidebarNavLinks = document.querySelectorAll('.sidebar-nav-links');

sidebarNavLinks.forEach(sidebarNavLinks => {
        sidebarNavLinks.addEventListener("click", () => {
        sideBarView.style.display = "none";});
});

// Social links
const sidebarSocialLinks = document.querySelectorAll('.socialLinks');

sidebarSocialLinks.forEach(sidebarSocialLinks => {
        sidebarSocialLinks.addEventListener("click", () => {
        sideBarView.style.display = "none";});
});

// Intersection observer for main nav links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`nav ul li a[href="#${id}"]`);

        // Prevent errors if link does not exist
        if (!navLink) return;

        // Remove active from all links
        navLinks.forEach(link => link.classList.remove("active"));

        // Add active to current link
        navLink.classList.add("active");
      }
    });
  },
  {
    root: null,
    threshold: 0.3, 
  }
);

// Observe each section
sections.forEach(section => observer.observe(section));


// Hire me dialog
// Handle visibility
const hireMeView = document.getElementById('hireMeView');
const btnsHireMe = document.querySelectorAll('.all-hire-me-buttons');
const btnGotoLinkedIn = document.getElementById('btnGotoLinkedIn');
const btnCloseHireMeView = document.getElementById('btnCloseHireme');

btnsHireMe.forEach(btnsHireMe => {
    btnsHireMe.addEventListener("click", () => {
    hireMeView.style.display = "flex";
});
});

btnCloseHireMeView.addEventListener("click", () => {
    hireMeView.style.display = "none";
});


// Qualification view
const qualificationsView =  document.getElementById('qualificationsView');
const btnBrowseQs =  document.getElementById('btnBrowseQs');
const btnCloseQs =  document.getElementById('btnCloseQs');

// Open view
btnBrowseQs.addEventListener("click", () => {
    qualificationsView.style.display = "flex";
});

// Close view
btnCloseQs.addEventListener("click", () => {
    qualificationsView.style.display = "none";
});

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



// fetch qualifications data and add to controls
const fetchQsBtn = document.getElementById('btnBrowseQs');
const clearQsListBtn = document.getElementById('btnCloseQs');
const qualificationsList = document.getElementById('qsList');
const qsMetaDataLbl = document.getElementById('qsMetaData');

function fetchQualificationsData() {
  qualificationsList.innerHTML = '';
  // Fetch local JSON file
  fetch('src/data/json/qualificationsData.json')
    .then(response => response.json())
    .then(data => {
      // get date last updated
      const lastUpdateDate = data.lastUpdate.toLocaleString();

      // show meta data of the qs
      qsMetaDataLbl.textContent = `${data.qualifications.length} results found, last updated on ${lastUpdateDate}.`;

      data.qualifications.forEach(item => {
        // Create main div for each qualification
        const div = document.createElement('div');
        div.classList.add('q-item-wrapper');

        // Create p tag for period
        const period = document.createElement('p');
        period.textContent = `${item.period}`;

        // Create h4 tag for course
        const course = document.createElement('h4');
        course.textContent = `${item.course}`;

        // Create p tag for school
        const school = document.createElement('p');
        school.textContent = `${item.school}`;

        // Append p tags to div
        div.appendChild(period);
        div.appendChild(course);
        div.appendChild(school);

        // prepend div to main list
        qualificationsList.prepend(div);

      });
    })
    .catch(error => {
      qsMetaDataLbl.textContent = "";
      qualificationsList.innerHTML = `<div id="qsErrorHolder">
      <h2 id="errorTitle">
      <img src="assets/images/icons/error.svg" alt="error" width="24px" height="24px">
      Something went wrong</h2><p id="errorTextLbl">Error loading qualifications: ${error}.</p>
      <br>
      <button id="qsRetryBtn" type="button" onclick="customQsLoaderView()">Retry</button>
      <p id="retryAlt">Retry not working? <a href="contact.html">Report this</a></p>
      </div>`;
  });
}

function customQsLoaderView() {
  qualificationsList.innerHTML = `<div id="customLoaderWrapper"><div id="customLoader"><div class="loadingCircle"></div><p>Loading</p></div></div>`;
  setTimeout(() => {
    fetchQualificationsData();
  }, 1000);
}

// Ui/UX slides dots
function activateUIUXDots() {
  const dots = document.querySelectorAll('.slide-dot');
  dots.forEach(dot => {
  dot.addEventListener('click', () => {
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});
}

// dom loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchQualificationsData();
  activateUIUXDots();

});

// dialog view
const dialogView =  document.getElementById('dialogView');
const btnOpenThisProject1 =  document.getElementById('btnOpenThisProject1');
const btnCloseDialog =  document.getElementById('btnCloseDialog');

// Open view
btnOpenThisProject1.addEventListener("click", () => {
    dialogView.style.display = "flex";
});

// Close view
btnCloseDialog.addEventListener("click", () => {
    dialogView.style.display = "none";
});


// dialog view for paypal me
const dialogView_paypal =  document.getElementById('dialogView_paypal');
const btnBuyMeCoffe =  document.getElementById('btnBuyMeCoffe');
const btnCopyPaypalId = document.getElementById('btnCopyPaypalId');
const clipboardLbl = document.getElementById('clipboardLbl');
const btnClosePaypalDialog =  document.getElementById('btnClosePaypalDialog');

// Open view
btnBuyMeCoffe.addEventListener("click", () => {
    dialogView_paypal.style.display = "flex";
});

btnCopyPaypalId.addEventListener("click", () => {
  navigator.clipboard.writeText("paypal.me/tshepangmk")
    .then(() => {
      clipboardLbl.style.display = "flex";
        setTimeout(() => {
          clipboardLbl.style.display = "none";
        }, 2000);
    })
    .catch(err => {
      clipboardLbl.textContent = "Failed to copy: " + err;
  });
});

// Close view
btnClosePaypalDialog.addEventListener("click", () => {
    dialogView_paypal.style.display = "none";
});


//
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