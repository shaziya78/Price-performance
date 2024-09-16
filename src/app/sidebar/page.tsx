import { useEffect, useState } from "react";
const arrowDown = './Images/arrow-down.svg';
import Image from "next/image";

interface TableData {
    duration: string;
    marketPriceChange: number;
    rmcChange: number;
}

const Page = () => {
    const [tableData, setTableData] = useState<TableData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./data.json');
                const jsonData = await response.json();

                const processedData = jsonData.data.map((item: any) => ({
                    duration: item.duration,
                    marketPriceChange: parseFloat(item.marketPriceChange),
                    rmcChange: parseFloat(item.rmcChange),
                }));
                setTableData(processedData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    const formatPercentage = (value: number) => `${value.toFixed(2)}%`;
    const getArrowSymbol = (value: number) => value > 0 ? 'rotate-180' : '';

    return (
        <div className="bg-white h-screen p-4 border rounded-md gap-[16px]">
            <h1 className="text-blue-900 text-[24px] font-bold pt-10">Price Performance</h1>
            <table className="mt-2 rounded-b-xl shadow-md">
                <thead>
                    <tr className="bg-gray-100 text-[#475467] text-sm leading-3">
                        <th className="p-4">Duration</th>
                        <th className="p-4">Change in Market Price</th>
                        <th className="p-4">Change in RMC</th>
                    </tr>
                </thead><tbody className="text-black">
    {tableData.map((row, index) => (
        <tr key={index} className={`border-b border-gray-300 ${index === tableData.length - 1 ? 'border-b-0' : ''}`}>
            <td className="p-4 font-medium text-sm leading-[14px]">{row.duration}</td>
            <td className="p-6 flex items-center gap-4">
                <span className="w-16 p-4 font-medium text-sm leading-[14px] text-[#344054] lg:space-x-10">{formatPercentage(row.marketPriceChange)}</span>
                <Image
                    src={arrowDown}
                    alt={row.marketPriceChange > 0 ? "Up Arrow" : "Down Arrow"}
                    width={16}
                    height={16}
                    className={`${getArrowSymbol(row.marketPriceChange)} text-[#1570EF] text-[8px]`}
                />
            </td>
            <td className="p-4">
                <div className="flex items-center gap-2">
                    <span className="w-16 p-4 font-medium text-sm leading-[14px] text-[#344054] lg:space-x-10">{formatPercentage(row.rmcChange)}</span>
                    <Image
                        src={arrowDown}
                        alt={row.rmcChange > 0 ? "Up Arrow" : "Down Arrow"}
                        width={16}
                        height={16}
                        className={`${getArrowSymbol(row.rmcChange)} text-[#1570EF] text-[8px]`}
                    />
                </div>
            </td>
        </tr>
    ))}
</tbody>

            </table>
        </div>
    );
};

export default Page;
