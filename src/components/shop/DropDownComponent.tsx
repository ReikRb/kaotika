interface Props {
    options: options[];
    selectedOption: string;
    handleFunction: Function;
};

interface options {
    key: string;
    label: string;
};

const DropDownComponent: React.FC<Props> = ({options, selectedOption, handleFunction}) => {
    return (
        <>
            <select
                onChange={(e) => handleFunction(e.target.value)}
                value={selectedOption}
                className="block w-full bg-gray-200 text-black border border-gray-800 rounded-md py-1 pl-6 pr-10 text-2xl appearance-none">
                {options.map((option, i) => {
                    return <option key={i} value={option.key}>{option.label}</option>;
                })}
            </select>
        </>
    );
};

export default DropDownComponent;