/**
 * @function Input - 
 * @param {string|number} value -
 * @param {function=} onChange -
 * @param {string=} placeholder -
 * @param {string} class - 
 */
function Input({ value, onChange, placeholder, isReadOnly, cssClass, type }) {

    // Functions
    const handleOnChangeValue = (evt) => {
        const eventValue = evt.target.value;

        if (typeof onChange == 'function') {
            onChange(eventValue);
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