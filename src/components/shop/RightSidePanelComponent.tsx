import { useEffect, useState } from 'react';
import { Armor } from '@/_common/interfaces/Armor';
import { Artifact } from '@/_common/interfaces/Artifact';
import { Boot } from '@/_common/interfaces/Boot';
import { Helmet } from '@/_common/interfaces/Helmet';
import { Ingredient } from '@/_common/interfaces/Ingredient';
import { Ring } from '@/_common/interfaces/Ring';
import { Shield } from '@/_common/interfaces/Shield';
import { Weapon } from '@/_common/interfaces/Weapon';
import CartProductsContainer from './CartProductsContainer';
import GoldComponent from './GoldComponent';
import { Player } from '@/_common/interfaces/Player';

interface RightSidePanelProps {
    isOpen: boolean;
    togglePanel: () => void;
    cart: (Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient)[];
    onRemoveFromCart: (product: Weapon | Helmet | Armor | Boot | Ring | Artifact | Shield | Ingredient) => void;
    onClearCart: () => void;
    player: Player;
}

const RightSidePanel: React.FC<RightSidePanelProps> = ({ isOpen, togglePanel, cart, onRemoveFromCart, onClearCart, player }) => {
    const [ArrowImage, setArrowImage] = useState('');
    const [buyButtonImage, setBuyButtonImage] = useState('/images/shop/cartButtons.webp');

    const calculateTotal = () =>
        cart.reduce((total, product) => total + (product.value || 0), 0);

    const calculateRemaining = (total: number) =>
        player.gold - total;

    const canAfford = (total: number) => player.gold >= total;

    const handleBuyClick = () => {
        console.log('- Products bought -');
    };

    useEffect(() => {
        setArrowImage('/images/shop/leftArrow.png');
    }, []);

    useEffect(() => {
        if (canAfford(calculateTotal())) {
            setBuyButtonImage('/images/shop/cartButtons.webp');
        } else {
            setBuyButtonImage('/images/shop/cartButtonsDisabled.webp');
        }
    }, [cart, player.gold]);

    return (
        <div className={`fixed top-[20%] right-0 h-[80%] w-[40.5rem] bg-black border-1 border-sepia z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <button onClick={togglePanel} className="absolute top-[38%] left-[-2.25rem]">
                <img src={ArrowImage} alt="Toggle Right Panel" className="h-36 w-9"
                />
            </button>

            <div className="p-4 text-white flex flex-col h-full b">
                <h2 className="text-4xl font-bold mb-4 text-center">CART</h2>
                <div className="flex-1 w-full overflow-y-auto bg-gray-900 bg-opacity-35 rounded-xl">
                    {cart.length > 0 ? (
                        <CartProductsContainer
                            cart={cart}
                            onRemoveFromCart={onRemoveFromCart}
                        />
                    ) : (
                        <p className="text-2xl text-medievalSepia text-center">
                            Your cart is empty.
                        </p>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-t-2 border-medievalSepia p-4">

                        <div className="flex-1 bg-medievalSepia bg-opacity-15 rounded-xl p-2">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-3xl font-bold ">Your Gold</p>
                                <p className="text-3xl font-bold">Cost</p>
                                <p className="text-3xl font-bold">Remaining Gold</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-3xl font-extralight">{player.gold}</p>
                                <p className="text-6xl "> - </p>
                                <p className="text-3xl font-extralight">{calculateTotal()}</p>
                                <p className="text-6xl"> = </p>
                                <GoldComponent amount={calculateRemaining(calculateTotal())} />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="relative w-40 h-20 cursor-pointer mt-2" onClick={onClearCart}>
                                <img src="/images/shop/cartButtons.webp" alt="Delete All" className="absolute w-full h-full" />
                                <p className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                                    Delete All
                                </p>
                            </div>

                            <div
                                className={`relative w-40 h-20 mt-2 ${
                                    canAfford(calculateTotal()) ? 'cursor-pointer' : 'cursor-not-allowed'
                                }`}
                                onClick={canAfford(calculateTotal()) ? handleBuyClick : undefined}
                            >
                                <img src={buyButtonImage} alt="Buy" className="absolute w-full h-full" />
                                <p className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                                    Buy
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RightSidePanel;