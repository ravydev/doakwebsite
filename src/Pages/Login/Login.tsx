import { useEffect } from 'react'
import logoImg from '../../assets/logo-black.png'
import Container from '../../Components/Container/Container'
import Input from '../../Components/Input/Input'
import { Link, useNavigate } from 'react-router-dom'

import { useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver} from '@hookform/resolvers/zod'
import {signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {auth} from '../../Services/firebaseConnection'

import toast from 'react-hot-toast'


const schema = z.object({
    email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
    password: z.string().nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>


export default function Login() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode:"onChange"
    })

    useEffect(() => {
        async function handleLogout()  {
            await signOut(auth)
        }

        handleLogout() 
    }, [])


    function onSubmit(data: FormData) {
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((user) => {
            toast.success("Logado com sucesso!")
            navigate("/dashboard", {replace: true})
            console.log(user)
            console.log("Logado com sucesso")
        })
        .catch(err => {
            console.log(err)
            toast.error("Erro ao fazer o login!")
        })
    }

    return (
       <Container>
            <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>

                <Link to="/" className='mb-6 max-w-sm w-full'>
                    <img src={logoImg} alt="Logo do site" />
                </Link>

                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className='bg-doak-whiteff max-w-xl w-full rounded-lg p-4'>
                    

                    <div className='mb-3'>
                        <Input 
                            type="email" 
                            placeholder="Digite seu email..." 
                            name="email"
                            error={errors.email?.message}
                            register={register}
                        />
                    </div>

                    <div className='mb-3'>
                        <Input 
                        type="password" 
                        placeholder="Digite sua senha..." 
                        name="password"
                        error={errors.password?.message}
                        register={register}
                        />
                    </div>

                    <button 
                        type='submit'
                        className='bg-doak-black w-full rounded-md text-doak-whiteff h-11 font-custom font-medium'>
                        Acessar
                    </button>
                </form>
            </div>
       </Container>
    )
}