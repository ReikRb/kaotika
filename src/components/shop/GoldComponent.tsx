interface Props {
    amount: number;
    fontSize?: string;
};

const GoldComponent: React.FC<Props> = ({amount, fontSize='text-3xl'}) => {
    return (
        <>
            <div className=" row-span-3 row-start-8 flex ">
                <img src="/images/gold.png" alt="HeaderDivider" width={40} height={1} />
                <div className="w-8/12 h-full p-[2%]">
                    <p className={`${fontSize} pb-[2%]`}>{amount}</p>
                </div>
            </div>
        </>
    );
};

export default GoldComponent;