interface Gold {
    amount: number
}

const GoldComponent: React.FC<Gold> = ({amount}) => {
    return (
        <>
            <div className=" row-span-3 row-start-8 flex p-[2%]  border-1 border-red-600">
                <img src="/images/gold.png" alt="HeaderDivider" width={40} height={1} />
                <div className="w-8/12 h-full p-[2%]">
                    <p className="text-4xl pb-[2%]">{amount}</p>
                </div>
            </div>
        </>
    );
};

export default GoldComponent;
