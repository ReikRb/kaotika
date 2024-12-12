import React, { useEffect, useState } from "react";
import ShopButton from "./shopButton";
import RequirementsSection from "./requirementsSection";
import ProductImage from "./ProductImage";
import { Weapon } from "@/_common/interfaces/Weapon";
import { Helmet } from "@/_common/interfaces/Helmet";
import { Armor } from "@/_common/interfaces/Armor";
import { Boot } from "@/_common/interfaces/Boot";
import { Shield } from "@/_common/interfaces/Shield";
import ProductWeaponDisplay from "./WeaponModifierDisplay";
import ProductDefenseDisplay from "./DefensiveModifierDisplay";
import { Player } from "@/_common/interfaces/Player";
import { Ingredient } from "@/_common/interfaces/Ingredient";
import IncrementDecrement from "./UpdateQtyButton";
import { calculatePurchaseValue, isGoldSufficient, isProductEquiped, isProductInTheInventory } from "@/helpers/calculateIfCanBuy";
import ConfirmationComponent from "./ConfirmationComponent";
import { Product } from "@/_common/types/Product";

interface Props {
  product: Product;
  onBuy: (products: { product: Product, quantity: number }[], isInCart: boolean) => void;
  onSell: (product: { product: Product, quantity: number }) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  player: Player;
  quantity: number;
  handleQuantityChange: (product: Product, quantity: number) => void;
  displayBuyButtons: boolean;
};

const hasDefense = (product: Product): product is (Helmet | Armor | Boot | Shield) => {
  return "defense" in product;
};

const isWeapon = (product: Product): product is Weapon => {
  return "base_percentage" in product && "die_faces" in product;
};

const isMagical = (product: Product): product is Ingredient => {
  return "effects" in product;
};
const isIngredient = (product: Product): product is Ingredient => {
  return "qty" in product;
};

const MidContainer: React.FC<Props> = ({ product, onBuy, onSell, onAddToCart, player, quantity, displayBuyButtons}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ name: string; value: number } | null>(null);
  const [localQuantity, setLocalQuantity] = useState<number>(1);
  const handleOpenModal = () => {
    if (product) {
      setModalContent({ name: product.name, value: product.value * localQuantity });
      setModalOpen(true);
    }
  };

  const handleBuy = () => {
    onBuy([{ product: product, quantity: localQuantity }], false);
    setModalOpen(false);
    setModalContent(null);
  };

  const handleSell = () => {
    onSell({ product: product, quantity: localQuantity });
    setModalOpen(false);
    setModalContent(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  const handleLocalQuantityChange = (newQuantity: number) => {
    setLocalQuantity(newQuantity);
  };



  useEffect(() => {
    if (product) {
      setLocalQuantity(quantity);
    }
  }, [product, quantity]);

  const canAfford = () => {
    const value = calculatePurchaseValue([product], localQuantity);

    return (
      isProductInTheInventory(player, [product]) &&
      isProductEquiped(player, [product]) &&
      isGoldSufficient(player, value)
    );
  };

  if (!product) {
    return <p className="w-4/12 h-full flex justify-center items-center 2xl:text-3xl lg:text-xl sm:text-base">Select a product to view details.</p>;
  }

  return (
    <>
      <div className="w-4/12 grid grid-rows-12">
        {isModalOpen && modalContent && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
            <ConfirmationComponent
              displayBuyButtons={displayBuyButtons}
              quantity={localQuantity}
              modalContent={modalContent}
              handleBuy={handleBuy}
              handleSell={handleSell}
              handleCloseModal={handleCloseModal}
            />
          </div>
        )}
        {isMagical(product) ? (
          <div className="w-full row-span-1 row-start-0 flex justify-center place-content-center pt-[2%]">
            <RequirementsSection gold={ !displayBuyButtons ? Math.floor(product.value * localQuantity / 3) : product.value * localQuantity} />
          </div>
        ) : (
          <div className="w-full row-span-1 row-start-0 flex justify-center place-content-center pt-[2%]">
            <RequirementsSection gold={displayBuyButtons ? product.value * localQuantity : Math.floor(product.value * localQuantity / 3)} level={product.min_lvl} />
          </div>
        )}
        {isMagical(product) ? (
          <div />
        ) : hasDefense(product) || isWeapon(product) ? (
          <div className="w-full row-span-3 row-start-2 flex justify-center place-content-center pt-[2%]">
            {hasDefense(product) ? (
              <ProductDefenseDisplay defense={product.defense} />
            ) : isWeapon(product) ? ( 
              <ProductWeaponDisplay basePercentage={product.base_percentage} dieFaces={product.die_faces} dieModifier={product.die_modifier} dieNum={product.die_num} />
            ) : (
              <div />
            )}
          </div>
          ) : (
          <div/>
        )}
        <div className={isMagical(product) ? "w-full row-span-5 row-start-3 flex justify-center place-content-center p-[2%]"
          : hasDefense(product) ? "w-full row-span-5 row-start-5 flex justify-center place-content-center p-[2%]"
          : "w-full row-span-5 row-start-4 flex justify-center place-content-center p-[2%]"}>
          <ProductImage imageSrc={product.image} altText={product.name} />
        </div>
        {isMagical(product) ? (
          <div className="w-full row-span-2 row-start-8 flex items-center justify-center p-[2%]">
            <IncrementDecrement
              initialValue={localQuantity}
              onValueChange={(_, newQuantity) => handleLocalQuantityChange(newQuantity)}
              isInCart={false}
              product={product}
              displayButtons={!displayBuyButtons}
            />
          </div>
        ) : (
          <div />
        )}
        <div className="w-full row-span-3 row-start-10 flex justify-around items-center p-[2%]">
          {displayBuyButtons ? (
            <>
              <ShopButton label="BUY" canAfford={canAfford} onClick={canAfford() ? handleOpenModal : () => { }} />
              <ShopButton
                label="ADD TO CART"
                canAfford={canAfford}
                onClick={canAfford() ? () => {
                  if (product) {
                    onAddToCart(product, localQuantity);
                    setLocalQuantity(1);
                  }
                } : () => { }}
              />
            </>
          ) : (
            <ShopButton label="SELL" canAfford={() => { return true }} onClick={handleOpenModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default MidContainer;