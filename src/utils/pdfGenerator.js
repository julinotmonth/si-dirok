/**
 * PDF Generator Utility untuk SI-DIROK
 * Menggunakan jsPDF untuk generate laporan hasil diagnosis
 */

import { jsPDF } from 'jspdf'
import { interpretCF } from './certaintyFactor'

/**
 * Format tanggal ke bahasa Indonesia
 * @param {string|Date} date 
 * @returns {string}
 */
const formatDate = (date) => {
  const d = new Date(date)
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return d.toLocaleDateString('id-ID', options)
}

/**
 * Generate PDF hasil diagnosis
 * @param {Object} diagnosisSummary - Data hasil diagnosis lengkap
 * @returns {jsPDF} - Instance jsPDF
 */
export const generateDiagnosisPDF = (diagnosisSummary) => {
  const doc = new jsPDF()
  const { userData, riskFactor, primaryDiagnosis, secondaryDiagnoses, allResults } = diagnosisSummary
  
  // Colors
  const primaryColor = [245, 158, 11] // Amber/Orange
  const darkColor = [15, 23, 42] // Dark slate
  const grayColor = [100, 116, 139] // Slate gray
  
  let yPos = 20
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  
  // === HEADER ===
  // Logo/Title
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('SI-DIROK', margin, 25)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Sistem Pakar Diagnosis Penyakit yang Disebabkan oleh Rokok', margin, 33)
  
  yPos = 55
  
  // === JUDUL LAPORAN ===
  doc.setTextColor(...darkColor)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('LAPORAN HASIL DIAGNOSIS', pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...grayColor)
  doc.text(`Tanggal: ${formatDate(diagnosisSummary.timestamp)}`, pageWidth / 2, yPos, { align: 'center' })
  
  yPos += 15
  
  // === DATA PASIEN ===
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(margin, yPos, contentWidth, 45, 3, 3, 'F')
  
  yPos += 10
  doc.setTextColor(...darkColor)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Data Pasien', margin + 10, yPos)
  
  yPos += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  
  const userData2 = [
    [`Nama: ${userData.name || '-'}`, `Usia: ${userData.age || '-'} tahun`],
    [`Jenis Kelamin: ${userData.gender === 'male' ? 'Laki-laki' : 'Perempuan'}`, `Lama Merokok: ${userData.smokingYears || '-'} tahun`],
    [`Jumlah Rokok/Hari: ${userData.cigarettesPerDay || '-'} batang`, `Pack-Years: ${riskFactor.packYears}`]
  ]
  
  userData2.forEach(row => {
    doc.text(row[0], margin + 10, yPos)
    doc.text(row[1], margin + contentWidth / 2, yPos)
    yPos += 7
  })
  
  yPos += 10
  
  // === FAKTOR RISIKO ===
  doc.setFillColor(254, 243, 199) // Yellow light
  doc.roundedRect(margin, yPos, contentWidth, 25, 3, 3, 'F')
  
  yPos += 10
  doc.setTextColor(...darkColor)
  doc.setFont('helvetica', 'bold')
  doc.text('Faktor Risiko Merokok', margin + 10, yPos)
  
  yPos += 8
  doc.setFont('helvetica', 'normal')
  doc.text(`Level: ${riskFactor.level} | ${riskFactor.description}`, margin + 10, yPos)
  
  yPos += 20
  
  // === HASIL DIAGNOSIS UTAMA ===
  if (primaryDiagnosis) {
    const interpretation = primaryDiagnosis.interpretation
    
    // Background color based on severity
    let bgColor = [220, 252, 231] // Green for low
    if (parseFloat(primaryDiagnosis.percentage) >= 60) {
      bgColor = [254, 226, 226] // Red for high
    } else if (parseFloat(primaryDiagnosis.percentage) >= 40) {
      bgColor = [254, 249, 195] // Yellow for medium
    }
    
    doc.setFillColor(...bgColor)
    doc.roundedRect(margin, yPos, contentWidth, 55, 3, 3, 'F')
    
    yPos += 12
    doc.setTextColor(...darkColor)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Diagnosis Utama', margin + 10, yPos)
    
    yPos += 12
    doc.setFontSize(16)
    doc.text(primaryDiagnosis.disease.name, margin + 10, yPos)
    
    yPos += 10
    doc.setFontSize(24)
    doc.setTextColor(...primaryColor)
    doc.text(`${primaryDiagnosis.percentage}%`, margin + 10, yPos)
    
    doc.setFontSize(10)
    doc.setTextColor(...grayColor)
    doc.text(`Tingkat Keyakinan: ${interpretation.level}`, margin + 50, yPos)
    
    yPos += 10
    doc.setFontSize(9)
    doc.text(interpretation.recommendation, margin + 10, yPos)
    
    yPos += 15
  }
  
  // === KEMUNGKINAN PENYAKIT LAIN ===
  if (secondaryDiagnoses && secondaryDiagnoses.length > 0) {
    doc.setTextColor(...darkColor)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Kemungkinan Penyakit Lain', margin, yPos)
    
    yPos += 8
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    
    secondaryDiagnoses.forEach((diagnosis, index) => {
      // Check if we need new page
      if (yPos > 250) {
        doc.addPage()
        yPos = 20
      }
      
      doc.setFillColor(248, 250, 252)
      doc.roundedRect(margin, yPos, contentWidth, 15, 2, 2, 'F')
      
      yPos += 10
      doc.setTextColor(...darkColor)
      doc.text(`${index + 2}. ${diagnosis.disease.name}`, margin + 5, yPos)
      doc.setTextColor(...primaryColor)
      doc.text(`${diagnosis.percentage}%`, margin + contentWidth - 30, yPos)
      
      yPos += 10
    })
  }
  
  yPos += 10
  
  // === GEJALA YANG TERDETEKSI ===
  if (primaryDiagnosis && primaryDiagnosis.matchedSymptoms) {
    // Check if we need new page
    if (yPos > 200) {
      doc.addPage()
      yPos = 20
    }
    
    doc.setTextColor(...darkColor)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Gejala yang Dilaporkan', margin, yPos)
    
    yPos += 8
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    
    primaryDiagnosis.matchedSymptoms.forEach((ms, index) => {
      if (yPos > 270) {
        doc.addPage()
        yPos = 20
      }
      
      doc.setTextColor(...grayColor)
      doc.text(`• ${ms.symptom.name}`, margin + 5, yPos)
      doc.setTextColor(...primaryColor)
      doc.text(`(${(ms.certainty * 100).toFixed(0)}% yakin)`, margin + 140, yPos)
      yPos += 6
    })
  }
  
  yPos += 10
  
  // === DESKRIPSI PENYAKIT ===
  if (primaryDiagnosis) {
    if (yPos > 200) {
      doc.addPage()
      yPos = 20
    }
    
    doc.setTextColor(...darkColor)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Tentang Penyakit', margin, yPos)
    
    yPos += 8
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    
    const description = primaryDiagnosis.disease.description
    const splitDescription = doc.splitTextToSize(description, contentWidth - 10)
    doc.text(splitDescription, margin + 5, yPos)
    yPos += splitDescription.length * 5 + 5
  }
  
  // === SARAN PENCEGAHAN ===
  if (primaryDiagnosis && primaryDiagnosis.disease.prevention) {
    if (yPos > 220) {
      doc.addPage()
      yPos = 20
    }
    
    doc.setFillColor(236, 253, 245) // Green light
    doc.roundedRect(margin, yPos, contentWidth, 50, 3, 3, 'F')
    
    yPos += 10
    doc.setTextColor(...darkColor)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Saran Pencegahan & Penanganan', margin + 5, yPos)
    
    yPos += 8
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    
    primaryDiagnosis.disease.prevention.slice(0, 4).forEach(item => {
      doc.text(`• ${item}`, margin + 5, yPos)
      yPos += 6
    })
  }
  
  // === FOOTER ===
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    
    // Footer line
    doc.setDrawColor(...grayColor)
    doc.line(margin, 280, pageWidth - margin, 280)
    
    // Footer text
    doc.setFontSize(8)
    doc.setTextColor(...grayColor)
    doc.text('SI-DIROK - Sistem Pakar Diagnosis Penyakit Rokok', margin, 287)
    doc.text(`Halaman ${i} dari ${pageCount}`, pageWidth - margin, 287, { align: 'right' })
    
    // Disclaimer
    doc.setFontSize(7)
    doc.text('Hasil diagnosis ini bersifat indikatif dan bukan pengganti konsultasi medis profesional.', pageWidth / 2, 293, { align: 'center' })
  }
  
  return doc
}

/**
 * Download PDF hasil diagnosis
 * @param {Object} diagnosisSummary - Data hasil diagnosis
 * @param {string} filename - Nama file (opsional)
 */
export const downloadDiagnosisPDF = (diagnosisSummary, filename = null) => {
  const doc = generateDiagnosisPDF(diagnosisSummary)
  const defaultFilename = `SI-DIROK_Diagnosis_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename || defaultFilename)
}

/**
 * Preview PDF di tab baru
 * @param {Object} diagnosisSummary - Data hasil diagnosis
 */
export const previewDiagnosisPDF = (diagnosisSummary) => {
  const doc = generateDiagnosisPDF(diagnosisSummary)
  const pdfBlob = doc.output('blob')
  const pdfUrl = URL.createObjectURL(pdfBlob)
  window.open(pdfUrl, '_blank')
}

/**
 * Generate PDF laporan admin (semua diagnosis)
 * @param {Array} allDiagnoses - Array semua hasil diagnosis
 * @param {Object} options - Opsi laporan
 */
export const generateAdminReportPDF = (allDiagnoses, options = {}) => {
  const doc = new jsPDF()
  const { startDate, endDate, title = 'Laporan Hasil Diagnosis' } = options
  
  const primaryColor = [245, 158, 11]
  const darkColor = [15, 23, 42]
  const grayColor = [100, 116, 139]
  
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let yPos = 20
  
  // Header
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, pageWidth, 35, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('SI-DIROK Admin Report', margin, 22)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(title, margin, 30)
  
  yPos = 50
  
  // Summary Stats
  doc.setTextColor(...darkColor)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Ringkasan Statistik', margin, yPos)
  
  yPos += 10
  
  const totalDiagnoses = allDiagnoses.length
  const avgAge = allDiagnoses.reduce((sum, d) => sum + (d.userData?.age || 0), 0) / totalDiagnoses
  const diseaseCount = {}
  
  allDiagnoses.forEach(d => {
    const diseaseName = d.primaryDiagnosis?.disease?.name || 'Unknown'
    diseaseCount[diseaseName] = (diseaseCount[diseaseName] || 0) + 1
  })
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Total Diagnosis: ${totalDiagnoses}`, margin, yPos)
  yPos += 6
  doc.text(`Rata-rata Usia: ${avgAge.toFixed(1)} tahun`, margin, yPos)
  yPos += 6
  
  if (startDate && endDate) {
    doc.text(`Periode: ${formatDate(startDate)} - ${formatDate(endDate)}`, margin, yPos)
    yPos += 6
  }
  
  yPos += 10
  
  // Disease Distribution
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Distribusi Penyakit Terdeteksi', margin, yPos)
  
  yPos += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  
  Object.entries(diseaseCount).sort((a, b) => b[1] - a[1]).forEach(([disease, count]) => {
    const percentage = ((count / totalDiagnoses) * 100).toFixed(1)
    doc.text(`• ${disease}: ${count} kasus (${percentage}%)`, margin + 5, yPos)
    yPos += 6
  })
  
  // Detail table would go here for a more complete implementation
  
  return doc
}

export default {
  generateDiagnosisPDF,
  downloadDiagnosisPDF,
  previewDiagnosisPDF,
  generateAdminReportPDF
}
