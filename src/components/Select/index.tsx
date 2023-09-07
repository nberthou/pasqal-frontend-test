import { FC, useState } from 'react'

import { Item } from '../../api'

import './select.css'
import CaretUp from '../../icons/up.svg'
import CaretDown from '../../icons/down.svg'

type SelectProps = {
    setSelectedItems: (items: string[] | ((prevState: string[]) => string[])) => void
    selectedItems: string[]
    placeholder?: string
    data: Item[]
    setPlaceholder: (placeholder: string) => void
}

type SelectItemProps = {
    item: Item
    handleSelect: (item: Item) => void
    isItemSelected: boolean
}

export const Select: FC<SelectProps>  = ({
    setSelectedItems,
    selectedItems,
    data,
    setPlaceholder,
    placeholder
}) => {
    const [isToggled, setIsToggled] = useState<boolean>(false)

    const setToggle = () => {
        setIsToggled(prevState => !prevState)
    }

    const handleSelect = (item: Item) => {
        setSelectedItems([item.label])
        setPlaceholder(item.label)
    }

    const checkIfSelected = (item: Item) => {
        return selectedItems.includes(item.label)
    }

    return (
        <div className='Select__Container'>
        <button className='Select__Button' onClick={setToggle}>{placeholder}
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
        <div key={`${item.id}`} onClick={e => handleSelect(item)} className={`Select__Option ${isItemSelected ? 'Select__OptionSelected' : ''}`}>{item.label}</div>
    )
}