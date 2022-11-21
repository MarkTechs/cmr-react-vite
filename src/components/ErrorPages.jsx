import {useRouteError} from 'react-router-dom'

export default function ErrorPages() {
    const error = useRouteError()
    return (
        <div className='space-y-8'>
            <h1 className='text-center text-6xl font-bold mt-20 text-blue-900'>
               Existe el siguiente error: {error.statusText || error.message}
            </h1>
        </div>
    );
}

