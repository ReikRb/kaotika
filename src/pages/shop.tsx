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

interface Equipment {
    helmet: Helmet,
    weapon: Weapon,
    armor: Armor,
    shield: Shield,
    artifact: Artifact,
    boot: Boot,
    ring: Ring,
}

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
    const [currentAttributes, setCurrentAttributes] = useState<Modifier>();
    const [displayProducts, setDisplayProducts] = useState<Weapon[] | Helmet[] | Armor[] | Boot[] | Ring[] | Artifact[] | Shield[] | Ingredient[]>(weapons);
    const [currentDisplay, setCurrentDisplay] = useState<Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | null>(null);
    
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
                            sessionStorage.setItem(categoryName, JSON.stringify(response));
    
                        } else if (res.status === 404) {
                            //   const response = await res.json();
    
                        } else {
                            setError(`An error occurred while fetching: ${categoryName}` );
                        }
                    } catch (error) {
                        setError(`An error occurred while fetching: ${categoryName}` );
                    }
                } else {
                    const parsedData = JSON.parse(cachedData!)
                    console.log(`Data of ${categoryName} found in Local Storage: `, parsedData);
                    
                    setMethod(parsedData);
                }
            };

            const handleFetches = async () =>{
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
        if(player) calculateAllAttributes(player, setCurrentAttributes);
      }, [player]);

    //MUST CHANGE VALUES TO DETECT ANY ITEM THAT IS SELECTED IN THE SHOP NOT THE DEFAULT VALUE OF HELMETS
    useEffect(() => {
        console.log('helmets array: ',helmets)
        setCurrentDisplay(helmets[0])
    }, [helmets]);

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
        }
    };

    useEffect(() => {
        setCurrentDisplay(armors[3])
    }, [helmets])
    
    if (loading) {
        return <Loading />;
    }

    return (
        <ShopContainer>
            <ShopHeader>
                <MainHeader/>
                <ShopOptionsHeader displaySelectedShopProducts={displaySelectedShopProducts}/>
            </ShopHeader>
            <MainContainer>
                <CollapseSidepanelButton direction='right' executeFunction={(() => {console.log('right')})}/>
                <LeftContainer currentAttributes={currentAttributes!}  currentEquipment={playerEquipment!} product={currentDisplay!}/>
                <MidContainer product={currentDisplay}/>
                <RightContainer products={displayProducts} onProductSelect={setCurrentDisplay}/>
                <CollapseSidepanelButton direction='left' executeFunction={(() => {console.log('left')})}/>
            </MainContainer>
        </ShopContainer>
    );
}
