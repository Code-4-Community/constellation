import axios, { AxiosResponse } from "axios";
import { FormValues } from "../components/form/Form";
import { POST_FORM_URL } from "../constants/endpoints";


export const submitForm = async (body: FormValues): Promise<void> => {
    try {
        await axios.post(POST_FORM_URL, body);
        alert('Form submitted successfully')
    } catch (error) {
        console.log('axios error making post request', error)
        alert('Error making request')
    }
    
}

export const getAllForms = async (url: string): Promise<AxiosResponse | void> => {
    try {
        return await axios.get(url);
    } catch (error) {
        console.log('axios error making get request', error)
        alert('Error getting data')
    }
}