import { PROGRESS_LABEL, PROGRESS_VALUE } from '@/constants/constants';
import { Progress } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import MultiProgress from 'react-multi-progress';

interface Props {
  label: string;
  value: number | undefined;
  itemValue: number | undefined;
  maxValue: number;
}

interface BarValue {
  value: number;
  color: string;
}

const ShopProgressBar: React.FC<Props> = ({ label, value, itemValue, maxValue }) => {
  const [newValue, setNewValue] = useState(0)
  const [differenceValue, setDifferenceValue] = useState(0)
  const [barValues, setBarValues] = useState<BarValue[]>([{
    value: 0,
    color: "#e4caa5",
  },
  {
    value: 0,
    color: "red",
  }])

  useEffect(() => {

    const difference = value! + itemValue!
    const differenceResult = (difference / maxValue) * 100
    const valueResult = (value! / maxValue) * 100

    setNewValue(valueResult)
    setDifferenceValue(differenceResult)
  }, [value, itemValue])

  useEffect(() => {
    let newBarValues = [
      {
        value: newValue,
        color: "#e4caa5",
      }
    ]

    if (itemValue) {
      let valuePercentage = (itemValue / maxValue) * 100
      valuePercentage = valuePercentage < 0 ? 0 : valuePercentage
      if (itemValue > 0) {
        newBarValues = [
          {
            value: newValue,
            color: "#e4caa5",
          },
          {
            value: valuePercentage,
            color: "green",
          }
        ]
      } else if (itemValue < 0) {
        const result = newValue - differenceValue
        newBarValues = [
          {
            value: differenceValue,
            color: "#e4caa5",
          },
          {
            value: result,
            color: "red",
          }
        ]
      }
    }

    setBarValues(newBarValues)
  }, [newValue, differenceValue])

  return (
    <>
      <div className='flex flex-row'>
        <p className='w-2/4 text-start'>{label}</p>
        <div className='flex flex-row w-2/4 text-end'>
          {itemValue! > 0
            ? <p className='w-11/12 text-end text-green-500'>{`(+${itemValue})`}</p>
            : itemValue! < 0
              ? <p className='w-11/12 text-end text-rose-600'>{`(${itemValue})`}</p>
              : null
          }
          {itemValue! != 0
            ? <p className='w-1/12 text-end'>{value! + itemValue!}</p>
            : <p className='w-full text-end'>{value! + itemValue!}</p>
          }
        </div>
      </div>
      <MultiProgress
        transitionTime={1.5}
        backgroundColor={'gray'}
        border={'1px solid #e4caa5'}
        elements={barValues}
      />
    </>
  )
}

export default ShopProgressBar