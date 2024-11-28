import { useEffect, useState } from 'react';

export default function Shop() {

  const [ingredients, setIngredients] = useState([]);

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
        setIngredients(results.data);
      } catch (error) {
        console.error('Failed to get ingredients: ', error);
      }
    }

    getIngredients();
  }, [])

  return (
    <html lang="es">
      <body className="bg-cover bg-center" style={{ backgroundImage: 'url(/images/background.jpg)'}}>
        <div>
            <p>HELLO WORLD</p>
        </div>
      </body>
    </html>
  );
}
