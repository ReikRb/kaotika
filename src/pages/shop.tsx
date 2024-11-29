import { Armor } from '@/_common/interfaces/Armor';
import { Artifact } from '@/_common/interfaces/Artifact';
import { Boot } from '@/_common/interfaces/Boot';
import { Helmet } from '@/_common/interfaces/Helmet';
import { Player } from '@/_common/interfaces/Player';
import { Ring } from '@/_common/interfaces/Ring';
import { Shield } from '@/_common/interfaces/Shield';
import { Weapon } from '@/_common/interfaces/Weapon';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import LeftContainer from '@/components/shop/LeftContainer';
import ShopHeader from '@/components/shop/ShopHeader';
import { DBConnect, DBDisconnect } from '@/database/dbHandler';
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
    const [ingredients, setIngredients] = useState([]);
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

            const fetchCategory = async (categoryName: string, setMethod: (element: []) => void) => {
                try {
                    console.log('Fetching : ', categoryName);
                    const res = await fetch(`/api/shop/${categoryName}`);
                    
                    if (res.status === 200) {
                        const response = await res.json();
                        
                        console.log(categoryName, ' fetch complete:', response)
                        setMethod(response);

                    } else if (res.status === 404) {
                        //   const response = await res.json();

                    } else {
                        setError(`An error occurred while fetching: ${categoryName}` );
                    }
                } catch (error) {
                    setError(`An error occurred while fetching: ${categoryName}` );
                }
            };

            const getIngredients = async () => {
                try {
                    console.log('Getting ingredients');

                    const response = await fetch(`/api/shop/ingredients`, {
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const results = await response.json();
                    console.log('Ingredients Fetch result: ', results);
                    
                    setIngredients(results);
                } catch (error) {
                    console.error('Failed to get ingredients: ', error);
                }
            };

            const handleFetches = async () =>{
                try {
                    setLoading(true);
                    // await getIngredients();
                    // await fetchCategory('armors', setArmors);
                    // await fetchCategory('boots', setBoots);
                    // await fetchCategory('helmets', setHelmets);
                    // await fetchCategory('rings', setRings);
                    // await fetchCategory('shields', setShields);
                    // await fetchCategory('artifacts', setArtifacts);
                    // await fetchCategory('weapons', setWeapons);
                    // await fetchPlayerData();
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
        <Layout>
            {/* <ShopHeader></ShopHeader> */}
            <LeftContainer></LeftContainer>
        </Layout>
    );
}
