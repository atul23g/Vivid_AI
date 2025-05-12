import { redirect } from 'next/navigation';
import { onAuthenticateUser } from '@/actions/user';

const AuthCallbackPage = async () => {
    const auth = await onAuthenticateUser();
    

    if (auth.status === 200 || auth.status === 201) {
        return redirect('/dashboard'); // Ensure function exits after redirect
    } else if (auth.status === 403 || auth.status === 400 || auth.status === 500) {
        return redirect('/sign-in'); // Ensure function exits after redirect
    }

    return <div>AuthCallbackPage</div>;
}

export default AuthCallbackPage;