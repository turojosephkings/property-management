export const HOUSES = [
    {
        id: 0,
        address: "1000 Golden Girl Lane",
        image: "/assets/images/1000-golden-girl-ln.jpg",
        sqft: 2304,
        bathrooms: 3,
        bedrooms: 5,
        owner: 'Kari Katuristika',
        status: 'For Sale',
        rooms: [
          {
            roomType: 'bedroom',
            roomName: 'Master Bedroom',
            powerOutlets: 4,
            windows: 2,
            carpet: 'Good Condition',
            lightFixtures: 2,
            cableOutlet: false,
            phoneLine: false,
            doors: 2,
            slideDoors: false,
            closet: true
          }, {
            roomType: 'bathroom',
            roomName: 'Master Bathroom',
            powerOutlets: 2,
            windows: 0,
            lightFixtures: 2,
            cableOutlet: false,
            phoneLine: false,
            doors: 1,
            slideDoors: false,
            closet: false,
            sink: {
              condition: 'good',
              maintenance: 'not scheduled'
            },
            toilet: {
              condition: 'good',
              maintenance: 'not scheduled'
            },
            shower: {
              type: 'Jet Hot tub',
              condition: 'good',
              maintenance: 'not scheduled'
            },
          },
          {
            roomType: 'kitchen',
            roomName: 'Kitchen',
            powerOutlets: 6,
            windows: 1,
            carpet: '',
            lightFixtures: 3,
            cableOutlet: false,
            phoneLine: true,
            doors: 2,
            slideDoors: false,
            closet: false,
            sink: {
              condition: 'good',
              maintenance: 'not scheduled'
            },
            stove: {
              condition: 'good',
              maintenance: 'not scheduled',
              powered: '220v'
            },
            fridge: {
              condition: 'good',
              maintenance: 'not scheduled'
            },
            cabinets: {
              condition: 'good',
              maintenance: 'not scheduled'
            },
            microwave: {
              condition: 'good',
              maintenance: 'not scheduled'
            },
            extractor: {
              condition: 'good',
              maintenance: 'not scheduled'
            },
            sinkProcessor: {
              condition: 'good',
              maintenance: 'not scheduled'
            },
          },
          {
          roomType: 'garage',
          roomName: 'Garage',
          places: 3,
          powerOutlets: 6,
          windows: 1,
          lightFixtures: 3,
          doors: 2,
          closet: true,
          garageDoor: {
            condition: 'good',
            maintenance: 'not scheduled'
          },
          garageDoorMotor: {
            condition: 'good',
            maintenance: 'not scheduled'
          }
          }
        ]
    },

];


{/*
house {
    id: 0,
        address: "1000 Golden Girl Lane",
        image: "/assets/images/1000-golden-girl-ln.jpg",
        sqft: 2304,
        bathrooms: 3,
        bedrooms: 5,
        owner: 'Kari Katuristika',
        status: 'For Sale'
}

*/}
