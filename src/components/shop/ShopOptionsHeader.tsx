import { useEffect, useState } from 'react';
import Image from 'next/image';
import DropDownComponent from './DropDownComponent';

interface Props {
    displaySelectedShopProducts: Function;
    buttonDisplayHandler: Function;
    togglePanel: Function;
}

const ShopOptionsHeader: React.FC<Props> = ({displaySelectedShopProducts, buttonDisplayHandler, togglePanel}) => {
    const [activeAction, setActiveAction] = useState<string>('buy');
    const [activeCategory, setActiveCategory] = useState<string>('weapon');
    const [shopType, setShopType] = useState<string>('equipment');

    useEffect(() => {
        console.log(activeCategory);
        displaySelectedShopProducts(activeCategory);
    }, [activeCategory]);

    useEffect(() => {
        buttonDisplayHandler(activeAction === 'buy' ? true : false);
    }, [activeAction])

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
    };

    const handleActionChange = (category: string) => {
        setActiveAction(category);
        setShopType('equipment');
        setActiveCategory(category === 'buy' ? 'weapon' : 'inventory');
    };

    const handleShopTypeChange = (type: string) => {
        setShopType(type);
        setActiveCategory(type === 'equipment' ? 'weapon' : 'ingredient');
    };

    const equipmentCategories = [
        { key: 'weapon', label: 'Weapons' },
        { key: 'shield', label: 'Shields' },
        { key: 'helmet', label: 'Helmets' },
        { key: 'armor', label: 'Armors' },
        { key: 'boot', label: 'Boots' },
        { key: 'ring', label: 'Rings' },
        { key: 'artifact', label: 'Artifacts' },
    ];

    const magicalCategories = [
        { key: 'ingredient', label: 'Ingredients' },
        { key: 'container', label: 'Containers' },
    ];

    const shopOptions = [
        { key: 'equipment', label: 'Equipment' },
        { key: 'magical', label: 'Magical Stuff' },
    ]

    const categoriesToDisplay =
        shopType === 'equipment' ? equipmentCategories : magicalCategories;

    return (
        <>
            <header className="w-full bg-black text-white z-50 shadow-md">
                <div className=" flex items-center bg-black justify-center">
                    <Image src="/images/HeaderDivider.webp" alt="HeaderDivider" width={350} height={1} />
                </div>
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={() => handleActionChange('buy')}
                            className={`2xl:2xl:text-4xl lg:text-2xl sm:text-lg px-1 py-2 hover:underline ${activeAction === 'buy' ? 'underline text-yellow-500' : ''}`}
                        >
                            Buy
                        </button>
                        <button
                            onClick={() => handleActionChange('sell')}
                            className={`2xl:2xl:text-4xl lg:text-2xl sm:text-lg px-1 py-2 mx-6 hover:underline ${activeAction === 'sell' ? 'underline text-yellow-500 ' : ''}`}
                        >
                            Sell
                        </button>
                    </div>

                    {activeAction === 'buy' && (
                        <div className="flex items-center ">
                            <DropDownComponent options={shopOptions} selectedOption={shopType} handleFunction={handleShopTypeChange}/>
                            <nav className="flex items-center space-x-6 ml-6">
                                {categoriesToDisplay.map((category) => (
                                    <button
                                        key={category.key}
                                        onClick={() => handleCategoryChange(category.key)}
                                        className={`2xl:2xl:text-4xl lg:text-2xl sm:text-lg px-1 py-2 hover:underline ${activeCategory === category.key ? 'underline text-medievalSepia' : ''}`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}
                    <div className="flex items-center">
                        <button
                            onClick={() => togglePanel()}
                            className={`flex items-center 2xl:2xl:text-4xl lg:text-2xl sm:text-lg px-1 hover:underline ${activeCategory === 'cart' ? 'underline text-yellow-500' : ''}`}
                        >
                            <Image src="/images/shop/cart.webp" alt="Cart" width={65} height={65} />
                            <span className="ml-2 ">Cart</span>
                        </button>
                    </div>
                </div>

            </header>

        </>
    );
};

export default ShopOptionsHeader;