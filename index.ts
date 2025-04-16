import fs from 'fs'
import path from 'path'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'

// Charge le template .docx
const templatePath = path.resolve(
  '/home/gab/apps/250309-publipostage',
  'template.docx'
)
const content = fs.readFileSync(templatePath, 'binary')

const zip = new PizZip(content)
const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true
})

// Données à injecter dans les {{ variables }}
doc.setData({
  BAILLEUR: 'SCI LOGIS ANGE\n259 rue de Wallers\n59590 RAISMES',
  CIVILITÉ: 'Monsieur',
  LOCATAIRE: 'ZUREK\nAppartement n°3\n32 B rue Henri Durre\n59590 RAISMES',
  DATE_COURRIER: '25/12/2024',
  TYPE_INDICE: 'Indice de Référence des Loyers',
  TRIMESTRE: '2ᵉ',
  NIND: '145,17',
  LHC: '492,00',
  AI: '140,65',
  NLHC: '507,96',
  CHARGES: '54',
  NOUVEAU_LOYER: '561,96',
  REGLEMENT: 'février 2025',
  SIGNATURE: 'Gabriel Brun, gérant de la SCI LOGIS ANGE'
})

try {
  doc.render() // Remplacement des balises
} catch (error: any) {
  console.error('Erreur de génération :', error)
}

const outputBuffer = doc.getZip().generate({ type: 'nodebuffer' })
fs.writeFileSync('revision-loyer.docx', outputBuffer)

console.log('✅ Document généré : revision-loyer.docx')
