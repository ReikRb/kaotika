const MerchantComponent: React.FC = () => {
    return (
        <>
            <div className="w-full row-span-3 row-start-8 flex p-[2%]  border-2 border-red-600">
                <div className="w-4/12 h-full bg-[url('/images/shop/merchant.png')] bg-cover bg-center border-2 border-red-600"/>
                <div className="w-8/12 h-full p-[3%] border-2 border-red-600">
                    <p className="text-4xl pb-[3%]">Merchant</p>
                    <p className="text-3xl text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>
        </>
    );
};

export default MerchantComponent;
