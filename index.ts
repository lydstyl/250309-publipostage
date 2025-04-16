import { Document, Packer, Paragraph, TextRun } from 'docx'
import * as fs from 'fs'
import * as path from 'path'

const names = ['Marie', 'Louis']
const outputDir = path.join('/home/gab/apps/250309-publipostage', 'invitations')

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

names.forEach((name) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `Cher(e) ${name},`,
                bold: true,
                size: 28
              })
            ]
          }),
          new Paragraph('\n'),
          new Paragraph("Tu es invité(e) à l'anniversaire de ma fille ! 🎉"),
          new Paragraph('\n'),
          new Paragraph('Date : Samedi 15 juin 2024'),
          new Paragraph('Heure : 15h00'),
          new Paragraph('Lieu : Notre maison'),
          new Paragraph('\n'),
          new Paragraph('On espère te voir ! 😊')
        ]
      }
    ]
  })

  const filePath = path.join(outputDir, `${name}_invitation.docx`)
  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(filePath, buffer)
    console.log(`Invitation générée : ${filePath}`)
  })
})

console.log('xxx')
