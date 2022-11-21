import { json } from "react-router-dom"

export async function obtenerClientes(){

    const rp =  await fetch(import.meta.env.VITE_API_URL)
    const rs = await rp.json()
    return rs

}

export async function obtenerCliente(id){

    const rp =  await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const rs = await rp.json()
    return rs

}

export async function agregarCliente( newClient){

    try {
        const rp = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(newClient),
            headers: {
                'Content-Type': 'application/json',
                
            }
        })
        await rp.json()

    } catch (error) {
        console.log(error)
    }

}

export async function editCliente( id,client){

    try {
        const rp = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(client),
            headers: {
                'Content-Type': 'application/json',
                
            }
        })
        await rp.json()

    } catch (error) {
        console.log(error)
    }

}

export async function eliminarCliente( id){

    try {
        const rp = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
        })
        await rp.json()

    } catch (error) {
        console.log(error)
    }

}