interface Merchant{
    message: string
}
const MerchantComponent: React.FC<Merchant> = ({message}) => {
    return (
        <>
            <div className="w-4/12 h-full bg-[url('/images/shop/merchant.png')] bg-cover bg-center"/>
            <div className="w-8/12 h-full grid p-[2%] overflow-y-auto">
                <p className="2xl:text-4xl lg:text-2xl sm:text-xl pb-[2%]">Merchant</p>
                <p className="2xl:text-3xl lg:text-xl sm:text-lg text-white">{message}</p>
            </div>
        </>
    );
};

export default MerchantComponent;
