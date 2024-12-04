import GoldComponent from "./GoldComponent";

interface User {
    name: string;
    gold: number;
    level: number;
}

const RequiredLevel: React.FC<{ level: number, fontSize?: string }> = ({ level, fontSize='text-2xl' }) => (
    <div className="flex items-center space-x-2">
        <span className={`text-gray-200 ${fontSize}`}>Level</span>
        <span className={`text-amber-200 ${fontSize}`}>{level}</span>
    </div>
);

const UserComponent: React.FC<User> = ({ name, gold, level }) => {
    return (
        <div className=" justify-center text-5xl  w-[90%] h-[180%] ml-[4%] mt-[2%] bg-contain bg-no-repeat bg-[url('/images/shop/Req_Bg.webp')]">
            <div className="h-[50%] w-full text-center">
                <p>{name}</p>
            </div>
            <div className="flex inline-row w-full h-[50%] justify-center">
                <div className="w-[20%] mr-[30%] self-center">
                    <GoldComponent amount={gold} fontSize="text-4xl"/>
                </div>
                <div className="w-[20%] self-center">
                    <RequiredLevel level={level} fontSize="text-4xl" />
                </div>
            </div>

        </div>
    )
}

export default UserComponent;