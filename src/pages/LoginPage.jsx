import LoginForm from "../components/LoginPage/LoginForm.jsx";
import img from "../assets/logos/lightening.png";
import duosecLogo from "../assets/logos/duosec-logo.svg";

const LoginPage = () => {
    return (
        <div className="w-screen h-screen flex flex-row justify-between">
            <div className="h-[100%] w-[60%]">
                <div className="w-[100%]">
                    <img src={duosecLogo} className="px-8 py-8" />
                </div>
                <div className="h-[] flex flex-row justify-center"> 
                    <LoginForm />
                </div>
            </div>
            <div className="h-[100%] w-[40%] bg-[#333533] flex flex-col justify-center">
                <img src={img} className="absolute top-0 right-0 h-[65%] w-[20%]"/>    
                <p className="text-center text-white text-5xl z-10000">Welcome Back!</p>
            </div>
        </div>
    )
}

export default LoginPage;