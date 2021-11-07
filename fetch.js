const http = require('http')
const xmlParser = require('xml2json')
const util = require('util')

let url = 'http://s3.amazonaws.com/abodo-misc/sample_abodo_feed.xml'

let properties = []

let runTime = 0

let filterLocations = ['Madison']

function xmlToJson(url) {
    let req = new Promise((resolve,reject) => {
        http.get(url, (res) => {
            let xml = '';

            res.on('data', (chunk) => {
                xml += chunk
            })

            res.on('error', (e) => {
                reject(e)
            });

            res.on('end', () => {
                let jsonData = JSON.parse(xmlParser.toJson(xml));
                resolve(jsonData)
            })
        }
    )})
    return req
}

async function fetchProperties(filter = []) {
    try {
        let startTime = new Date().getTime()
        let data = await xmlToJson(url)
        let allProperties = data['PhysicalProperty']['Property'];

        for (const key in allProperties) {
            // let latitude = allProperties[key]['ILS_Identification']['Latitude']
            // let longitude = allProperties[key]['ILS_Identification']['Longitude']

            let prop = {
                property_id: allProperties[key]['PropertyID']['Identification']['IDValue'],
                name: allProperties[key]['PropertyID']['MarketingName'],
                email: allProperties[key]['PropertyID']['Email'],
            }
            prop['floorplans'] = createFloorPlans(allProperties[key]['Floorplan'])

            if (filter.length > 0) {
                filter.forEach( loc => {
                    let location = allProperties[key]['PropertyID']['Address']['City']
                    if (location === loc) {
                        properties.push(prop)
                    }
                })
            } else {
                properties.push(prop)
            }
        }

        let endTime = new Date().getTime()
        runTime = endTime - startTime
        return properties

    } catch (error) {
        console.log(error);
    }
}

function createFloorPlans(obj) {
    let floorplans = []
    if (Array.isArray(obj)) {
        obj.forEach(fp => {
            let floorplan = {
                name: fp['Name'],
            }
            fp['Room'].forEach(room => {
                if (room['RoomType'] === 'Bedroom') {
                    floorplan['bedrooms'] = room['Count']
                }
            })
            floorplans.push(floorplan)
        })
    } else {
        let floorplan = {
            name: obj['Name']
        }
        obj['Room'].forEach(room => {
            if (room['RoomType'] === 'Bedroom') {
                floorplan['bedrooms'] = room['Count']
            }
        })
        floorplans.push(floorplan)
    }
    return floorplans
}

async function run() {
    let result = await fetchProperties(filterLocations)
    console.log('Properties', util.inspect(result, false, null, true))
    console.log('runtime: ',runTime, 'ms');
}

run()

module.exports = {
  fetchProperties
}