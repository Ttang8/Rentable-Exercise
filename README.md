## Install Instructions

```html
git clone https://github.com/Ttang8/Rentable-Exercise.git
cd Rentable-Exercise
npm install
```
## Run

```html
node fetch.js
```

## Output

Output displayed in terminal.

Example output in terminal:
```html
Properties [
  {
    property_id: '2222',
    name: 'ABODO',
    email: 'leads@abodo.com',
    floorplans: [
      { name: 'Tahoe', bedrooms: '3.0' },
      { name: 'Upgraded Tahoe', bedrooms: '3.0' }
    ]
  },
  {
    property_id: '1111',
    name: 'ABODO',
    email: 'leads@abodo.com',
    floorplans: [
      { name: 'Tahoe', bedrooms: '3.0' },
      { name: 'Upgraded Tahoe', bedrooms: '3.0' }
    ]
  },
  {
    property_id: '1111',
    name: 'ABODO',
    email: 'leads@abodo.com',
    floorplans: [
      { name: 'Tahoe', bedrooms: '3.0' },
      { name: 'Upgraded Tahoe', bedrooms: '3.0' }
    ]
  }
]
runtime:  1807 ms
```

## Npms used

- xml2json

## Parts done
### Main
- Parse and map an XML file to an expected output given the format.

### Extra
- Parse out the number of bedrooms. Displayed in property objects as array of floorplans. Each floorplan has name and bedrooms.

- Generate statistics on how the run performed. Displayed in terminal as runtime