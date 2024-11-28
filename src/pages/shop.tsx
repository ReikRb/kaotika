import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { useState } from 'react';

export default function Shop() {
  const [loading, setLoading] = useState(false);
	if (loading) {
    return <Loading />;
	}
  return (
		<Layout>
    	<div>SHOP</div>
		</Layout>
  )
}