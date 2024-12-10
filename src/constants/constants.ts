export const GRID_NUMBER = 64;
export const EXP_POINTS = 1750;
export const LOCAL_BASE_URL = "localhost:3000"
export const ACOLYTE_EMAIL = "@ikasle.aeg.eus"
export const MENTOR_EMAIL = "@aeg.eus"
export const SERVER_URL = "https://kaotika-server.fly.dev"

export const PROGRESS_LABEL = "text-darkSepia tracking-wider text-2xl"
export const PROGRESS_VALUE = "text-2xl text-medievalSepia/100"

export const CHARISMA = "charisma"
export const CONSTITUTION = "constitution"
export const DEXTERITY = "dexterity"
export const INSANITY = "insanity"
export const INTELLIGENCE = "intelligence"
export const STRENGTH = "strength"

export const PRODUCT_CART = {
    mainContainer: "flex h-[53%] w-[90%] row-span-3 row-start-8 place-items-center justify-center mt-[3%] ml-[5%] bg-contain bg-center bg-no-repeat",
    imgContainer: "flex w-[35%] justify-center place-items-center h-[90%]  bg-contain bg-center bg-no-repeat bg-[url('/images/shop/product_image_container.webp')]",
    productImg: 'w-[40%]',
    infoContainer: 'w-[30%] h-[90%] place-items-center text-center justify-content-start space-y-[6%] inline-block',
    name: "h-[30%]  ml-[5%] self-center w-[90%] text-2xl text-white",
    requirementsContainer: "w-[100%] flex place-items-center mb-[2%]",
    goldContainer: "w-[50%] flex  justify-content-start mr-[5%]",
    levelContainer: "justify-end flex space-x-[50%] inline-row",
    levelRequirement: "text-xl w-[2%] text-white",
    levelValue: "text-4xl pr-[12%]"
}
export const PRODUCT_SHOP = {
    mainContainer: `h-[41.5%] row-span-3 row-start-8 flex mt-[3%] bg-contain bg-no-repeat transform transition-transform duration-300 hover:scale-105 cursor-pointer`,
    imgContainer: "flex justify-center place-items-center place-items-center mt-[2.8%] w-[90%] h-[90%] ml-[2%] bg-contain bg-no-repeat bg-[url('/images/shop/product_image_container.webp')]",
    productImg: "place-items-center self-center pb-[3%] w-[32%]",
    infoContainer: "text-center content-center ml-[2%] w-[80%] space-y-[7%] inline-block",
    name: "text-2xl text-white mr-[15%]",
    requirementsContainer: "",
    goldContainer: 'w-[50%] ml-[25%] align-center',
    levelContainer: 'justify-center flex space-x-[15%] inline-row',
    levelRequirement: 'text-xl w-[20%] text-white',
    levelValue: 'text-4xl self-center'
}

export const MERCHANT_MESSAGES = {
    removeItem: ['Better you add more products to that cart!', ],
    removeAllItems:['Time to fill that cart once again!',], //Not implemented
    buyItem:['Please come again!', 'Thanks for your coins... Idiot...'],
    buyAllItems:['buyAllItems1', 'buyAllItems2'], //Not implemented
    sellItem:["It's a pleasure to make deals with you. Please come again.", "Next time, try offering me more valuable items", "Don't you have any unique item for me?"],
    equipmentShop:['Best gear you will ever find', 'We do not sell uniques to your kind do not be absurd.'],
    MagicShop:['Best ingredients that you will ever find', "Someone once told me, there's a tower with special ingredients which cannot be find elsewhere... Never saw him again" ],
    addToCart:["You won't regret it", 'The cart feels lonely... add more products... NOW!!!'],
    inssufficientMoney:['Not Enough Money', 'HAHAHAHA Are You Poor? Because You can not afford that!'], //Not implemented
    alreadyInCart: ['You have that equipment already added to the cart.', 'Are you blind? You can not add this again!'],//Not implemented
    selectNewProduct: ['That fits you well... You Should buy it.', 'It is like if you were stealing me with that price. Do a favor to yourself and buy it.'],
    selectNewSellProduct: ['You better not show me garbage.', "You don't want that? I'll buy it.", 'Are you trying to scam me? Better not...'],
    changeShopTab: ['Perhaps this is more of your liking.', 'If you look it... YOU BUY IT!'],
    loading: ['PLEASE WAIT IM THINKING', "I'm counting the coins please wait a moment."],
    errorTransaction:['Something happened while making our deal. Please try again.'],
    buyTab:["Don't waste my time and buy something already!"],
    sellTab:['You looking to sell some of your items? You came to the right spot!', "Someone told you that I buy to low prices? Tell me their names so you won't hear them again... hehehe"]
}
