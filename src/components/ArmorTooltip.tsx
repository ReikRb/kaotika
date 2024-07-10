import React, { Component } from 'react';
import { Armor } from '@/_common/interfaces/Armor';

interface Props {
  element: Armor;
}

const ArmorTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='p-4 text-center'>
          <h1 className="text-3xl mb-2 text-darkSepia">{element.name}</h1>
          <p className="text-2xl mb-2">{element.description}</p>
          <h1 className="text-3xl mb-2 text-darkSepia">Modifiers</h1>
          {element.modifiers.map((modifier, index) => {
            return <p key={index} className="text-2xl mb-2">{modifier.attribute}: {modifier.value}</p>
          })}
        </div>
    )

}

export default ArmorTooltip