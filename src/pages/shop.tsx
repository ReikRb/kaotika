import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import ShopHeader from '@/components/shop/ShopHeader';
import { useState } from 'react';

export default function Shop() {
  const [loading, setLoading] = useState(false);
	if (loading) {
    return <Loading />;
	}
  return (
		<Layout>
      <ShopHeader></ShopHeader>
		</Layout>
  )
}