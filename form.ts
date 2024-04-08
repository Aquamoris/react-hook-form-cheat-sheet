import styles from './AddTechnicForm.module.scss';
import {Controller, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";

type AddForm = {
    name: string;
    age: number;
}

const AddTechnicForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control, // Интеграция с библиотеками
        clearErrors,
        formState: { errors }
    } = useForm<AddForm>({
        defaultValues: {
            age: 18
        }
    });
    
    const submit: SubmitHandler<AddForm> = data => {
        console.log(data);
    }

    const error: SubmitErrorHandler<AddForm> = data => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(submit, error)}>
                <input type="text" {...register('name', {required: true})} aria-invalid={!!errors.name}/>
                <Controller render={({ field }) => <input {...field} />} name='age' control={control} />
                <input type="number" {...register('age')}/>
                <button>Отправить</button>
                <button type='button' onClick={() => reset({
                    name: '',
                    age: 0
                })}>Очистить форму</button>
                <button type='button' onClick={() => clearErrors()}>Очистить ошибки</button>
                <button type='button' onClick={() => setValue('name', 'Вася')}>Установить имя</button>
            </form>
            {watch('age')}
        </>
    );
};

export default AddTechnicForm;