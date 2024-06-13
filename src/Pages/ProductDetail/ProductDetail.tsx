import { useEffect, useState } from "react"
import Container from "../../Components/Container/Container"
import { FaWhatsapp } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"



import { getDoc, doc, } from "firebase/firestore"
import { db } from "../../Services/firebaseConnection"


interface ProductProps {
    id: string;
    name: string;
    measure: string;
    description: string;
    price: string | number;
    created: string;
    owner: string;
    uid: string;
    whatsapp: string;
    category: string;
    images: ImagesProductProps[]
}

interface ImagesProductProps {
    name: string;
    uid:string;
    url: string;
}

export default function ProductDetail() {
    const [product, setProduct] = useState<ProductProps>();
    const { id } = useParams();
    const [sliderPerView, setSliderPerView] = useState<number>(2)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadProduct() {
            if(!id) {return}

            const docRef = doc(db, "products", id)
            getDoc(docRef)
            .then((snapshot) => {

                if(!snapshot.data()) {
                    navigate("/")
                }

                setProduct({
                    id: snapshot.id,
                    name: snapshot.data()?.name,
                    measure: snapshot.data()?.measure,
                    uid: snapshot.data()?.uid,
                    description: snapshot.data()?.description,
                    created: snapshot.data()?.created,
                    whatsapp: snapshot.data()?.whatsapp,
                    price: snapshot.data()?.price,
                    owner: snapshot.data()?.owner,
                    images: snapshot.data()?.images,
                    category: snapshot.data()?.category
                })
            })
        }

        loadProduct()
    }, [id])

    useEffect(() => {
        function handleResize() {
            if(window.innerWidth < 720){
                setSliderPerView(1)
            }else {
                setSliderPerView(2)
            }
        }

        handleResize()

        window.addEventListener("resize",handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])

    return (
        <div className="pt-20">
            <Container>

          {product && (
                <Swiper
                slidesPerView={sliderPerView}
                pagination={{clickable: true}}       
                navigation    
                >
                    {product?.images.map( image => (
                        <SwiperSlide key={image.name}>
                            <img
                                className="w-full h-96 object-cover" 
                                src={image.url} alt="" />
                        </SwiperSlide>
                    ))}
            </Swiper>
          )}

            {product && (
                <main className="w-full bg-doak-whiteff rounded-lg p-6 my-4">
                    <div className="flex flex-row sm:flex-row mb-4 items-center justify-between gap-2">
                        <div>
                             <h1 className="font-custom  text-doak-black font-black">{product?.name}</h1>
                             <h1 className="font-custom  text-doak-black/70 font-black">R$: {product?.price}</h1>
                        </div>
                        <div>
                            <p className="mt-1 mb-1 font-custom  text-sm font-medium text-doak-grey/50">{product.category}</p>
                            <p className="border-2 rounded-lg w-40 font-custom font-bold h-8 flex justify-center items-center">{product.measure}</p>
                        </div>
                    </div>
                    
                    <div className="flex w-full gap-6 my-4">
                        <div>
                            <strong className="mb-4">Decrição:</strong>
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <a 
                        target="_blank"
                        href={`https://api.whatsapp.com/send?phone=${88996388210}&text=Olá, vi está ${product.category} no site e quero saber mais sobre ela. ${product.name}`}
                        className="bg-doak-grey w-full text-doak-whiteff flex items-center justify-center gap-2 my-6 h-11 rounded-lg font-bold cursor-pointer hover:bg-doak-black transition-all"
                    >
                        COMPRAR
                        <FaWhatsapp size={26}/>
                    </a>
                </main>
            )}
        </Container>
        </div>
    )
}