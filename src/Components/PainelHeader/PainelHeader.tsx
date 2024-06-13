import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../Services/firebaseConnection"

export default function PainelHeader() {

    async function handleLogout() {
        await signOut(auth);
    }


    return(
        <div className="w-full items-center flex h-10 bg-doak-black rounded-lg text-doak-whiteff font-medium gap-4 px-4 text-sm mb-4">
            <Link 
                className=" hover:text-doak-grey transition-all"
                to="/dashboard">
                Dashboard
            </Link>
            <Link 
                className=" hover:text-doak-grey transition-all"
                to="/dashboard/new">
                Cadastrar Produto
            </Link>

            <button 
                className="ml-auto hover:text-doak-grey transition-all"
                onClick={handleLogout}> Sair da conta</button>
        </div>
    )
}