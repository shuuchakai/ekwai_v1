import './SelectContainer.css';

function SelectContainer({ labelContent, inputValue, inputOnChange, inputError, selectOptions }) {
    return (
        <div className="request_mainContent_cardForm_container_inputContainer">
            <label className="request_mainContent_cardForm_container_inputContainer_label">{labelContent}</label>
            <select
                className="request_mainContent_cardForm_container_inputContainer_input"
                value={inputValue}
                onChange={inputOnChange}
            >
                {selectOptions.map((option, index) => (
                    <option className="request_mainContent_cardForm_container_inputContainer_inputOption" key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            {inputError && <p className="request_mainContent_cardForm_container_inputContainer_error">{inputError}</p>}
        </div>
    )
}

export default SelectContainer