"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, AlertTriangle, User, X } from "lucide-react"
import { useState } from "react"

export function PatientVisitView() {
  const [showSymptomForm, setShowSymptomForm] = useState(false)
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false)
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false)
  const [showLabForm, setShowLabForm] = useState(false)
  const [selectedDiagnosisCode, setSelectedDiagnosisCode] = useState("")
  const [selectedDiagnosisDescription, setSelectedDiagnosisDescription] = useState("")

  const [symptoms, setSymptoms] = useState([
    { id: 1, symptom: "Blurred Vision", severity: "Moderate" },
    { id: 2, symptom: "Fatigue", severity: "Severe" },
  ])
  const [diagnoses, setDiagnoses] = useState([
    { id: 1, code: "5A10", description: "Type 2 Diabetes Mellitus", doctorNote: "Patient shows poor glycemic control" },
    { id: 2, code: "GB61", description: "Hypertension", doctorNote: "Blood pressure consistently elevated" },
    {
      id: 3,
      code: "GB61.0",
      description: "Chronic Kidney Disease, Stage 3",
      doctorNote: "Monitor creatinine levels closely",
    },
  ])
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, medicine: "Metformin", dosage: "500mg tab", duration: "2x daily" },
    { id: 2, medicine: "Lisinopril", dosage: "10mg tab", duration: "1x daily" },
  ])
  const [labResults, setLabResults] = useState([
    { id: 1, testName: "HbA1c", result: "8.5%", referenceRange: "4.0-5.6%", status: "High", date: "2023-10-20" },
    {
      id: 2,
      testName: "Creatinine",
      result: "1.8 mg/dL",
      referenceRange: "0.6-1.2 mg/dL",
      status: "High",
      date: "2023-10-20",
    },
    { id: 3, testName: "eGFR", result: "42 mL/min/1.73m²", referenceRange: ">60", status: "Low", date: "2023-10-20" },
  ])

  const diagnosisCodes = [
    { code: "5A10", description: "Type 2 Diabetes Mellitus" },
    { code: "5A11", description: "Type 1 Diabetes Mellitus" },
    { code: "GB61", description: "Hypertension" },
    { code: "GB61.0", description: "Chronic Kidney Disease, Stage 3" },
    { code: "GB61.1", description: "Chronic Kidney Disease, Stage 4" },
    { code: "8E43", description: "Hyperlipidemia" },
    { code: "BA00", description: "Essential Hypertension" },
    { code: "5A14", description: "Diabetic Nephropathy" },
    { code: "9B71", description: "Obesity" },
    { code: "8B94", description: "Metabolic Syndrome" },
  ]

  const labTestNames = [
    "HbA1c",
    "Creatinine",
    "eGFR",
    "Blood Glucose",
    "Total Cholesterol",
    "LDL Cholesterol",
    "HDL Cholesterol",
    "Triglycerides",
    "Urea",
    "Albumin",
    "Hemoglobin",
    "White Blood Cell Count",
    "Platelet Count",
    "TSH",
    "Vitamin D",
    "Vitamin B12",
    "Folate",
    "Iron",
    "Ferritin",
    "CRP",
  ]

  const handleAddSymptom = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const newSymptom = {
      id: symptoms.length + 1,
      symptom: formData.get("symptom") as string,
      severity: formData.get("severity") as string,
    }
    setSymptoms([...symptoms, newSymptom])
    setShowSymptomForm(false)
  }

  const handleAddDiagnosis = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const newDiagnosis = {
      id: diagnoses.length + 1,
      code: selectedDiagnosisCode,
      description: selectedDiagnosisDescription,
      doctorNote: formData.get("doctorNote") as string,
    }
    setDiagnoses([...diagnoses, newDiagnosis])
    setShowDiagnosisForm(false)
    setSelectedDiagnosisCode("")
    setSelectedDiagnosisDescription("")
  }

  const handleAddPrescription = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const newPrescription = {
      id: prescriptions.length + 1,
      medicine: formData.get("medicine") as string,
      dosage: formData.get("dosage") as string,
      duration: formData.get("duration") as string,
    }
    setPrescriptions([...prescriptions, newPrescription])
    setShowPrescriptionForm(false)
  }

  const handleAddLabResult = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const newLabResult = {
      id: labResults.length + 1,
      testName: formData.get("testName") as string,
      result: formData.get("result") as string,
      referenceRange: formData.get("referenceRange") as string,
      status: formData.get("status") as string,
      date: formData.get("date") as string,
    }
    setLabResults([...labResults, newLabResult])
    setShowLabForm(false)
  }

  const handleDiagnosisCodeChange = (code: string) => {
    setSelectedDiagnosisCode(code)
    const selectedDiagnosis = diagnosisCodes.find((d) => d.code === code)
    setSelectedDiagnosisDescription(selectedDiagnosis?.description || "")
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <User className="h-8 w-8 text-muted-foreground" />
              <div>
                <CardTitle className="text-2xl font-bold">Sarah Johnson - 45, Female</CardTitle>
                <p className="text-muted-foreground">Patient ID: 12345 | Visit Date: 2023-10-27</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              Active Visit
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* AI Risk Alert */}
      <Alert className="border-destructive bg-destructive/10">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <AlertDescription className="text-destructive font-medium">
          <div className="space-y-2">
            <p className="font-semibold">🚨 AI RISK ALERT: High risk of CKD progression</p>
            <div className="text-sm space-y-1">
              <p>
                <strong>Key Reasons:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>HbA1c has been {">"} 8.0% for 6 months</li>
                <li>Blood pressure consistently high</li>
              </ul>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Summary Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b pb-2">Patient Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Problems */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Problems</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="secondary">Type 2 Diabetes</Badge>
                <Badge variant="secondary">Hypertension</Badge>
                <Badge variant="secondary">CKD Stage 3</Badge>
              </CardContent>
            </Card>

            {/* Allergies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Allergies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="font-medium text-destructive">Penicillin</p>
                  <p className="text-sm text-muted-foreground">Severe - Anaphylaxis</p>
                </div>
                <Separator />
                <div className="space-y-1">
                  <p className="font-medium text-orange-600">Sulfa drugs</p>
                  <p className="text-sm text-muted-foreground">Moderate - Rash</p>
                </div>
                <Separator />
                <div className="space-y-1">
                  <p className="font-medium text-yellow-600">Shellfish</p>
                  <p className="text-sm text-muted-foreground">Mild - Hives</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Symptoms Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold">Patient Symptoms</h2>
            <Button className="flex items-center gap-2" onClick={() => setShowSymptomForm(true)}>
              <Plus className="h-4 w-4" />
              Add New Symptom
            </Button>
          </div>

          {showSymptomForm && (
            <Card className="border-primary">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Add New Symptom</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowSymptomForm(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSymptom} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="symptom">Symptom</Label>
                      <Input id="symptom" name="symptom" placeholder="Enter symptom description" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="severity">Severity</Label>
                      <Select name="severity" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mild">Mild</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Severe">Severe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowSymptomForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Symptom</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Symptom</th>
                      <th className="text-left p-4 font-medium">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {symptoms.map((symptom) => (
                      <tr key={symptom.id} className="border-b">
                        <td className="p-4">{symptom.symptom}</td>
                        <td className="p-4">
                          <Badge variant={symptom.severity === "Severe" ? "destructive" : "outline"}>
                            {symptom.severity}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Diagnosis Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold">Diagnosis</h2>
            <Button className="flex items-center gap-2" onClick={() => setShowDiagnosisForm(true)}>
              <Plus className="h-4 w-4" />
              Add Diagnosis (Search ICD-11 Code...)
            </Button>
          </div>

          {showDiagnosisForm && (
            <Card className="border-primary">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Add New Diagnosis</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowDiagnosisForm(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddDiagnosis} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="code">ICD-11 Code</Label>
                      <Select value={selectedDiagnosisCode} onValueChange={handleDiagnosisCodeChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select diagnosis code" />
                        </SelectTrigger>
                        <SelectContent>
                          {diagnosisCodes.map((diagnosis) => (
                            <SelectItem key={diagnosis.code} value={diagnosis.code}>
                              {diagnosis.code} - {diagnosis.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        value={selectedDiagnosisDescription}
                        placeholder="Select a code to see description"
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctorNote">Doctor Note</Label>
                    <Textarea
                      id="doctorNote"
                      name="doctorNote"
                      placeholder="Add your clinical notes for this diagnosis..."
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowDiagnosisForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!selectedDiagnosisCode}>
                      Add Diagnosis
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Code</th>
                      <th className="text-left p-4 font-medium">Description</th>
                      <th className="text-left p-4 font-medium">Doctor Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diagnoses.map((diagnosis) => (
                      <tr key={diagnosis.id} className="border-b">
                        <td className="p-4 font-mono">{diagnosis.code}</td>
                        <td className="p-4">{diagnosis.description}</td>
                        <td className="p-4 text-sm text-muted-foreground">{diagnosis.doctorNote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Lab Reports Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold">Lab Reports</h2>
            <Button className="flex items-center gap-2" onClick={() => setShowLabForm(true)}>
              <Plus className="h-4 w-4" />
              Add Lab Result
            </Button>
          </div>

          {showLabForm && (
            <Card className="border-primary">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Add New Lab Result</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowLabForm(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddLabResult} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="testName">Test Name</Label>
                      <Select name="testName" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select test" />
                        </SelectTrigger>
                        <SelectContent>
                          {labTestNames.map((testName) => (
                            <SelectItem key={testName} value={testName}>
                              {testName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="result">Result</Label>
                      <Input id="result" name="result" placeholder="e.g., 8.5%" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referenceRange">Reference Range</Label>
                      <Input id="referenceRange" name="referenceRange" placeholder="e.g., 4.0-5.6%" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select name="status" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Test Date</Label>
                      <Input id="date" name="date" type="date" required />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowLabForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Lab Result</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Test Name</th>
                      <th className="text-left p-4 font-medium">Result</th>
                      <th className="text-left p-4 font-medium">Reference Range</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labResults.map((lab) => (
                      <tr key={lab.id} className="border-b">
                        <td className="p-4 font-medium">{lab.testName}</td>
                        <td className="p-4">{lab.result}</td>
                        <td className="p-4 text-muted-foreground">{lab.referenceRange}</td>
                        <td className="p-4">
                          <Badge
                            variant={
                              lab.status === "High" || lab.status === "Low"
                                ? "destructive"
                                : lab.status === "Critical"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {lab.status}
                          </Badge>
                        </td>
                        <td className="p-4">{lab.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Prescription Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold">Current Prescriptions</h2>
            <Button className="flex items-center gap-2" onClick={() => setShowPrescriptionForm(true)}>
              <Plus className="h-4 w-4" />
              New Prescription
            </Button>
          </div>

          {showPrescriptionForm && (
            <Card className="border-primary">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Add New Prescription</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowPrescriptionForm(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddPrescription} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="medicine">Medicine</Label>
                      <Input id="medicine" name="medicine" placeholder="Enter medicine name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dosage">Dosage</Label>
                      <Input id="dosage" name="dosage" placeholder="e.g., 500mg tab" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration/Frequency</Label>
                      <Input id="duration" name="duration" placeholder="e.g., 2x daily" required />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowPrescriptionForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Prescription</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Medicine</th>
                      <th className="text-left p-4 font-medium">Dosage</th>
                      <th className="text-left p-4 font-medium">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((prescription) => (
                      <tr key={prescription.id} className="border-b">
                        <td className="p-4">{prescription.medicine}</td>
                        <td className="p-4">{prescription.dosage}</td>
                        <td className="p-4">{prescription.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button variant="outline">Cancel</Button>
        <Button variant="outline">Close Visit</Button>
        <Button>Save</Button>
      </div>
    </div>
  )
}
