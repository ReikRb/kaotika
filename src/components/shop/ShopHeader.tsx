import { useState } from 'react';
import Image from 'next/image';

const ShopHeader: React.FC = () => {
    const [activeAction, setActiveAction] = useState<string>('buy');
    const [activeCategory, setActiveCategory] = useState<string>('weapons');
    const [shopType, setShopType] = useState<string>('equipment');
    const [isCartActive, setIsCartActive] = useState(false);


    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
    };

    const handleActionChange = (category: string) => {
        setActiveAction(category);
    };

    const handleShopTypeChange = (type: string) => {
        setShopType(type);
        setActiveCategory(type === 'equipment' ? 'weapons' : 'ingredients');
    };

    const equipmentCategories = [
        { key: 'weapons', label: 'Weapons' },
        { key: 'armor', label: 'Armor' },
        { key: 'helmets', label: 'Helmets' },
        { key: 'footwear', label: 'Footwear' },
        { key: 'rings', label: 'Rings' },
        { key: 'shields', label: 'Shields' },
        { key: 'artifacts', label: 'Artifacts' },
    ];

    const magicalCategories = [
        { key: 'ingredients', label: 'Ingredients' },
        { key: 'containers', label: 'Containers' },
    ];

    const categoriesToDisplay =
        shopType === 'equipment' ? equipmentCategories : magicalCategories;

    return (
        <>
            <div className=" flex items-center bg-black justify-center py-1">
                <Image src="/images/HeaderDivider.webp" alt="HeaderDivider" width={350} height={1} />
            </div>
            <header className="w-full bg-black text-white z-50 shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => handleActionChange('buy')}
                            className={`text-3xl px-1 py-2 hover:underline ${activeAction === 'buy' ? 'underline text-yellow-500' : ''}`}
                        >
                            Buy
                        </button>
                        <button
                            onClick={() => handleActionChange('sell')}
                            className={`text-3xl px-1 py-2 mx-6 hover:underline ${activeAction === 'sell' ? 'underline text-yellow-500 ' : ''}`}
                        >
                            Sell
                        </button>
                    </div>

                    {activeAction === 'buy' && (
                        <div className="flex items-center ">
                            <span className="text-xl mx-2 block">SHOP</span>
                            <select
                                onChange={(e) => handleShopTypeChange(e.target.value)}
                                value={shopType}
                                className="block w-full bg-gray-200 text-black border border-gray-800 rounded-md py-1 pl-6 pr-10 text-2xl"
                            >
                                <option value="equipment">Equipment</option>
                                <option value="magical">Magical Stuff</option>
                            </select>
                            <nav className="flex items-center space-x-6 ml-6">
                                {categoriesToDisplay.map((category) => (
                                    <button
                                        key={category.key}
                                        onClick={() => handleCategoryChange(category.key)}
                                        className={`text-3xl px-1 py-2 hover:underline ${activeCategory === category.key ? 'underline text-medievalSepia' : ''}`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}
                    <div className="flex items-center">
                        <button
                            onClick={() => handleCategoryChange('cart')}
                            className={`flex items-center text-3xl px-1 py-2 hover:underline ${activeCategory === 'cart' ? 'underline text-yellow-500' : ''}`}
                        >
                            <Image src="/images/cart.webp" alt="Cart" width={65} height={65} />
                            <span className="ml-2 ">Cart</span>
                        </button>
                    </div>
                </div>

            </header>

        </>
    );
};

export default ShopHeader;