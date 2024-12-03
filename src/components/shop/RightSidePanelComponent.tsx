import { useEffect, useState } from 'react';
import ProductsCardsContainer from './ProductsCardsContainer';
import { Armor } from '@/_common/interfaces/Armor';
import { Artifact } from '@/_common/interfaces/Artifact';
import { Boot } from '@/_common/interfaces/Boot';
import { Helmet } from '@/_common/interfaces/Helmet';
import { Ingredient } from '@/_common/interfaces/Ingredient';
import { Player } from '@/_common/interfaces/Player';
import { Ring } from '@/_common/interfaces/Ring';
import { Shield } from '@/_common/interfaces/Shield';
import { Weapon } from '@/_common/interfaces/Weapon';

interface RightSidePanelProps {
    isOpen: boolean;
    togglePanel: () => void;
    cart: (Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient)[];
    onRemoveFromCart: (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient) => void;
}

const RightSidePanel: React.FC<RightSidePanelProps> = ({ isOpen, togglePanel, cart, onRemoveFromCart }) => {
    const [ArrowImage, setArrowImage] = useState('');

    useEffect(() => {
        setArrowImage('/images/shop/rightArrow.png');
    }, []);

    return (
        <>
            <div className={`fixed top-[20%] right-0 h-[80%] max bg-black border-1 border-sepia z-50 transition-transform ${isOpen ? 'translate-x-full' : 'translate-x-1/3'}`} style={{ width: '50%' }}>
                <button onClick={togglePanel} className="absolute top-[38%] left-0">
                    <img src={ArrowImage} alt="Close Right Panel" className="h-36 w-9" />
                </button>
                <div className="p-4 text-white">
                    <div className="p-4 text-white">
                        <h2 className="text-4xl font-bold mb-4 relative left-[25%]">CART</h2>
                        <div>
                        {cart.length > 0 ? (
                            <ProductsCardsContainer
                                products={cart}
                                onProductSelect={onRemoveFromCart}
                            />
                        ) : (
                            <p className="text-2xl text-medievalSepia relative left-[23%]">Your cart is empty.</p>
                        )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default RightSidePanel;
