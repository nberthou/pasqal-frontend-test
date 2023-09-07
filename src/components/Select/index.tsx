import { FC, useState } from 'react'

import { Item } from '../../api'

import './select.css'
import CaretUp from '../../icons/up.svg'
import CaretDown from '../../icons/down.svg'
import CrossIcon from '../../icons/cross.svg'

type SelectProps = {
    setSelectedItems: (items: string[] | ((prevState: string[]) => string[])) => void
    selectedItems: string[]
    placeholder?: string
    data: Item[]
    setPlaceholder: (placeholder: string) => void
}

type SelectItemProps = {
    item: Item
    handleSelect: (itemLabel: string) => void
    isItemSelected: boolean
}

export const Select: FC<SelectProps>  = ({
    setSelectedItems,
    selectedItems,
    data
}) => {
    const [isToggled, setIsToggled] = useState<boolean>(false)

    const setToggle = () => {
        setIsToggled(prevState => !prevState)
    }

    const handleSelect = (itemLabel: string) => {
        setSelectedItems((prevState) => {
            if (prevState.includes(itemLabel)) {
                return prevState.filter((e) => e !== itemLabel)
            }
            return [...prevState, itemLabel]
        })
    }

    const checkIfSelected = (item: Item) => {
        return selectedItems.includes(item.label)
    }

    return (
        <div className='Select__Container'>
        <button className='Select__Button' onClick={setToggle}>
        <div className='Select__Button__Placeholder'>
            {selectedItems.length > 0 ? selectedItems.map(item => {
                return (
                    <div className='Select__Button__Placeholder__Tag'  onClick={(e: any) => {
                        handleSelect(item)
                        e.stopPropagation()
                    }}>{item} <CrossIcon className="Select__Button__Placeholder__Tag__Close" /></div>
                    
                )
            }) : 'placeholder'}
        </div>
        <div className='Select__Button__Caret'>
            {isToggled ? <CaretUp style={{width: '1.5rem'}} /> : <CaretDown  style={{width: '1.5rem'}} />}
        </div>
        </button>
        {isToggled && (
            <div className='Select__Dropdown'>
                {
                    data.map((item) => (
                       <SelectItem item={item} isItemSelected={checkIfSelected(item)} handleSelect={handleSelect} />
                    ))
                }
            </div>
        )}
        </div>
    )
}

const SelectItem: FC<SelectItemProps> = ({
    item,
    handleSelect,
    isItemSelected,
}) => {
    return (
        <div key={`${item.id}`} onClick={e => handleSelect(item.label)} className={`Select__Option ${isItemSelected ? 'Select__OptionSelected' : ''}`}>{item.label}</div>
    )
}