const axios = require('axios')
const cheerio = require('cheerio')
const json2xls = require('json2xls')
const fs = require('fs')

const scrapeData = async () => {
    try {
        const url = 'https://pipp.kkp.go.id/Ct_harga/produksiharga/#'
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        const data = []

        $('tr').each((index, element) => {
            const tds = $(element).find('td')
            if (tds.length > 0) {
                const location = $(tds[0]).text().trim()
                const description = $(tds[1]).text().trim()
                const value = $(tds[2]).text().trim()

                data.push({ location, description, value })
            }
        })

        return data
    } catch (error) {
        console.error('Error scraping data:', error)
        return []
    }
}

const exportToExcel = (data) => {
    const xls = json2xls(data)
    const filename = 'scraped_data2.xlsx' // Output Excel file name
    fs.writeFileSync(filename, xls, 'binary')
    console.warn(`Data exported to ${filename}`)
}

const main = async () => {
    const scrapedData = await scrapeData()
    exportToExcel(scrapedData)
}

main()
