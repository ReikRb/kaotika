import React, { ReactNode } from 'react';
import { Ingredient } from '@/_common/interfaces/Ingredient';
import { Tooltip } from '@nextui-org/react';

type TooltipPlacement =
  | "top"
  | "bottom"
  | "right"
  | "left"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

interface Props {
  id: string;
  tooltip: ReactNode;
  type: string[];
  element: Ingredient;
  className: string | undefined;
  tooltipClassName: string;
  width: string;
  border: string;
  position: TooltipPlacement;
	qty: number;
}

const IngredientComponent: React.FC<Props> = ({ id, tooltip, tooltipClassName, className, element, qty, position}) => {
  
  return (
		<div className="relative inline-block">
			<Tooltip className={tooltipClassName} placement={position} size='sm' showArrow={true} content={tooltip} closeDelay={0}>
				<img id={id} src={element.image} alt="Ingredient" className={className} />
			</Tooltip>
			<div style={{'borderBottom': '3px ridge #000000', 'borderLeft': '3px ridge #000000'}} className="absolute top-0 right-0 bg-neutral-900/80 text-medievalSepia text-2xl border-l-1 border-b-1  border-black/30 w-5 h-5 flex items-center justify-center">
				<div className='mt-[-7px]'>{qty}</div>
			</div>
		</div>
  );
}

export default IngredientComponent;




