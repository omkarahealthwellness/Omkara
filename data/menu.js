const menuData = [
    {
        id: "sprouts",
        title: "🌱 SPROUTED GOODNESS",
        theme: "sprouts",
        heroHeadline: "SPROUTED GOODNESS",
        heroSubheading: "Fresh. Simple. Naturally satisfying.",
        items: [
            {
                id: "spr_moong",
                name: "Moong Sprouts",
                description: "Fresh, crunchy sprouted moong with a hint of lemon and chaat masala.",
                ingredients: ["Moong Sprouts", "Lemon", "Chaat Masala"],
                available: true,
                image: "images/moong-sprout.png",
                sizes: [{ name: "Small", price: 49 }, { name: "Medium", price: 69 }, { name: "Large", price: 99 }]
            },
            {
                id: "spr_chana",
                name: "Chana Sprouts",
                description: "Power-packed black chana sprouts tossed with fresh herbs.",
                ingredients: ["Chana Sprouts", "Coriander", "Lemon"],
                available: true,
                image: "images/chana-sprout.png",
                sizes: [{ name: "Small", price: 49 }, { name: "Medium", price: 69 }, { name: "Large", price: 99 }]
            },
            {
                id: "spr_mixed",
                name: "Mixed Sprouts",
                description: "The ultimate healthy mix of moong and chana sprouts.",
                ingredients: ["Moong", "Chana", "Cucumber"],
                available: true,
                image: "images/mixed-sprout.png",
                sizes: [{ name: "Small", price: 49 }, { name: "Medium", price: 69 }, { name: "Large", price: 99 }]
            },
            { name: "Urad Sprouts", available: false },
            { name: "Soyabean Sprouts", available: false }
        ]
    },
    {
        id: "fruits",
        title: "🍎 FRESH FRUIT BOWLS",
        theme: "fruits",
        heroHeadline: "FRESH FRUIT BOWLS",
        heroSubheading: "A little colour for your day.",
        items: [
            {
                id: "frt_mixed",
                name: "Mixed Fruit Salad",
                description: "A colourful mix of fresh seasonal fruits, freshly cut and served chilled.",
                ingredients: ["Seasonal Fruits"],
                available: true,
                image: "images/mixed-fruit-bowl.png",
                sizes: [{ name: "Small", price: 49 }, { name: "Medium", price: 69 }, { name: "Large", price: 99 }]
            },
            {
                name: "Tropical Citrus Bowl",
                available: false
            },
            {
                name: "Watermelon Mint Refresher",
                available: false
            },
            {
                name: "Berry & Banana Salad",
                available: false
            }
        ]
    },
    {
        id: "juices",
        title: "🧃 FRESH PRESSED",
        theme: "juices",
        heroHeadline: "FRESH PRESSED",
        heroSubheading: "Sunlight in a glass.",
        items: [
            { name: "Orange Juice", available: false },
            { name: "Watermelon Juice", available: false },
            { name: "Pineapple Juice", available: false },
            { name: "Seasonal Fresh Juice", available: false }
        ]
    },
    {
        id: "shakes",
        title: "🥤 SHAKES & BLENDS",
        theme: "shakes",
        heroHeadline: "SHAKES & BLENDS",
        heroSubheading: "Thick. Fresh. Seriously satisfying.",
        items: [
            { name: "Mango Shake", available: false },
            { name: "Banana Shake", available: false },
            { name: "Dry Fruit Shake", available: false },
            { name: "Chocolate Shake", available: false }
        ]
    },
    {
        id: "protein",
        title: "💪 PROTEIN SHAKES",
        theme: "protein",
        heroHeadline: "PROTEIN SHAKES",
        heroSubheading: "More protein. More purpose.",
        items: [
            { name: "Peanut Butter Protein Shake", available: false },
            { name: "Chocolate Protein Shake", available: false },
            { name: "Banana Protein Shake", available: false },
            { name: "Mixed Fruit Protein Shake", available: false },
        ]
    },
    {
        id: "smoothies",
        title: "🥝 SMOOTHIE LAB",
        theme: "smoothies",
        heroHeadline: "SMOOTHIE LAB",
        heroSubheading: "Blend something beautiful.",
        items: [
            { name: "Green Smoothie", available: false },
            { name: "Berry Smoothie", available: false },
            { name: "Mixed Fruit Smoothie", available: false },
            { name: "Tropical Smoothie", available: false }
        ]
    },
    {
        id: "bowls",
        title: "🥣 POWER BOWLS",
        theme: "bowls",
        heroHeadline: "POWER BOWLS",
        heroSubheading: "Big bowl. Good energy.",
        items: [
            { name: "Protein Bowl", available: false },
            { name: "Fruit & Yogurt Bowl", available: false },
            { name: "Exotic Fruit Bowl", available: false },
            { name: "Granola Bowl", available: false }
        ]
    },
    {
        id: "oats",
        title: "🌾 OATS & BREAKFAST",
        theme: "oats",
        heroHeadline: "OATS & BREAKFAST",
        heroSubheading: "Start fresh. Start strong.",
        items: [
            { name: "Overnight Oats", available: false },
            { name: "Fruit & Oats", available: false },
            { name: "Masala Vegie Oats", available: false },
            { name: "Peanut Butter Oats", available: false }
        ]
    },
    {
        id: "snacks",
        title: "🥜 HIGH-PROTEIN BITES",
        theme: "snacks",
        heroHeadline: "HIGH-PROTEIN BITES",
        heroSubheading: "Small bites. Serious goodness.",
        items: [
            { name: "Protein Laddoo", available: false },
            { name: "Dry Fruit Protein Laddoo", available: false },
            { name: "Peanut Energy Bites", available: false },
            { name: "Seed & Nut Bars", available: false }
        ]
    },
    {
        id: "chaat",
        title: "🥗 HEALTHY CHAAT",
        theme: "chaat",
        heroHeadline: "HEALTHY CHAAT & SAVOURY",
        heroSubheading: "Desi Swaad. Naya Andaaz.",
        items: [
            { name: "Sprout Chaat", available: false },
            { name: "Fruit Chaat", available: false },
            { name: "Healthy Bhel", available: false },
            { name: "Dry Fruit Bhel", available: false }
        ]
    },
    {
        id: "wellness",
        title: "🍵 WELLNESS SIPS",
        theme: "wellness",
        heroHeadline: "WELLNESS SIPS",
        heroSubheading: "Slow down. Sip well.",
        items: [
            { name: "Lemon Mint", available: false },
            { name: "Ginger Lemon", available: false },
            { name: "Amla Drink", available: false },
            { name: "Green Tea", available: false }
        ]
    },
    {
        id: "combos",
        title: "🧺 OMKARA COMBOS",
        theme: "combos",
        heroHeadline: "OMKARA COMBOS",
        heroSubheading: "A little bit of everything good.",
        items: [
            { name: "Morning Fresh", available: false },
            { name: "Power Start", available: false }
        ]
    }
];

window.OMKARA_MENU = menuData;
