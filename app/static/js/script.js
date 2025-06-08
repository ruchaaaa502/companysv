document.addEventListener("DOMContentLoaded", () => {
  // Initialize UI elements
  initUI()

  // Initialize form functionality
  initForm()

  // Initialize search functionality
  initSearch()

  // Initialize ID card functionality
  initIDCard()

  // Check for URL parameters to show results
  checkForSearchResults()
})

// Initialize UI elements
function initUI() {
  // Initialize hamburger menu
  const hamburgerMenu = document.getElementById("hamburgerMenu")
  const profileDropdown = document.getElementById("profileDropdown")

  if (hamburgerMenu && profileDropdown) {
    hamburgerMenu.addEventListener("click", () => {
      profileDropdown.classList.toggle("active")
    })

    document.addEventListener("click", (event) => {
      if (!hamburgerMenu.contains(event.target) && !profileDropdown.contains(event.target)) {
        profileDropdown.classList.remove("active")
      }
    })
  }

  // Initialize language tabs
  const languageTabs = document.querySelectorAll(".language-tab")

  languageTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      languageTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      // Set the language attribute on body for translations
      document.body.setAttribute("data-lang", this.getAttribute("data-lang"))
    })
  })

  // Initialize modal
  const closeModalBtn = document.querySelector(".close-modal-btn")
  const modalCancel = document.getElementById("modal-cancel")

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", hideModal)
  }

  if (modalCancel) {
    modalCancel.addEventListener("click", hideModal)
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("confirmModal")
    if (e.target === modal) {
      hideModal()
    }
  })

  // Initialize car search box expansion
  const carSearchBox = document.getElementById("car-search-box")
  if (carSearchBox) {
    carSearchBox.addEventListener("click", function (e) {
      // Don't expand if clicking on form elements
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("button") ||
        e.target.closest("form")
      ) {
        return
      }

      this.classList.toggle("expanded")

      // Add close button if expanded
      if (this.classList.contains("expanded")) {
        if (!document.querySelector(".car-search-close-btn")) {
          const closeBtn = document.createElement("button")
          closeBtn.className = "close-btn car-search-close-btn"
          closeBtn.innerHTML = `
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                  `
          closeBtn.addEventListener("click", (e) => {
            e.stopPropagation()
            this.classList.remove("expanded")
            closeBtn.remove()
          })

          const header = this.querySelector(".bento-header")
          header.appendChild(closeBtn)
        }
      }
    })
  }
}

// Initialize form functionality
function initForm() {
  // Form navigation
  window.showPage = (currentPage, nextPage) => {
    document.getElementById(currentPage).style.display = "none"
    document.getElementById(nextPage).style.display = "block"
  }

  // Form validation
  window.validateForm = () => {
    // Basic validation logic
    const requiredFields = document.querySelectorAll("input[required], select[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false
        field.classList.add("error")
      } else {
        field.classList.remove("error")
      }
    })

    if (!isValid) {
      showFlashMessage("Please fill in all required fields", "error")
      return false
    }

    // Show success message
    showFlashMessage("Form submitted successfully!", "success")
    return true
  }
}

// Initialize search functionality
function initSearch() {
  // Initialize edit button for registration number
  const editRegNoBtn = document.getElementById("editRegNoBtn")
  const regNoInput = document.querySelector("input[name='reg_no']")

  if (editRegNoBtn && regNoInput) {
    editRegNoBtn.addEventListener("click", (e) => {
      e.preventDefault()
      // Toggle readonly attribute
      if (regNoInput.hasAttribute("readonly")) {
        regNoInput.removeAttribute("readonly")
        editRegNoBtn.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
              `
      } else {
        regNoInput.setAttribute("readonly", true)
        editRegNoBtn.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
              `
      }
    })
  }

  // Car search form
  const carSearchForm = document.getElementById("carSearchForm")
  if (carSearchForm) {
    carSearchForm.addEventListener("submit", (e) => {
      // Redirect to search page
      window.location.href = "/search"
    })
  }

  // Search button on search_cars.html
  const searchButton = document.querySelector(".search-button")
  if (searchButton) {
    const form = searchButton.closest("form")
    if (form) {
      form.addEventListener("submit", function (e) {
        const regNo = this.querySelector("input[name='reg_no']").value.trim()
        if (!regNo) {
          e.preventDefault()
          showFlashMessage("Please enter the last 4 digits of the registration number", "error")
        }
      })
    }
  }
}

// Initialize ID card functionality
function initIDCard() {
  const accessEidButton = document.getElementById("access-eid-button")
  const eidBox = document.getElementById("eid-box")

  if (accessEidButton && eidBox) {
    accessEidButton.addEventListener("click", () => {
      // Create fullscreen ID card container if it doesn't exist
      if (!document.querySelector(".id-card-fullscreen")) {
        const fullscreenContainer = document.createElement("div")
        fullscreenContainer.className = "id-card-fullscreen"

        const idCardContainer = document.createElement("div")
        idCardContainer.className = "id-card-container"

        // Create close button
        const closeButton = document.createElement("button")
        closeButton.className = "close-id-card"
        closeButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `
        closeButton.addEventListener("click", () => {
          fullscreenContainer.classList.remove("active")
          setTimeout(() => {
            fullscreenContainer.remove()
          }, 300)
        })

        // Create ID card
        const idCard = document.createElement("div")
        idCard.className = "id-card"
        idCard.innerHTML = `
          <div class="id-card-header">
            <h3>SV Enterprises - Employee ID</h3>
          </div>
          <div class="id-card-body">
            <div class="id-photo">
              <span>Photo will be added later</span>
            </div>
            <div class="id-details">
              <div class="id-field">
                <div class="id-label">Employee ID</div>
                <div class="id-value">${document.querySelector("input[name='emp_id']")?.value || "EMP12345"}</div>
              </div>
              <div class="id-field">
                <div class="id-label">Name</div>
                <div class="id-value">${document.querySelector("input[name='name']")?.value || "Employee Name"}</div>
              </div>
              <div class="id-field">
                <div class="id-label">Designation</div>
                <div class="id-value">${document.querySelector("input[name='designation']")?.value || "Employee Designation"}</div>
              </div>
              <div class="id-field">
                <div class="id-label">Joining Date</div>
                <div class="id-value">${document.querySelector("input[name='doi']")?.value || "01/01/2023"}</div>
              </div>
              <div class="id-field">
                <div class="id-label">Contact</div>
                <div class="id-value">${document.querySelector("input[name='phoneno']")?.value || "9876543210"}</div>
              </div>
            </div>
          </div>
          <div class="id-card-footer">
            <div class="id-qr"></div>
            <div class="id-signature">Authorized Signature</div>
          </div>
        `

        // Create button container
        const buttonContainer = document.createElement("div")
        buttonContainer.className = "id-card-buttons"

        // Add print button
        const printButton = document.createElement("button")
        printButton.className = "action-btn"
        printButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon" style="margin-right: 0.5rem;">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print ID Card
        `
        printButton.addEventListener("click", () => {
          window.print()
        })

        // Add cancel button
        const cancelButton = document.createElement("button")
        cancelButton.className = "secondary-btn"
        cancelButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="button-icon" style="margin-right: 0.5rem;">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Cancel
        `
        cancelButton.addEventListener("click", () => {
          fullscreenContainer.classList.remove("active")
          setTimeout(() => {
            fullscreenContainer.remove()
          }, 300)
        })

        // Add buttons to container
        buttonContainer.appendChild(printButton)
        buttonContainer.appendChild(cancelButton)

        // Assemble the components
        idCardContainer.appendChild(closeButton)
        idCardContainer.appendChild(idCard)
        idCardContainer.appendChild(buttonContainer)
        fullscreenContainer.appendChild(idCardContainer)
        document.body.appendChild(fullscreenContainer)

        // Make the form bento box smaller when ID card is displayed
        const formBox = document.getElementById("form-box")
        if (formBox) {
          formBox.classList.add("form-box-small")
        }

        // Show the fullscreen container
        setTimeout(() => {
          fullscreenContainer.classList.add("active")
        }, 10)
      } else {
        // If it already exists, just show it
        const fullscreenContainer = document.querySelector(".id-card-fullscreen")
        fullscreenContainer.classList.add("active")
      }
    })
  }
}

// Check for search results in URL
function checkForSearchResults() {
  const urlParams = new URLSearchParams(window.location.search)
  const searchTerm = urlParams.get("q")

  if (searchTerm) {
    const regNoInput = document.querySelector("input[name='reg_no']")
    if (regNoInput) {
      regNoInput.value = searchTerm

      // Trigger search
      const searchButton = document.getElementById("searchCarBtn")
      if (searchButton) {
        searchButton.click()
      }
    }
  }
}

// Show flash message
function showFlashMessage(message, type = "info") {
  const flashMessages = document.getElementById("flashMessages")
  if (!flashMessages) return

  const alert = document.createElement("div")
  alert.className = `alert alert-${type}`
  alert.innerHTML = message

  if (type === "success") {
    alert.innerHTML += `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="alert-icon">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
      `
  }

  flashMessages.appendChild(alert)

  // Auto-hide after 5 seconds
  setTimeout(() => {
    alert.style.animation = "slideOut 0.5s ease-out"
    alert.addEventListener("animationend", () => {
      if (flashMessages.contains(alert)) {
        flashMessages.removeChild(alert)
      }
    })
  }, 5000)
}

// Show modal
function showModal(title, message, confirmCallback) {
  const modal = document.getElementById("confirmModal")
  const modalTitle = document.getElementById("modal-title")
  const modalMessage = document.getElementById("modal-message")
  const confirmBtn = document.getElementById("modal-confirm")

  modalTitle.textContent = title
  modalMessage.textContent = message

  confirmBtn.onclick = confirmCallback

  modal.classList.add("active")
}

// Hide modal
function hideModal() {
  const modal = document.getElementById("confirmModal")
  modal.classList.remove("active")
}

// Logout handler
function handleLogout() {
  showModal("Confirm Logout", "Are you sure you want to log out from your account?", () => {
    showFlashMessage("Logging out...", "success")
    setTimeout(() => {
      window.location.href = "/logout"
    }, 1000)
  })
}
