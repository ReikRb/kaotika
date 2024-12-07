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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [displayBuyButtons, setDisplayBuyButtons] = useState(true);


    const handleRemoveFromCart = (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient) => {
        console.log('arriving to cart removal button')
        let newCart = [...cart]
        newCart = newCart.filter((item) => item.name !== product.name)
        setCart(newCart);
    };

    const buy = async (products: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[], isInCart: boolean) => {
        try {
            const res = await fetch(`/api/shop/buy`,{
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
            const res = await fetch(`/api/shop/sell`,{
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    email: player?.email,
                    products: product,
                }),
            });
            
            // if (res.status === 200) {
            //     const response = await res.json();
            //     setInventory(setInventoryItems(response));
            //     setPlayer(response);
            //     isInCart ? onClearCart() : null;
            //     console.log('Purchase complete: ', response);                     
            // } else if (res.status === 400) {
            //     const response = await res.json();
            //     setPlayer(response.player);
            //     console.log(response.error);
            // } else if (res.status === 409) {
            //     const response = await res.json();
            //     setPlayer(response.player);
            //     console.log(response.error);
            // } else if (res.status === 404) {
            //     const response = await res.json();
            //     console.log(response.error);
            // } else {
            //     console.log('Error in the purchase: ', error);
            // }
        } catch (error) {
            console.log('Error in the purchase: ', error);
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
            const fetchPlayerData = async () => {
                try {
                    console.log('Fetching user character');
                    const res = await fetch(`/api/shop/player?email=${session.user?.email}`);

                    if (res.status === 200) {
                        const response = await res.json();
                        setCurrentEquipment(response.equipment);
                        const equipment = {
                            helmet: response.equipment.helmet,
                            weapon: response.equipment.weapon,
                            armor: response.equipment.armor,
                            shield: response.equipment.shield,
                            artifact: response.equipment.artifact,
                            boot: response.equipment.boot,
                            ring: response.equipment.ring,
                        }
                        setPlayerEquipment(equipment)
                        console.log('Users character fetch complete:', response)
                        setPlayer(response);
                        setInventory(setInventoryItems(response));

                    } else if (res.status === 404) {
                        //   const response = await res.json();

                    } else {
                        setError('An error occurred while checking registration');
                    }
                } catch (error) {
                    setError('An error occurred while checking registration');
                }
            };

            const filter = (data: Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[]) => {
                let newData: any = []

                data.map((element: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield) => {
                    if (element.value > 0 && !element.isUnique) 
                        newData = [...newData, element]
                })

                return newData;
            }

            //If there is not cached data it will fetch the requested category and save it in the local storage
            const fetchCategory = async (categoryName: string, setMethod: (element: []) => void) => {
                const cachedData = sessionStorage.getItem(categoryName);
                if (!cachedData) {
                    try {
                        console.log('Data not found in local storage. \nFetching : ', categoryName);
                        const res = await fetch(`/api/shop/${categoryName}`);

                        if (res.status === 200) {
                            const response = await res.json();

                            console.log(categoryName, ' fetch complete:', response)

                            const result = filter(response)
                            console.log(categoryName, ' after filtering:', result)

                            setMethod(result);

                            console.log(`Saving ${categoryName} data in local storage.`)
                            sessionStorage.setItem(categoryName, JSON.stringify(result));

                        } else if (res.status === 404) {
                            //   const response = await res.json();

                        } else {
                            setError(`An error occurred while fetching: ${categoryName}`);
                        }
                    } catch (error) {
                        setError(`An error occurred while fetching: ${categoryName}`);
                    }
                } else {
                    const parsedData = JSON.parse(cachedData!)
                    console.log(`Data of ${categoryName} found in Local Storage: `, parsedData);

                    setMethod(parsedData);
                }
            };

            const handleFetches = async () => {
                try {
                    setLoading(true);
                    await fetchCategory('ingredients', setIngredients);
                    await fetchCategory('armors', setArmors);
                    await fetchCategory('boots', setBoots);
                    await fetchCategory('helmets', setHelmets);
                    await fetchCategory('rings', setRings);
                    await fetchCategory('shields', setShields);
                    await fetchCategory('artifacts', setArtifacts);
                    await fetchCategory('weapons', setWeapons);
                    await fetchPlayerData();
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

    const displaySelectedShopProducts = (category: String) => {
        switch (category){

            case 'weapon':
                setDisplayProducts(weapons);
            break;
            case 'shield':
                setDisplayProducts(shields);
            break;
            case 'helmet':
                setDisplayProducts(helmets);
            break;
            case 'armor':
                setDisplayProducts(armors);
            break;
            case 'boot':
                setDisplayProducts(boots);
            break;
            case 'ring':
                setDisplayProducts(rings);
            break;
            case 'artifact':
                setDisplayProducts(artifacts);
            break;
            case 'ingredient':
                setDisplayProducts(ingredients);
            break;
            case 'inventory':
                setDisplayProducts(inventory!);
            break;
        }
    };

    if (loading) {
        return <Loading/>;
    }

    return (
        <ShopContainer>
            <ShopHeader>
                <MainHeader/>
                <ShopOptionsHeader buttonDisplayHandler={setDisplayBuyButtons} displaySelectedShopProducts={displaySelectedShopProducts} togglePanel={toggleRightPanel}/>
            </ShopHeader>
            <MainContainer>
            <button className="absolute top-0 right-0 h-full p-4" onClick={toggleRightPanel}>
                </button>
                <RightSidePanel isOpen={isRightPanelOpen} togglePanel={toggleRightPanel} cart={cart} onRemoveFromCart={handleRemoveFromCart} onBuy={buy} onClearCart={onClearCart} player={player} quantity={quantity} handleQuantityChange={handleQuantityChange}/>                
                <CollapseSidepanelButton direction='right' executeFunction={(() => {})}/>
                <LeftContainer currentAttributes={currentAttributes!}  currentEquipment={playerEquipment!} product={currentDisplay!}/>
                <MidContainer displayBuyButtons={displayBuyButtons} product={currentDisplay} onBuy={buy} onSell={sell} onAddToCart={addToCart} player={player!} quantity={quantity} handleQuantityChange={handleQuantityChange}/>
                <RightContainer products={displayProducts} onProductSelect={setCurrentDisplay} player={player!}/>
            </MainContainer>
        </ShopContainer>
    );
}