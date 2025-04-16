import fs from 'fs'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { DocxOptions } from '../domain/DocxOptions/index.js'

export class Docx {
  options: DocxOptions
  constructor(options: DocxOptions) {
    this.options = options
  }
  generate() {
    const { templatePath, filtePath, data } = this.options

    // Charge le template .docx
    const content = fs.readFileSync(templatePath, 'binary')
    const zip = new PizZip(content)
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    })

    try {
      doc.render(data)
    } catch (error: any) {
      console.error('Erreur de génération :', error)
    }

    const outputBuffer = doc.getZip().generate({ type: 'nodebuffer' })
    fs.writeFileSync(filtePath, outputBuffer)

    console.log('✅ Document généré :', this.options.filtePath)
  }
}
