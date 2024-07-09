import React, { Component } from 'react';
import { Artifact } from '@/_common/interfaces/Artifact';

interface Props {
  element: Artifact;
}

const ArtifactTooltip: React.FC<Props> = ({ element }) => {

    return (
        <div key={element._id} className='text-center p-4'>
          <h1 className="text-3xl mb-4 text-darkSepia">{element.name}</h1>
          <p className="text-3xl mb-4">{element.description}</p>
          <h1 className="text-3xl mb-4 text-darkSepia">Charisma modifier</h1>
          {element.modifiers_charisma.map(modifier => {
            return <p className="text-3xl mb-4">{modifier.attribute} + Charisma * {modifier.value}</p>
          })}
          <h1 className="text-3xl mb-4 text-darkSepia">Modifiers</h1>
          {element.modifiers.map(modifier => {
            return <p className="text-3xl mb-4">{modifier.attribute}: {modifier.value}</p>
          })}
          
        </div>
    )

}

export default ArtifactTooltip