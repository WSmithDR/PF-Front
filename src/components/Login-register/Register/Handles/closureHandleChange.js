import { validateRegistration } from "./Validations";

const closureHandleChange = (info, setInfo, setIsButtonDisabled, setErrors) => {
    return (event) => {
        const { name, value } = event.target;
        setInfo({
            ...info,
            [name]: value,
        });
        const newErrors = validateRegistration({
            ...info,
            [name]: value,
        })
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) setIsButtonDisabled(false)
        else setIsButtonDisabled(true)
    }
}

export default closureHandleChange