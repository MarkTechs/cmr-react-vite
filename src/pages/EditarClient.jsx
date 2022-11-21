import {Form, useNavigate,useLoaderData, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario';
import {obtenerCliente,editCliente} from "../data/clientes";
import Error from '../components/Error';


export async function loader({params}){
   const cliente =await obtenerCliente(params.clienteid) 
   if(Object.values(cliente).length === 0){
    throw new Response('',{
        status: 404,
        statusText: 'No hay resultados'
    })
   }
   
   return cliente 
}

export async function action({request, params}){
    const formData = await request.formData()
    
    const datos = Object.fromEntries(formData)

    const email = formData.get('email')

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    

    //validacio
    const errores = []
    if(!regex.test(email)){
       errores.push('El email no es valido')
    }

    if(Object.values(datos).includes('')){
       errores.push('Todos los campos son obligatorios')
    }
    

    if(Object.keys(errores).length){
       return errores
    }

   await editCliente(params.clienteid,datos)

   return redirect('/')

}


function EditarClient() {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

    return (
    <>    
        <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
        <p className=" mt-3">Edita los campos para cambiar la información de un cliente</p>
    
        <div className='flex justify-end'>

        <button onClick={() => navigate('/')} className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'>
            volver
        </button>

    </div>

    <div className='bg-white shadow-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

        {errores?.length && errores.map( (error, i)=> <Error key={i}>{error}</Error>) }
      
       <Form
       method='put'
       noValidate>
        <Formulario 
        cliente={cliente}
        />
        
            <input type='submit' 
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' 
            value="Editar Cliente" 
            />
        
        </Form>
    </div>
    </>);
}

export default EditarClient;