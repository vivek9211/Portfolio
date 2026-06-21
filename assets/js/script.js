'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsSection = document.querySelector("[data-testimonials-section]");
const testimonialsItem = testimonialsSection
  ? testimonialsSection.querySelectorAll("[data-testimonials-item]")
  : [];
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalTime = document.querySelector(".testimonials-modal time");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {
    if (!modalContainer || !overlay || !modalImg || !modalTitle || !modalText) {
      return;
    }

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

// service card modal support
const serviceItems = document.querySelectorAll(".service-item");

for (let i = 0; i < serviceItems.length; i++) {
  serviceItems[i].addEventListener("click", function () {
    if (!modalContainer || !overlay || !modalImg || !modalTitle || !modalText) {
      return;
    }

    const serviceIcon = this.querySelector(".service-icon-box img");
    const serviceTitle = this.querySelector(".service-item-title");
    const serviceText = this.querySelector(".service-item-text");

    if (!serviceIcon || !serviceTitle || !serviceText) {
      return;
    }

    modalImg.src = serviceIcon.src;
    modalImg.alt = serviceIcon.alt;
    modalTitle.innerHTML = serviceTitle.innerHTML;
    modalText.innerHTML = `<p>${serviceText.textContent.trim()}</p>`;

    if (modalTime) {
      modalTime.textContent = "Service Overview";
      modalTime.setAttribute("datetime", "2026-06-21");
    }

    testimonialsModalFunc();
  });
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");

// IMPORTANT: Replace YOUR_FORM_ID below with your Formspree form ID.
// Sign up free at https://formspree.io, create a form, and paste the ID here.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdarngbg";

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// handle form submission via Formspree
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  formBtn.setAttribute("disabled", "");
  formBtn.querySelector("span").textContent = "Sending…";
  formStatus.className = "form-status";
  formStatus.textContent = "";

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      formStatus.className = "form-status success";
      formStatus.textContent = "Message sent! I'll get back to you soon.";
      form.reset();
      formBtn.setAttribute("disabled", "");
    } else {
      const data = await response.json();
      const errMsg = (data && data.errors)
        ? data.errors.map(err => err.message).join(", ")
        : "Something went wrong. Please try again.";
      formStatus.className = "form-status error";
      formStatus.textContent = errMsg;
      formBtn.removeAttribute("disabled");
    }
  } catch (_) {
    formStatus.className = "form-status error";
    formStatus.textContent = "Network error. Please check your connection and try again.";
    formBtn.removeAttribute("disabled");
  }

  formBtn.querySelector("span").textContent = "Send Message";
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}