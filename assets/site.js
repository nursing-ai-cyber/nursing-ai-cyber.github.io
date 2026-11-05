/* =====================================================================
   EDIT LINKS HERE — this is the only place you need to change them.
   Every button on the site with data-link="..." and the short
   redirect pages (signup.html, survey.html, apply.html) read from here.
   Leave a value as "" to show a "coming soon" state instead of a link.
   ===================================================================== */
var SITE_LINKS = {
  labSignup:  "https://forms.gle/Vq55eMEmtunz3GM97",   // Lab visit time-slot sign-up (e.g., Google Form / Sheet / Bookings URL)
  labSurvey:  "",   // Post-visit session survey (e.g., Google Form or Qualtrics URL)
  fellowsApp: ""    // Nursing Cyber Fellows application or interest form
};

var PENDING_TEXT = {
  labSignup:  "Sign-up link will be posted here",
  labSurvey:  "Survey opens at your lab session",
  fellowsApp: "Applications open soon"
};

(function () {
  "use strict";

  /* Fill data-link buttons */
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var key = el.getAttribute("data-link");
    var url = SITE_LINKS[key];
    if (url) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    } else {
      el.classList.add("pending");
      el.setAttribute("aria-disabled", "true");
      el.removeAttribute("href");
      var note = document.createElement("span");
      note.className = "pending-note";
      note.textContent = PENDING_TEXT[key] || "Link coming soon";
      if (el.parentNode && !el.parentNode.querySelector(".pending-note")) {
        el.insertAdjacentElement("afterend", note);
      }
    }
  });

  /* Redirect pages: <body data-redirect="labSignup"> */
  var target = document.body.getAttribute("data-redirect");
  if (target) {
    if (SITE_LINKS[target]) {
      window.location.replace(SITE_LINKS[target]);
    } else {
      var rs = document.getElementById("redirect-status");
      if (rs) rs.textContent = "This form is not open yet.";
    }
  }

  /* Mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Device filter on the lab page */
  var chips = document.querySelectorAll(".chip[data-filter]");
  var devices = document.querySelectorAll(".device[data-tags]");
  var status = document.getElementById("filter-status");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      var shown = 0;
      devices.forEach(function (d) {
        var match = f === "all" || d.getAttribute("data-tags").split(" ").indexOf(f) !== -1;
        d.hidden = !match;
        if (match) shown++;
      });
      if (status) {
        status.textContent = f === "all" ? "" : "Showing " + shown + " of " + devices.length + " devices.";
      }
    });
  });
})();
