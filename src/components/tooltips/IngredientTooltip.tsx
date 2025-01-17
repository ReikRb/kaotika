import React from 'react';
import { Ingredient } from '@/_common/interfaces/Ingredient';
import { transformString } from '@/helpers/transformString';

interface Props {
  element: Ingredient;
}

const IngredientTooltip: React.FC<Props> = ({ element }): React.ReactNode => {
  return (
    <div key={element._id} className='w-full p-4 text-center'>
      <div className="flex flex-row justify-items-center items-center">
        <div className="w-full p-4">
          <h1 className="text-3xl mb-2 text-darkSepia">{element.name}</h1>
          <p className="text-2xl mb-2">{element.description}</p>
					<p className="text-2xl mb-2">{element.type}</p>
          <h1 className="text-2xl mb-2 text-darkSepia">Value: <span className="text-2xl mb-2 text-yellow-500">{element.value}</span></h1>
					<h1 className="text-2xl mb-2 text-darkSepia">Quantity: <span className="text-2xl mb-2 text-yellow-500">{element.qty}</span></h1>
          <h1 className="text-3xl mb-2 text-darkSepia">Effects:</h1>
					{
						element.effects.map(effect => (
							<p className="text-2xl mb-2">{transformString(effect) }</p>
						))
					}
				</div>
      </div>       
    </div>
  )
}

export default IngredientTooltip