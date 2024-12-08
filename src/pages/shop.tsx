import { Armor } from '@/_common/interfaces/Armor';
import { Artifact } from '@/_common/interfaces/Artifact';
import { Boot } from '@/_common/interfaces/Boot';
import { Helmet } from '@/_common/interfaces/Helmet';
import { Ingredient } from '@/_common/interfaces/Ingredient';
import { Modifier } from '@/_common/interfaces/Modifier';
import { Player } from '@/_common/interfaces/Player';
import { Ring } from '@/_common/interfaces/Ring';
import { Shield } from '@/_common/interfaces/Shield';
import { Weapon } from '@/_common/interfaces/Weapon';
import Loading from '@/components/Loading';
import CollapseSidepanelButton from '@/components/shop/CollapseSidepanelButton';
import LeftContainer from '@/components/shop/LeftContainer';
import MainContainer from '@/components/shop/MainContainer';
import MainHeader from '@/components/shop/MainHeader';
import MidContainer from '@/components/shop/MidContainer';
import RightContainer from '@/components/shop/RightContainer';
import ShopContainer from '@/components/shop/ShopContainer';
import ShopHeader from '@/components/shop/ShopHeader';
import { calculateAllAttributes } from '@/helpers/PlayerAttributes';
import ShopOptionsHeader from '@/components/shop/ShopOptionsHeader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RightSidePanel from '@/components/shop/RightSidePanelComponent';
import { fetchCategory } from '@/pages/api/shop/helpers/fetchCategory';
import { filterCategoryData } from '@/helpers/filterCategoryData';
import { fetchPlayerData } from './api/shop/helpers/fetchPlayerData';

interface Equipment {
    helmet: Helmet,
    weapon: Weapon,
    armor: Armor,
    shield: Shield,
    artifact: Artifact,
    boot: Boot,
    ring: Ring,
}
type Product = Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield;


export default function Shop() {
    const router = useRouter();
    const { data: session } = useSession();
    const [player, setPlayer] = useState<Player>();
    const [loading, setLoading] = useState(true);
    const [currentEquipment, setCurrentEquipment] = useState({});
    const [playerEquipment, setPlayerEquipment] = useState<Equipment>();
    const [error, setError] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [armors, setArmors] = useState<Armor[]>([]);
    const [boots, setBoots] = useState<Boot[]>([]);
    const [helmets, setHelmets] = useState<Helmet[]>([]);
    const [rings, setRings] = useState<Ring[]>([]);
    const [shields, setShields] = useState<Shield[]>([]);
    const [artifacts, setArtifacts] = useState<Artifact[]>([]);
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [inventory, setInventory] = useState<Ingredient[] | Armor[] | Boot[] | Helmet[] | Ring[] | Shield[] | Artifact[] | Weapon[]>();
    const [currentAttributes, setCurrentAttributes] = useState<Modifier>();
    const [displayProducts, setDisplayProducts] = useState<Ingredient[] | Armor[] | Boot[] | Helmet[] | Ring[] | Shield[] | Artifact[] | Weapon[]>(weapons);
    const [currentDisplay, setCurrentDisplay] = useState<Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | null>(null);
    const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
    const [cart, setCart] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [displayBuyButtons, setDisplayBuyButtons] = useState(true);
    const [shopCategory, setShopCategory] = useState<string>('weapon');


    const handleRemoveFromCart = (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient) => {
        console.log('arriving to cart removal button')
        let newCart = [...cart]
        newCart = newCart.filter((item) => item.name !== product.name)
        setCart(newCart);
    };

    const buy = async (products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[], isInCart: boolean) => {
        try {
            const res = await fetch(`/api/shop/buy`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    email: player?.email,
                    products: products,
                }),
            });

            if (res.status === 200) {
                const response = await res.json();
                setInventory(setInventoryItems(response));
                setPlayer(response);
                isInCart ? onClearCart() : null;
                console.log('Purchase complete: ', response);
            } else if (res.status === 400) {
                const response = await res.json();
                setPlayer(response.player);
                console.log(response.error);
            } else if (res.status === 409) {
                const response = await res.json();
                setPlayer(response.player);
                console.log(response.error);
            } else if (res.status === 404) {
                const response = await res.json();
                console.log(response.error);
            } else {
                console.log('Error in the purchase: ', error);
            }
        } catch (error) {
            console.log('Error in the purchase: ', error);
        }
    };

    const sell = async (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient) => {
        try {
            const res = await fetch(`/api/shop/sell`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    email: player?.email,
                    product: product,
                }),
            });
            
            if (res.status === 200) {
                const response = await res.json();
                setInventory(setInventoryItems(response));
                setPlayer(response);
                console.log('Sell complete: ', response);                     
            } else if (res.status === 404) {
                const response = await res.json();
                console.log(response.error);
            } else {
                console.log('Error in the Sell: ', error);
            }
        } catch (error) {
            console.log('Error in the Sell: ', error);
        }
    };

    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const onClearCart = () => {
        setCart([]);
    };

    const handleQuantityChange = (value: number) => {
        setQuantity(value);
    };

    const setInventoryItems = (player: Player) => {
        const products: Ingredient[] | Armor[] | Boot[] | Helmet[] | Ring[] | Shield[] | Artifact[] | Weapon[] = [];

        Object.values(player?.inventory).map((productTypes) => {
            productTypes.map((product) => {
                products.push(product);
            });
        });

        return products;
    };

    const toggleRightPanel = () => setIsRightPanelOpen((prev) => !prev);

    useEffect(() => {
        if (session?.user?.email) {
            const handlePlayerFetch = async () => {
                const response = await fetchPlayerData(session.user?.email)
                const equipment = {
                    helmet: response.equipment.helmet,
                    weapon: response.equipment.weapon,
                    armor: response.equipment.armor,
                    shield: response.equipment.shield,
                    artifact: response.equipment.artifact,
                    boot: response.equipment.boot,
                    ring: response.equipment.ring,
                }

                setCurrentEquipment(response.equipment);

                setPlayerEquipment(equipment)

                setPlayer(response);
                setInventory(setInventoryItems(response));
            };

            //If there is not cached data it will fetch the requested category and save it in the local storage
            const handleCategoryFetch = async (categoryName: string, setMethod: (element: []) => void) => {
                const cachedData = sessionStorage.getItem(categoryName);
                if (!cachedData) {
                    const response = await fetchCategory(categoryName)

                    const result = filterCategoryData(response)
                    console.log(categoryName, ' after filtering:', result)

                    setMethod(result);

                    console.log(`Saving ${categoryName} data in local storage.`)
                    sessionStorage.setItem(categoryName, JSON.stringify(result));
                } else {
                    const parsedData = JSON.parse(cachedData!)
                    console.log(`Data of ${categoryName} found in Local Storage: `, parsedData);

                    setMethod(parsedData);
                }
            };

            const handleFetches = async () => {
                try {
                    setLoading(true);
                    await handleCategoryFetch('ingredients', setIngredients);
                    await handleCategoryFetch('armors', setArmors);
                    await handleCategoryFetch('boots', setBoots);
                    await handleCategoryFetch('helmets', setHelmets);
                    await handleCategoryFetch('rings', setRings);
                    await handleCategoryFetch('shields', setShields);
                    await handleCategoryFetch('artifacts', setArtifacts);
                    await handleCategoryFetch('weapons', setWeapons);
                    await handlePlayerFetch();
                } catch (error) {
                    console.error('An error ocurred fetching the data: ', error);
                } finally {
                    setLoading(false);
                    console.log('Loading Complete');
                }
            }

            handleFetches()
        }
    }, [session]);

    useEffect(() => {
        if (player) calculateAllAttributes(player, setCurrentAttributes);
    }, [player]);

    useEffect(() => {
        setCurrentDisplay(displayProducts[0]);
    }, [displayProducts]);

    useEffect(() => {
        setCurrentDisplay(weapons[0])
    }, [weapons]);

    useEffect(() => {
        if (shopCategory === 'inventory') setDisplayProducts(inventory!);
    }, [inventory]);

    const displaySelectedShopProducts = (category: string) => {
        switch (category) {

            case 'weapon':
                setShopCategory(category);
                setDisplayProducts(weapons);
                break;
            case 'shield':
                setShopCategory(category);
                setDisplayProducts(shields);
                break;
            case 'helmet':
                setShopCategory(category);
                setDisplayProducts(helmets);
                break;
            case 'armor':
                setShopCategory(category);
                setDisplayProducts(armors);
                break;
            case 'boot':
                setShopCategory(category);
                setDisplayProducts(boots);
                break;
            case 'ring':
                setShopCategory(category);
                setDisplayProducts(rings);
                break;
            case 'artifact':
                setShopCategory(category);
                setDisplayProducts(artifacts);
                break;
            case 'ingredient':
                setShopCategory(category);
                setDisplayProducts(ingredients);
                break;
            case 'inventory':
                setShopCategory(category);
                setDisplayProducts(inventory!);
                break;
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <ShopContainer>
            <ShopHeader>
                <MainHeader/>
                <ShopOptionsHeader buttonDisplayHandler={setDisplayBuyButtons} displaySelectedShopProducts={displaySelectedShopProducts} togglePanel={toggleRightPanel}/>
            </ShopHeader>
            <MainContainer>
                <CollapseSidepanelButton direction='right' executeFunction={(() => { })}/>
                <LeftContainer currentAttributes={currentAttributes!} currentEquipment={playerEquipment!} product={currentDisplay!}/>
                <MidContainer displayBuyButtons={displayBuyButtons} product={currentDisplay} onBuy={buy} onSell={sell} onAddToCart={addToCart} player={player!} quantity={quantity} handleQuantityChange={handleQuantityChange}/>
                <RightContainer products={displayProducts} category={shopCategory} onProductSelect={setCurrentDisplay} player={player!}/>
                <RightSidePanel isOpen={isRightPanelOpen} togglePanel={toggleRightPanel} cart={cart} onRemoveFromCart={handleRemoveFromCart} onBuy={buy} onClearCart={onClearCart} player={player} quantity={quantity} handleQuantityChange={handleQuantityChange}/>
            </MainContainer>
        </ShopContainer>
    );
}