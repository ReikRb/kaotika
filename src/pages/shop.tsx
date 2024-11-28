import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import ShopHeader from '@/components/shop/ShopHeader';

export default function Shop() {

  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        setIngredients(results);
      } catch (error) {
        console.error('Failed to get ingredients: ', error);
      }
    }

    getIngredients();
  }, []);

	if (loading) {
    return <Loading />;
	}

  return (
		<Layout>
      <ShopHeader></ShopHeader>
		</Layout>
  );
}