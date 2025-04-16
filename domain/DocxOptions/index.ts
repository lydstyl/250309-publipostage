export type DocxOptions = {
  templatePath: string
  filtePath: string
  data: {
    [key: string]: string | number
  }
}
