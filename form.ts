import {Controller, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";

type AddForm = {
    name: string;
    age: number;
    cardNumber: number;
}

const normalizeCardNumber = (value: string) => {
    return value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || "";
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
        formState: { errors, isValid }
    } = useForm<AddForm>({
        defaultValues: {
            age: 18
        },
        mode: "onBlur"
    });
    
    const submit: SubmitHandler<AddForm> = data => {
        alert(JSON.stringify(data));
        reset(); // Очистка формы
    }

    const error: SubmitErrorHandler<AddForm> = data => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(submit, error)}>

                <label>
                    Имя
                <input type="text" {...register('name', {
                    required: 'Поле обязательно',
                    minLength: {
                        value: 5,
                        message: 'Длина должна быть больше 5 символов'
                    }
                })} aria-invalid={!!errors.name}/>
                </label>
                <div>{errors?.name && <p>{errors?.name?.message || 'Ошибка'}</p>}</div>

                <Controller render={({ field }) => <input {...field} />} name='age' control={control} />

                <input type="number" {...register('age')}/>

                <input
                    placeholder='0000 0000 0000 0000'
                    type='tel'
                    inputMode='numeric'
                    autoComplete='cc-number'
                    {...register('cardNumber')}
                    onChange={(event) => {
                        const {value} = event.target;
                        event.target.value = normalizeCardNumber(value);
                    }}
                />

                <button disabled={!isValid}>Отправить</button>

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