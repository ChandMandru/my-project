const rooms = [
    {
      name: "Basic Room",
      beds: [
        {
          forChildren: false,
          doubleBed: true,
        },
        {
          forChildren: true,
          doubleBed: false,
        },
      ],
      price: 100,
      amount: 4,
    },
    {
      name: "Large Room",
      beds: [
        {
          forChildren: false,
          doubleBed: true,
        },
        {
          forChildren: false,
          doubleBed: true,
        },
        {
          forChildren: true,
          doubleBed: false,
        },
        {
          forChildren: true,
          doubleBed: false,
        },
      ],
      price: 170,
      amount: 6,
    },
    {
      name: "Suite",
      beds: [
        {
          forChildren: false,
          doubleBed: true,
        },
        {
          forChildren: false,
          doubleBed: true,
        },
        {
          forChildren: false,
          doubleBed: false,
        },
        {
          forChildren: false,
          doubleBed: false,
        },
        {
          forChildren: true,
          doubleBed: true,
        },
        {
          forChildren: true,
          doubleBed: false,
        },
      ],
      price: 350,
      amount: 2,
    },
  ];
  

export default rooms;  