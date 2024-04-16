import './PhoneNumberInput.css';

function PhoneNumberField({ phoneNumbers, handlePhoneNumberChange, error, addPhoneNumber }) {
    return (
        <div className="request_mainContent_cardForm_container_inputContainer">
            <label className="request_mainContent_cardForm_container_inputContainer_label">Números Teléfonicos</label>
            {phoneNumbers.map((phoneNumber, index) => (
                <div className="request_mainContent_cardForm_container_inputContainer_phoneContainer" key={index}>
                    <label className="request_mainContent_cardForm_container_inputContainer_labelPhone">Número de teléfono {index + 1}</label>
                    <input
                        className="request_mainContent_cardForm_container_inputContainer_inputPhone"
                        type="text"
                        value={phoneNumber}
                        onChange={(event) => handlePhoneNumberChange(index, event)}
                    />
                    {error.phoneNumbers && <p className="request_mainContent_cardForm_container_inputContainer_error">{error.phoneNumbers}</p>}
                </div>
            ))}
            <button className="request_mainContent_cardForm_container_inputContainer_button" type="button" onClick={addPhoneNumber}>Añadir número</button>
        </div>
    );
}

export default PhoneNumberField;