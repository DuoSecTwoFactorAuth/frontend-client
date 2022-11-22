import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginValidationSchema, sendLoginDetails, onSubmitLoginDetails } from "./form-utils";

const LoginForm = () => {
    return (
        <div className="h-[70%] w-[70%]">
            <p className="text-center text-[#343634] text-2xl font-famil font-semibold">LOGIN</p>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                    }}
                > 
                <Form>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <Field
                                type="email"
                                placeholder="Enter Registered Email ID"
                                name="email"
                                className="rounded-md mx-12 bg-[#E8EDDF]"
                            />
                            <ErrorMessage name="email" className="mx-12 my-12 bg-red-500" />
                        </div>

                        <div className="flex flex-col">
                            <Field
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                className="rounded-md mx-12 bg-[#E8EDDF]"
                            />
                            <ErrorMessage name="password" className="mx-12 my-12" />
                        </div>

                        <button type='submit' className="w-fit self-center bg-[#333533] text-white rounded-full px-12">Enter</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginForm;