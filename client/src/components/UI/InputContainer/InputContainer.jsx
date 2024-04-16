import './InputContainer.css';

function InputContainer({ labelContent, inputType, inputValue, inputOnChange, inputError }) {
    return (
        <div className="request_mainContent_cardForm_container_inputContainer">
            <label className="request_mainContent_cardForm_container_inputContainer_label">{labelContent}</label>
            <input
                className="request_mainContent_cardForm_container_inputContainer_input"
                type={inputType}
                value={inputValue}
                onChange={inputOnChange}
            />
            {inputError && <p className="request_mainContent_cardForm_container_inputContainer_error">{inputError}</p>}
        </div>
    )
}

export default InputContainer;