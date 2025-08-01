import {useWaitUntil} from '../../zustand/useWaitUntil.tsx'


const waitUntil = () => {
    const {statusSpinner} = useWaitUntil()


    return(
        <div className={`${statusSpinner} fixed inset-0 size-[150px] bg-orange-500 rounded-full`}>
            cuackkkkkkkkkkkkk
        </div>
    )
}