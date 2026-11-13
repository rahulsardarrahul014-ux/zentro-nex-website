
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // =================================
  // 1. MOBILE NAVIGATION
  // =================================

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  function closeMenu() {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  }

  menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // =================================
  // 2. THREE LANGUAGE SYSTEM
  // =================================

  const languageToggle =
    document.getElementById("languageToggle");

  const languages = ["en", "hi", "or"];

  const languageNames = {
    en: "हिंदी",
    hi: "ଓଡ଼ିଆ",
    or: "English"
  };

  let currentLanguage = "en";

  function changeLanguage(language) {

    if (!languages.includes(language)) return;

    currentLanguage = language;

    document.querySelectorAll(
      "[data-en][data-hi][data-or]"
    ).forEach(element => {

      const translatedText =
        element.getAttribute(`data-${language}`);

      if (translatedText !== null) {
        element.textContent = translatedText;
      }

    });

    document.documentElement.lang = language;

    document.body.classList.toggle(
      "lang-hi",
      language === "hi"
    );

    document.body.classList.toggle(
      "lang-or",
      language === "or"
    );

    languageToggle.textContent =
      languageNames[language];

    languageToggle.setAttribute(
      "aria-label",
      "Change website language"
    );

    // Update page title
    const titles = {
      en: "Zentro Nex | Your Trusted Service Partner",
      hi: "Zentro Nex | आपका विश्वसनीय सेवा भागीदार",
      or: "Zentro Nex | ଆପଣଙ୍କ ବିଶ୍ୱସ୍ତ ସେବା ସହଯୋଗୀ"
    };

    document.title = titles[language];
  }

  languageToggle.addEventListener("click", () => {

    const currentIndex =
      languages.indexOf(currentLanguage);

    const nextIndex =
      (currentIndex + 1) % languages.length;

    changeLanguage(languages[nextIndex]);

  });

  // Default language
  changeLanguage("en");

  // =================================
  // 3. CURRENT YEAR
  // =================================

  document.getElementById("year").textContent =
    new Date().getFullYear();

  // =================================
  // 4. CUSTOMER ENQUIRY FORM
  // =================================

  const contactForm =
    document.getElementById("contactForm");

  const formMessage =
    document.getElementById("formMessage");

  contactForm.addEventListener("submit", event => {

    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const name =
      document.getElementById("customerName")
        .value.trim();

    const email =
      document.getElementById("customerEmail")
        .value.trim();

    const phone =
      document.getElementById("customerPhone")
        .value.trim();

    const service =
      document.getElementById("customerService")
        .value;

    const message =
      document.getElementById("customerMessage")
        .value.trim();

    if (!name || !email || !service || !message) {

      formMessage.textContent =
        currentLanguage === "hi"
          ? "कृपया सभी जरूरी जानकारी भरें।"
          : currentLanguage === "or"
          ? "ଦୟାକରି ସମସ୍ତ ଆବଶ୍ୟକୀୟ ତଥ୍ୟ ପୂରଣ କରନ୍ତୁ।"
          : "Please complete all required fields.";

      return;
    }

    const subject =
      `Zentro Nex Project Enquiry - ${service}`;

    const body = [
      "NEW CUSTOMER PROJECT ENQUIRY",
      "--------------------------------",
      "",
      `Customer Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Service: ${service}`,
      "",
      "Project Details:",
      message,
      "",
      "Sent through Zentro Nex Website."
    ].join("\n");

    const mailto =
      "mailto:nexzentro@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    formMessage.textContent =
      currentLanguage === "hi"
        ? "आपका ईमेल ऐप खुल रहा है। कृपया ईमेल भेजें।"
        : currentLanguage === "or"
        ? "ଆପଣଙ୍କ ଇମେଲ୍ ଆପ୍ ଖୋଲୁଛି। ଦୟାକରି ଇମେଲ୍ ପଠାନ୍ତୁ।"
        : "Your email application is opening. Please send the email.";

    window.location.href = mailto;

  });

});
