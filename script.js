// Form visibility functions
function showSymptomForm() {
  document.getElementById("symptomForm").style.display = "block"
}

function hideSymptomForm() {
  document.getElementById("symptomForm").style.display = "none"
  document.getElementById("symptomForm").querySelector("form").reset()
}

function showDiagnosisForm() {
  document.getElementById("diagnosisForm").style.display = "block"
}

function hideDiagnosisForm() {
  document.getElementById("diagnosisForm").style.display = "none"
  document.getElementById("diagnosisForm").querySelector("form").reset()
}

function showLabForm() {
  document.getElementById("labForm").style.display = "block"
  // Set today's date as default
  document.getElementById("labDate").value = new Date().toISOString().split("T")[0]
}

function hideLabForm() {
  document.getElementById("labForm").style.display = "none"
  document.getElementById("labForm").querySelector("form").reset()
}

function showPrescriptionForm() {
  document.getElementById("prescriptionForm").style.display = "block"
}

function hidePrescriptionForm() {
  document.getElementById("prescriptionForm").style.display = "none"
  document.getElementById("prescriptionForm").querySelector("form").reset()
}

// Update diagnosis description when code is selected
function updateDiagnosisDescription() {
  const select = document.getElementById("diagnosisCode")
  const description = document.getElementById("diagnosisDescription")
  const selectedOption = select.options[select.selectedIndex]

  if (selectedOption && selectedOption.dataset.description) {
    description.value = selectedOption.dataset.description
  } else {
    description.value = ""
  }
}

// Add symptom function
function addSymptom(event) {
  event.preventDefault()

  const description = document.getElementById("symptomDescription").value
  const severity = document.getElementById("symptomSeverity").value

  if (description && severity) {
    const tableBody = document.getElementById("symptomsTableBody")
    const newRow = document.createElement("tr")

    const severityClass = severity === "Severe" ? "bg-danger" : severity === "Moderate" ? "bg-warning" : "bg-success"

    newRow.innerHTML = `
            <td>${description}</td>
            <td><span class="badge ${severityClass}">${severity}</span></td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="removeRow(this)">Remove</button></td>
        `

    tableBody.appendChild(newRow)
    hideSymptomForm()
  }
}

// Add diagnosis function
function addDiagnosis(event) {
  event.preventDefault()

  const code = document.getElementById("diagnosisCode").value
  const description = document.getElementById("diagnosisDescription").value
  const notes = document.getElementById("diagnosisNotes").value

  if (code && description) {
    const tableBody = document.getElementById("diagnosisTableBody")
    const newRow = document.createElement("tr")

    newRow.innerHTML = `
            <td>${code}</td>
            <td>${description}</td>
            <td>${notes || "-"}</td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="removeRow(this)">Remove</button></td>
        `

    tableBody.appendChild(newRow)
    hideDiagnosisForm()
  }
}

// Add lab result function
function addLabResult(event) {
  event.preventDefault()

  const testName = document.getElementById("labTestName").value
  const result = document.getElementById("labResult").value
  const reference = document.getElementById("labReference").value
  const status = document.getElementById("labStatus").value
  const date = document.getElementById("labDate").value

  if (testName && result && reference && status && date) {
    const tableBody = document.getElementById("labTableBody")
    const newRow = document.createElement("tr")

    const statusClass =
      status === "Critical"
        ? "bg-danger"
        : status === "High"
          ? "bg-warning"
          : status === "Low"
            ? "bg-info"
            : "bg-success"

    // Format date
    const formattedDate = new Date(date).toLocaleDateString()

    newRow.innerHTML = `
            <td>${testName}</td>
            <td>${result}</td>
            <td>${reference}</td>
            <td><span class="badge ${statusClass}">${status}</span></td>
            <td>${formattedDate}</td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="removeRow(this)">Remove</button></td>
        `

    tableBody.appendChild(newRow)
    hideLabForm()
  }
}

// Add prescription function
function addPrescription(event) {
  event.preventDefault()

  const medication = document.getElementById("prescriptionMedication").value
  const dosage = document.getElementById("prescriptionDosage").value
  const frequency = document.getElementById("prescriptionFrequency").value
  const duration = document.getElementById("prescriptionDuration").value
  const instructions = document.getElementById("prescriptionInstructions").value

  if (medication && dosage && frequency && duration) {
    const tableBody = document.getElementById("prescriptionTableBody")
    const newRow = document.createElement("tr")

    newRow.innerHTML = `
            <td>${medication}</td>
            <td>${dosage}</td>
            <td>${frequency}</td>
            <td>${duration}</td>
            <td>${instructions || "-"}</td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="removeRow(this)">Remove</button></td>
        `

    tableBody.appendChild(newRow)
    hidePrescriptionForm()
  }
}

// Remove row function
function removeRow(button) {
  const row = button.closest("tr")
  row.remove()
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Medical UI loaded successfully")
})
