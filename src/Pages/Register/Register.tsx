import { useEffect, useContext } from 'react'
import logoImg from '../../assets/logo-black.png'
import Container from '../../Components/Container/Container'
import Input from '../../Components/Input/Input'
import { Link, useNavigate } from 'react-router-dom'

import { useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver} from '@hookform/resolvers/zod'

import { auth} from '../../Services/firebaseConnection'
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { AuthContext } from '../../Contexts/AuthContext'


const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
    password: z.string().min(6, "A senha deve pelo menos 6 caracteres").nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>


export default function Register() {
    const { handleInfoUser} = useContext(AuthContext)
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



    async function onSubmit(data: FormData) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (user) => {
           await updateProfile(user.user, {
            displayName: data.name
           }) 
           
           handleInfoUser({
            name: data.name,
            email: data.email,
            uid: user.user.uid
           })
           
           console.log("CADASTRADO COM SUCESSO")
           navigate("/dashboard", { replace: true})
        })
        .catch((error) => {
            console.log("ERRO AO CADASTRAR")
            console.log(error)
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
                            type="text" 
                            placeholder="Digite seu nome completo" 
                            name="name"
                            error={errors.email?.message}
                            register={register}
                        />
                    </div>

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
                        Cadastrar
                    </button>
                </form>

                <Link to="/login">
                    Já possui uma conta? Faça o login!
                </Link>
                
            </div>
       </Container>
    )
}