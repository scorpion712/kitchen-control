const data = {
    products: [
        {
            name: "Fideos Don Vicente 500g",
            category: "Cereales",
            units: [
                {
                    expiry_date: "26/03/2022",
                    admission_date: "20/08/2021",
                    amount: 20,
                },    
                {
                    expiry_date: "26/03/2022",
                    admission_date: "27/08/2021",
                    amount: 10,
                }, 
            ],   
            //days_off: 5,
        },
        {
            name: "Fideos Mostacholes 500g",
            category: "Cereales",
            units: [
                {
                    expiry_date: "22/04/2022",
                    admission_date: "20/08/2021",
                    amount: 30,
                },    
             ],    
            //days_off: 5,
        },
        {
            name: "Leche Entera",
            category: "Lacteos",
            units: [
                {
                    expiry_date: "12/01/2022",
                    admission_date: "20/08/2021",
                    amount: 24,
                },    
            ],    
            //days_off: 5,
        },
        {
            name: "Arroz",
            category: "Cereales",
            units: [
                {
                    expiry_date: "24/07/2022",
                    admission_date: "20/08/2021",
                    amount: 12,
                },    
     ],    
            //days_off: 5,
        },
        {
            name: "Yogurt",
            category: "Lacteos",
            units: [
                {
                    expiry_date: "06/10/2021",
                    admission_date: "20/08/2021",
                    amount: 40,
                },    
            ],    
            //days_off: 5,
        },
        {
            name: "Atun",
            category: "Enlatados",
            units: [
                {
                    expiry_date: "26/03/2022",
                    admission_date: "20/08/2021",
                    amount: 12,
                },    
            ],    
            //days_off: 5,
        },
        {
            name: "Lentejas",
            category: "Enlatados",
            units: [
                {
                    expiry_date: "16/02/2022",
                    admission_date: "20/08/2021",
                    amount: 5,
                },    
            ],    
            //days_off: 5,
        },
        {
            name: "Fideos Don Vicente 500g2",
            category: "Cereales",
            units: [
                {
                    expiry_date: "26/03/2022",
                    admission_date: "20/08/2021",
                    amount: 20,
                },    
                {
                    expiry_date: "26/03/2022",
                    admission_date: "27/08/2021",
                    amount: 10,
                }, 
            ],   
            //days_off: 5,
        },
        {
            name: "Fideos Mostacholes 500g2",
            category: "Cereales",
            units: [
                {
                    expiry_date: "22/04/2022",
                    admission_date: "20/08/2021",
                    amount: 30,
                },    
             ],    
            //days_off: 5,
        },
        {
            name: "Leche Entera2",
            category: "Lacteos",
            units: [
                {
                    expiry_date: "12/01/2022",
                    admission_date: "20/08/2021",
                    amount: 24,
                },    
            ],    
            //days_off: 5,
        },
        {
            name: "Arroz2",
            category: "Cereales",
            units: [
                {
                    expiry_date: "24/07/2022",
                    admission_date: "20/08/2021",
                    amount: 12,
                },    
     ],    
            //days_off: 5,
        },
        {
            name: "Yogurt2",
            category: "Lacteos",
            units: [
                {
                    expiry_date: "06/10/2021",
                    admission_date: "20/08/2021",
                    amount: 40,
                },    
            ],    
            //days_off: 5,
        },
        {
            name: "Atun2",
            category: "Enlatados",
            units: [
                {
                    expiry_date: "26/03/2022",
                    admission_date: "20/08/2021",
                    amount: 12,
                },    
            ],    
            //days_off: 5,
        },
        {
            name: "Lentejas2",
            category: "Enlatados",
            units: [
                {
                    expiry_date: "16/02/2022",
                    admission_date: "20/08/2021",
                    amount: 5,
                },    
            ],    
            //days_off: 5,
        },
    ],
    takesout: [
        {
            week_start:  "09/08/2021",
            week_end: "15/08/2021",
            products: [{
                    name: "Leche",
                    expiry_date: "09/08/2021",
                    admission_date: "09/08/2021",
                    amount: 2,
                    retirement_date: "12/08/2021"
                },
                {
                    name: "Leche",
                    expiry_date: "09/08/2021",
                    admission_date: "01/08/2021",
                    amount: 3,
                    retirement_date: "13/08/2021"
                }
            ]
        },
        {
            week_start:  "16/08/2021",
            week_end: "22/08/2021",
            products: [{
                name: "Leche",
                expiry_date: "09/08/2021",
                admission_date: "09/08/2021",
                amount: 2,
                retirement_date: "21/08/2021"
                }, {
                    name: "Leche",
                    expiry_date: "09/08/2021",
                    admission_date: "09/08/2021",
                    amount: 3,
                    retirement_date: "22/08/2021"
                }
            ]
        },
    ]
}
module.exports = data;