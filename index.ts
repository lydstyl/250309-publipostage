// index.ts
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { writeFileSync } from 'fs'

// === Données de la révision de loyer ===
const nomLocataire = 'Jean Dupont'
const adresseLocation = '12 rue de la Paix, 75001 Paris'
const dateRevision = '1er mai 2025'
const loyerActuel = 750
const nouveauLoyer = 780

// === Contenu du document ===
const doc = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Notification de révision de loyer',
              bold: true,
              size: 32
            })
          ]
        }),
        new Paragraph({ text: '' }),
        new Paragraph(`À l'attention de : ${nomLocataire}`),
        new Paragraph(`Adresse du logement : ${adresseLocation}`),
        new Paragraph({ text: '' }),
        new Paragraph(
          `Conformément aux dispositions du bail, nous vous informons que le loyer sera révisé à compter du ${dateRevision}.`
        ),
        new Paragraph(
          `Le loyer mensuel passera de ${loyerActuel} € à ${nouveauLoyer} € par mois.`
        ),
        new Paragraph({ text: '' }),
        new Paragraph(
          "Cette révision respecte l'indice de référence des loyers (IRL) en vigueur."
        ),
        new Paragraph({ text: '' }),
        new Paragraph(
          "Veuillez agréer, Madame, Monsieur, l'expression de nos salutations distinguées."
        )
      ]
    }
  ]
})

// === Génération du fichier .docx ===
Packer.toBuffer(doc).then((buffer) => {
  writeFileSync('revision-loyer.docx', buffer)
  console.log("✅ Fichier 'revision-loyer.docx' généré avec succès !")
})
