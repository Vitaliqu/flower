import one from "../public/1.png";
import two from "../public/2.png";
import three from "../public/3.png";
import four from "../public/4.png";
import five from "../public/5.png";
import six from "../public/6.png";

export const flowers_category = [
    {id: 1, name: "Магнолії", image: one, new: false, popular: true},
    {id: 2, name: "Штамбові авойні рослини", image: six, new: false, popular: true},
    {id: 3, name: "Ялина - Picea", image: two, new: true, popular: true},
    {id: 4, name: "Ялиці - Abies", image: three, new: true, popular: true},
    {id: 5, name: "Листяні кущі", image: four, new: false, popular: false},
    {id: 6, name: "Японські клени", image: five, new: false, popular: false}
]
export const flowers = [
    {
        id: 1,
        name: "Квітка Амаріліс",
        category: "Магнолії",
        image: one,
        new: false,
        popular: true,
        description: "Магнолія Роуз Марі - це наша гордість і найбільше вираження краси та елегантності у світі квітів.",
        price: 45320.23,
        quantity: 1
    },
    {
        id: 2,
        name: "Ялівець",
        category: "Ялина - Picea",
        image: two,
        new: true,
        popular: true,
        description: "Це дерево відрізняється величезною тривалістю життя, може жити до 2000 років.",
        price: 12460,
        quantity: 1
    },
    {
        id: 3,
        name: "Ялина Західна",
        category: "Ялиці - Abies",
        image: three,
        new: true,
        popular: true,
        description: "Це дерево відрізняється своєю голкою, яка має неймовірну м'якість і приємний аромат.",
        price: 8540,
        quantity: 1
    },
    {
        id: 4,
        name: "Рододендрон",
        category: "Листяні кущі",
        image: four,
        new: false,
        popular: false,
        description: "Рододендрони - це красиві кущі з великою кількістю квітів різних кольорів.",
        price: 3320,
        quantity: 1
    },
    {
        id: 5,
        name: "Японська айва",
        category: "Японські клени",
        image: five,
        new: false,
        popular: false,
        description: "Японська айва - це дерево з неймовірною вишуканістю, його листя змінює колір від зеленого до яскраво червоного восени.",
        price: 6210,
        quantity: 1
    },
    {
        id: 6,
        name: "Каштан",
        category: "Штамбові авойні рослини",
        image: six,
        new: false,
        popular: true,
        description: "Каштан - це вічнозелений дерево, яке може рости до величезних розмірів.",
        price: 7100,
        quantity: 1
    },
    {
        id: 7,
        name: "Бузок",
        category: "Магнолії",
        image: one,
        new: true,
        popular: false,
        description: "Бузок - це квітка, яка символізує ніжність і чистоту.",
        price: 3200,
        quantity: 1
    },
    {
        id: 8,
        name: "Смерека",
        category: "Ялина - Picea",
        image: two,
        new: true,
        popular: true,
        description: "Смерека - дуже міцне дерево з ароматними голками.",
        price: 5400,
        quantity: 1
    },
    {
        id: 9,
        name: "Хвойник",
        category: "Ялиці - Abies",
        image: three,
        new: false,
        popular: true,
        description: "Хвойник - це декоративна рослина з яскраво-зеленими голками.",
        price: 4200,
        quantity: 1

    },
    {
        id: 10,
        name: "Лаванда",
        category: "Листяні кущі",
        image: four,
        new: true,
        popular: true,
        description: "Лаванда - це ароматна рослина з фіолетовими квітами.",
        price: 3800,
        quantity: 1
    },
    {
        id: 11,
        name: "Тюльпан",
        category: "Магнолії",
        image: one,
        new: false,
        popular: true,
        description: "Тюльпани - це весняні квіти з неймовірною палітрою кольорів.",
        price: 2500,
        quantity: 1
    },
    {
        id: 12,
        name: "Модрина",
        category: "Ялина - Picea",
        image: two,
        new: false,
        popular: false,
        description: "Модрина - це дерево з покривом з м'яких голок, що змінюють колір від зеленого до сріблястого.",
        price: 6800,
        quantity: 1
    },
    {
        id: 13,
        name: "Смерекова куща",
        category: "Ялиці - Abies",
        image: three,
        new: true,
        popular: true,
        description: "Смерекові кущі - це чудовий елемент для ландшафтного дизайну.",
        price: 4100,
        quantity: 1
    },
    {
        id: 14,
        name: "Береза",
        category: "Листяні кущі",
        image: four,
        new: true,
        popular: true,
        description: "Береза - символ природної краси і чистоти.",
        price: 2900,
        quantity: 1
    },
    {
        id: 15,
        name: "Магнолія Галіфакс",
        category: "Магнолії",
        image: one,
        new: false,
        popular: true,
        description: "Магнолія Галіфакс - це розкішний сорт магнолії з великими ароматними квітами.",
        price: 5200,
        quantity: 1
    },
    {
        id: 16,
        name: "Сосна",
        category: "Ялина - Picea",
        image: two,
        new: false,
        popular: false,
        description: "Сосна - дерево зі здатністю зберігати свій зелений колір протягом усього року.",
        price: 4700,
        quantity: 1
    },
    {
        id: 17,
        name: "Туя",
        category: "Ялиці - Abies",
        image: three,
        new: true,
        popular: true,
        description: "Туя - це декоративний кущ зі смолистими голками.",
        price: 3600,
        quantity: 1
    }]

