/**
 * @function Input - Input component
 * @param {string|number} value - The input value
 * @param {function=} onChange - Function to be called on the input change
 * @param {string=} placeholder - The input placeholder string
 * @param {string=} cssClass - The tailwind class
 * @param {string=} dataKey - The input key name
 */
function Input({ value, onChange, placeholder, cssClass, type, dataKey }) {

    // Functions
    /**
     * @function handleOnChangeValue - Will get the on change value and passed to the onChange props functions if has it
     * @param {object} evt - The input change object 
     */
    const handleOnChangeValue = (evt) => {
        const eventValue = evt.target.value;

        if (typeof onChange == 'function') {
            onChange(eventValue, dataKey);
        }
    }

    return (
        <input
            value={value}
            onChange={handleOnChangeValue}
            placeholder={placeholder}
            className={cssClass}
            type={type}
        />
    );
}

export default Input;