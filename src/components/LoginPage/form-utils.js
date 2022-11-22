import * as Yup from 'yup';
import axios from "axios";

const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid Email Format')
        .required('Required'),
    password: Yup.string().required('Required')
});

const sendLoginDetails = async (loginDetails) => {
    try {
        const resp = await axios.post('https://jsonplaceholder.typicode.com/posts', loginDetails);
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

const onSubmit=(values, { setSubmitting }) => {
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 400)
                    console.log(values);
                }

const onSubmitLoginDetails = () => {
    // const onSubmitLogin = (event) => {
    //     event.preventDefault();
    //     console.log("fhvivf");
    //     try {
    //         console.log(login);
    //         sendLoginDetails();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
}

export { loginValidationSchema, sendLoginDetails, onSubmitLoginDetails };