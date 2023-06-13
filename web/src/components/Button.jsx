/**
 * @function Button - 
 * @param {string|number} value -
 * @param {function=} onChange -
 * @param {string=} placeholder -
 * @param {string} class - 
 */
function Button({ value, onClickFunction, placeholder, isDisabled, cssClass, type }) {

    // Functions
    const handleOnButtonClick = (evt) => {
        if (typeof onClickFunction == 'function') {
            onClickFunction();
        }
    }

    return (
        <button
            value={value}
            onClick={handleOnButtonClick}
            className={cssClass}
            type={type || 'button'}
        >
            <span>{placeholder}</span>
        </button>
    );
}

export default Button;