import GoldComponent from "./GoldComponent";

interface Props {
    displayBuyButtons: boolean;
    quantity: number;
    modalContent: { name: string; value: number };
    handleBuy: VoidFunction
    handleSell: VoidFunction;
    handleCloseModal: VoidFunction;
}

const ConfirmationComponent: React.FC<Props> = ({displayBuyButtons, quantity, modalContent, handleBuy, handleSell, handleCloseModal}) => {
    return (
        <>
            <div className="relative w-8/12 h-3/6 bg-[url('/images/shop/confirmation_box.webp')] bg-contain bg-center bg-no-repeat text-white shadow-xl flex-col justify-center place-content-center space-y-[5%]">
                <div className="flex flex-col items-center justify-center space-y-[1%]">
                    <p className="2xl:text-4xl lg:text-xl sm:text-base font-bold">Are you sure you want to {displayBuyButtons ? 'buy' : 'sell'}</p>
                    <p className="2xl:text-5xl lg:text-3xl sm:text-xl font-extrabold text-yellow-300">x{quantity} {modalContent.name}</p>
                    <div className="flex items-center justify-center space-x-2">
                        <p className="2xl:text-4xl lg:text-xl sm:text-base font-bold">for</p>
                        <GoldComponent amount={modalContent.value} />
                        <p className="2xl:text-4xl lg:text-xl sm:text-base font-bold">?</p>
                    </div>
                </div>
                <div className="flex justify-center space-x-[15%]">
                    <button
                        className="bg-transparent hover:bg-black text-white 2xl:text-4xl lg:text-xl sm:text-base px-4 py-2 rounded-3xl border-2 border-medievalSepia "
                        onClick={displayBuyButtons ? handleBuy : handleSell}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-transparent hover:bg-black text-white 2xl:text-4xl lg:text-xl sm:text-base px-4 py-2 rounded-3xl border-2 border-medievalSepia"
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default ConfirmationComponent;