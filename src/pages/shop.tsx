import { Armor } from '@/_common/interfaces/Armor';
import { Artifact } from '@/_common/interfaces/Artifact';
import { Boot } from '@/_common/interfaces/Boot';
import { Helmet } from '@/_common/interfaces/Helmet';
import { Ingredient } from '@/_common/interfaces/Ingredient';
import { Player } from '@/_common/interfaces/Player';
import { Ring } from '@/_common/interfaces/Ring';
import { Shield } from '@/_common/interfaces/Shield';
import { Weapon } from '@/_common/interfaces/Weapon';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import LeftContainer from '@/components/shop/LeftContainer';
import MainContainer from '@/components/shop/MainContainer';
import MidContainer from '@/components/shop/MidContainer';
import RightContainer from '@/components/shop/RightContainer';
import ShopContainer from '@/components/shop/ShopContainer';
import ShopHeader from '@/components/shop/ShopHeader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Shop() {
    const router = useRouter();
    const { data: session } = useSession();
    const [player, setPlayer] = useState<Player>();
    const [loading, setLoading] = useState(true);
    const [currentEquipment, setCurrentEquipment] = useState({});
    const [error, setError] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [armors, setArmors] = useState<Armor[]>([]);
    const [boots, setBoots] = useState<Boot[]>([]);
    const [helmets, setHelmets] = useState<Helmet[]>([]);
    const [rings, setRings] = useState<Ring[]>([]);
    const [shields, setShields] = useState<Shield[]>([]);
    const [artifacts, setArtifacts] = useState<Artifact[]>([]);
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    
    useEffect(() => {
        if (session?.user?.email) {
            const fetchPlayerData = async () => {
                try {
                    console.log('Fetching user character');
                    const res = await fetch(`/api/shop/player?email=${session.user?.email}`);
                    
                    if (res.status === 200) {
                        const response = await res.json();
                        setCurrentEquipment(response.equipment);
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
                            setMethod(response);

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

    if (loading) {
        return <Loading />;
    }

    return (
        <ShopContainer>
            <Header/>
            <ShopHeader/>
            <MainContainer>
                <LeftContainer/>
                <MidContainer/>
                <RightContainer/>
            </MainContainer>
        </ShopContainer>
    );
}
