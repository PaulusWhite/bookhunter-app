import { createContext } from "react";

let CustomTextContext = createContext();

let textContent = {
    mainPage: {
        preview: {
            topFive: [
                {
                    id:1001,
                    title: "Top five books about love",
                    img: "romeoJuliet.webp",
                },
                {
                    id:1002,
                    title: "Top five books about motivation",
                    img: "growRich.webp",
                },
                {
                    id:1003,
                    title: "Top five books about psychology",
                    img: "cialdini.webp",
                }      
            ],
        },
        specialBook: {
            title: "Crossroads",
            author: "Jonathan Franzen",
            description: `Download the first chapter of Jonathan Franzen's next novel, Crossroads. It’s December 23, 1971, and heavy weather is forecast for Chicago. Russ Hildebrandt, the associate pastor of a liberal suburban church, is on the brink of breaking free of a marriage he finds joyless—unless his wife, Marion, who has her own secret life, beats him to it.
                        Their eldest child, Clem, is coming home from college on fire with moral absolutism, having taken an action that will shatter his father. Clem’s sister, Becky, long the social queen of her high-school class, has sharply veered into the counterculture, while their brilliant younger brother Perry, who’s been selling drugs to seventh graders, has resolved to be a better person.
                        Each of the Hildebrandts seeks a freedom that each of the others threatens to complicate. Jonathan Franzen’s novels are celebrated for their unforgettably vivid characters and for their keen-eyed take on contemporary America. Now, in Crossroads, Franzen ventures back into the past and explores the history of two generations.
                        With characteristic humor and complexity, and with even greater warmth, he conjures a world that resonates powerfully with our own. A tour de force of interwoven perspectives and sustained suspense, its action largely unfolding on a single winter day, Crossroads is the story of a Midwestern family at a pivotal moment of moral crisis.
                        Jonathan Franzen’s gift for melding the small picture and the big picture has never been more dazzlingly evident.`,
            id: "X1YIEAAAQBAJ",
        },
    },
    
    compilations: [
        {
            id:1001,
            title: "Top five books about love",
            description: "",
            img: "romeoJuliet.webp",
        },
        {
            id:1002,
            title: "Top five books about motivation",
            description: "",
            img: "growRich.webp",
        },
        {
            id:1003,
            title: "Top five books about psychology",
            description: "",
            img: "cialdini.webp",
        },
        {
            id:1004,
            title: "Ten book which everyone has to read",
            description: "",
            img: "1984.webp",
        },
        {
            id:1005,
            title: "Ten books to read with your child at bedtime",
            description: "",
            img: "littlePrince.webp",
        },
        {
            id:1006,
            title: "Ten books which every woman should read",
            description: "",
            img: "handmaidsTale.webp",
        }
    ]
}

let CustomTextContextProvide = ({children}) => {
    return <CustomTextContext.Provider value={textContent}>
        {children}
    </CustomTextContext.Provider>
}

export { CustomTextContext, CustomTextContextProvide }