interface Merchant{
    message: string
}
const MerchantComponent: React.FC<Merchant> = ({message}) => {
    return (
        <>
            <div className="w-full row-span-3 row-start-8 flex p-[2%] border-2 border-red-600">
                <div className="w-4/12 h-full bg-[url('/images/shop/merchant.png')] bg-cover bg-center border-2 border-red-600"/>
                <div className="w-8/12 h-full p-[2%] border-2 border-red-600 overflow-y-auto">
                    <p className="text-4xl pb-[2%]">Merchant</p>
                    <p className="text-3xl text-white">{message}</p>
                </div>
            </div>
        </>
    );
};

export default MerchantComponent;
