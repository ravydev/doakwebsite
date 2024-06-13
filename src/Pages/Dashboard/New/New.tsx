import { ChangeEvent, useState, useContext } from "react";
import Container from "../../../Components/Container/Container";
import PainelHeader from "../../../Components/PainelHeader/PainelHeader";
import { FiUpload, FiTrash } from "react-icons/fi";
import { useForm } from "react-hook-form";
import Input from "../../../Components/Input/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../Contexts/AuthContext";
import  {v4 as uuidV4} from "uuid"
import { storage, db } from "../../../Services/firebaseConnection";
import { 
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "firebase/storage";

import { addDoc, collection } from "firebase/firestore";
import toast from 'react-hot-toast'



const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    category: z.string().nonempty("A categoria é obrigatória"),
    description: z.string().nonempty("A descrição é obrigatória"),
    price: z.string().nonempty("O preço é obrigatório"),
    measure: z.string().nonempty("A medida é obrigatória")
})

type FormData = z.infer<typeof schema>;

interface ImageItemProps {
    uid: string;
    name: string;
    previewUrl: string;
    url: string
}

export default function New() {
    const {user} = useContext(AuthContext)
    const {register, handleSubmit, formState:{errors}, reset} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    const [productImages, setProductImages] = useState<ImageItemProps[]>([])


   async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.files && e.target.files[0]) {
            const image = e.target.files[0]
            if(image.type === 'image/jpeg' ||image.type === 'image/png') {
               await handleUpload(image)
            }else {
                alert("Envie uma imagem jpeg ou png!")
                return;
            }
          
        }
    }


    async function handleUpload(image:File) {
        if(!user?.uid) {
            return;
        }

        const currentUid = user?.uid;
        const uidImage = uuidV4();

        const uploadRef = ref(storage,`images/${currentUid}/${uidImage}`)

        uploadBytes(uploadRef, image)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadUrl) => {
                const imageItem = {
                    name: uidImage,
                    uid:currentUid,
                    previewUrl:  URL.createObjectURL(image),
                    url: downloadUrl,
                }

                setProductImages((images) => [...images, imageItem] )


            })
        })
    }


    function onSubmit(data: FormData) {
        if(productImages.length === 0) {
            toast.error("Envie uma imagem do produto")
            return;
        }

        const productListImges = productImages.map( product => {
            return {
                uid: product.uid,
                name: product.name,
                url: product.url
            }
        })
        addDoc(collection(db, "products"), {
            name: data.name.toUpperCase(),
            category: data.category,
            description: data.description,
            price: data.price,
            measure: data.measure,
            created: new Date(),
            owner: user?.name,
            uid: user?.uid,
            images: productListImges,
        })
        .then(() => {
            reset();
            setProductImages([]);
            toast.success("Cadastrado com sucesso!🥳")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    async function handleDeleteImage(item: ImageItemProps) {
        const imagePath = `images/${item.uid}/${item.name}`;
        const imageRef = ref(storage, imagePath)

         try {
            await deleteObject(imageRef)
            setProductImages(productImages.filter((product) => product.url !== item.url ))
        }catch(err){
            console.log("ERRI AO DELETAR")
        }
    }


    return (
        <Container>
            <div className="pt-20">
                <PainelHeader/>

                <div className="w-full bg-doak-whiteff p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 ">
                    <button className="border-2 rounded-lg w-48 flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48 hover:bg-doak-white transition-all">
                        <div className="absolute cursor-pointer ">
                            <FiUpload size={30} color="#000"/>
                        </div>
                        <div className="cursor-pointer ">
                            <input 
                                className="opacity-0 cursor-pointer"
                                onChange={handleFile}
                                type="file"
                                accept="image/*"
                            />
                        </div>
                    </button>

                    {productImages.map( item => (
                        <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
                            <button className="absolute bg-doak-grey/25 rounded-full h-10 w-10 flex items-center justify-center hover:bg-doak-white/25 hover:text-doak-whiteff transition-all " onClick={() => handleDeleteImage(item)}>
                                <FiTrash size={28} color=""/>
                            </button>
                            <img 
                                src={item.previewUrl}
                                className="rounded-lg w-full h-32 object-cover"
                                alt="Foto do produto"
                            />
                        </div>
                    ))}
                 </div>

                 <div className="w-full bg-doak-whiteff p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                    <form 
                        className="w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="mb-3">
                            <p className="mb-2 font-medium">Nome do produto:</p>
                            <Input
                                type="text"
                                register={register}
                                name="name"
                                error={errors.name?.message}
                                placeholder="Ex: Boss Polo"
                            />
                        </div>   

                          <div className="mb-3">
                            <p className="mb-2 font-medium">Categoria:</p>
                            <Input
                                type="text"
                                register={register}
                                name="category"
                                error={errors.category?.message}
                                placeholder="Ex: Camisa"
                            />
                        </div>   

                        <div className="flex wfull mbg-3 flex-row items-center gap-4">
                            <div className="mb-3">
                                <p className="mb-2 font-medium">Medidas:</p>
                                <Input
                                    type="text"
                                    register={register}
                                    name="measure"
                                    error={errors.measure?.message}
                                    placeholder="Ex: P,M e G"
                                />
                            </div>   
                            <div className="mb-3">
                                <p className="mb-2 font-medium">Preço:</p>
                                <Input
                                    type="text"
                                    register={register}
                                    name="price"
                                    error={errors.price?.message}
                                    placeholder="Ex: 99,90"
                                />
                            </div>
                            
                        </div>

                        <div className="mb-3">
                            <p className="mb-2 font-medium">Descrição:</p>
                            <textarea
                                className="border-2 w-full rounded-md h-24 px-2 pt-1"
                                {...register("description")}
                                name="description"
                                id="description"
                                placeholder="Descrição do produto..."
                            />
                            {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p> }
                        </div>

                     <button
                        className="rounded-md w-full bg-doak-black h-10 text-doak-whiteff font-medium" 
                        type="submit"
                    >
                        Cadastrar
                     </button>
                    </form>
                 </div>
            </div>
        </Container>
    )
}