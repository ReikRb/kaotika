import { Player } from '@/_common/interfaces/Player';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
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

    useEffect(() => {
        if (session?.user?.email) {
            const fetchPlayerData = async () => {
                try {
                    setLoading(true);
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
                } finally {
                    setLoading(false);
                    console.log('Loading Complete');
                    
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
                await getIngredients();
                await fetchPlayerData();
            }
            handleFetches()
        }
    }, [session]);

    if (loading) {
        return <Loading />;
    }

    return (
        <Layout>
            <ShopHeader></ShopHeader>
        </Layout>
    );
}
