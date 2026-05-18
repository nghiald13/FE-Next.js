import { auth } from "@/auth";
import { SignInForm } from "@/components/auth/signin-form";

const SignInPage = async () => {

  const session = await auth();
  console.log(">>> check sesssion: ", session)

    return (
      <SignInForm />
    
  )
}

export default SignInPage;