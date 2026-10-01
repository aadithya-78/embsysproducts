import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { strFromU8, unzipSync } from 'fflate'
import { totalProductCount, totalSheetCount, workbooks } from '../src/data/catalog.js'

for (const workbook of workbooks) {
  const archive = unzipSync(new Uint8Array(readFileSync(resolve('public/data', workbook.file))))
  const workbookXml = strFromU8(archive['xl/workbook.xml'])

  workbook.sheets.forEach((sheet, index) => {
    const encodedName = sheet.name.replaceAll('&', '&amp;')
    if (!workbookXml.includes(`sheet name="${encodedName}"`)) {
      throw new Error(`${workbook.file} is missing the ${sheet.name} worksheet`)
    }
    if (!archive[`xl/worksheets/sheet${index + 1}.xml`]) {
      throw new Error(`${workbook.file} is missing worksheet data for ${sheet.name}`)
    }
  })

  const productCount = workbook.sheets.reduce((total, sheet) => total + sheet.products.length, 0)
  console.log(`${workbook.file}: ${workbook.sheets.length} sheets, ${productCount} product rows`)
}

console.log(`Validated ${workbooks.length} workbooks, ${totalSheetCount} sheets and ${totalProductCount} products.`)
