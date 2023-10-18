import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import styles from './ReviewForm.module.css';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
    productId,
    className,
    isOpened,
    ...props
}: ReviewFormProps): JSX.Element => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IReviewForm>();

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(
                API.review.createDemo,
                { ...formData, productId }
            );
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    {...register('name', {
                        required: { value: true, message: 'Заполните имя' },
                    })}
                    placeholder="Имя"
                    tabIndex={isOpened ? 0 : -1}
                    error={errors.name}
                />
                <Input
                    {...register('title', {
                        required: {
                            value: true,
                            message: 'Заполните заголовок',
                        },
                    })}
                    placeholder="Заголовок отзыва"
                    tabIndex={isOpened ? 0 : -1}
                    error={errors.title}
                    className={styles.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{
                            required: {
                                value: true,
                                message: 'Укажите',
                            },
                        }}
                        render={({ field }) => (
                            <Rating
                                isEditable
                                rating={field.value}
                                setRating={field.onChange}
                                ref={field.ref}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        )}
                    />
                </div>
                <Textarea
                    {...register('description', {
                        required: {
                            value: true,
                            message: 'Заполните описание',
                        },
                    })}
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                    placeholder="Текст отзыва"
                    className={styles.description}
                />
                <div className={styles.submit}>
                    <Button appearance="primary" tabIndex={isOpened ? 0 : -1}>
                        Отправить
                    </Button>
                    <span className={styles.info}>
                        * Перед публикацией отзыв пройдет предварительную
                        модерацию и проверку
                    </span>
                </div>
            </div>

            {isSuccess && (
                <div className={styles.success}>
                    <div className={styles.successTitle}>
                        Ваш отзыв отправлен
                    </div>
                    <div>
                        Спасибо, Ваш отзыв будет опубликован после провреки.
                    </div>
                    <CloseIcon
                        className={styles.close}
                        onClick={() => setIsSuccess(false)}
                    />
                </div>
            )}

            {error && (
                <div className={styles.error}>
                    Что-то пошло нетак попробуйте обновить страницу
                    <CloseIcon
                        className={styles.close}
                        onClick={() => setError(undefined)}
                    />
                </div>
            )}
        </form>
    );
};
