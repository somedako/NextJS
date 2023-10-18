import { RatingProps } from './Rating.props';
import cn from 'classnames';
import styles from './Rating.module.css';
import {
    useEffect,
    useState,
    KeyboardEvent,
    forwardRef,
    ForwardedRef,
    useRef,
} from 'react';
import StarIcon from './star.svg';

export const Rating = forwardRef(
    (
        {
            isEditable = false,
            rating,
            error,
            setRating,
            tabIndex,
            ...props
        }: RatingProps,
        ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
        const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

        const [ratingArray, setRaingArray] = useState<JSX.Element[]>(
            new Array(5).fill(<></>)
        );

        useEffect(() => {
            constructRating(rating);
        }, [rating]);

        const changeDisplay = (i: number) => {
            if (!isEditable) {
                return;
            }
            constructRating(i);
        };

        const onClick = (i: number) => {
            if (!isEditable || !setRating) {
                return;
            }
            setRating(i);
        };

        const handleKey = (e: KeyboardEvent) => {
            if (!isEditable || !setRating) {
                return;
            }
            if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
                if (!rating) {
                    setRating(1);
                } else {
                    e.preventDefault();
                    setRating(rating < 5 ? rating + 1 : 5);
                }
                ratingArrayRef.current[rating]?.focus();
            }

            if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
                e.preventDefault();
                setRating(rating > 1 ? rating - 1 : 1);
                ratingArrayRef.current[rating - 2]?.focus();
            }
        };

        const computeFocus = (r: number, i: number): number => {
            if (!isEditable) -1;

            if (!rating && i == 0) {
                return tabIndex ?? 0;
            }

            if (r == i + 1) {
                return tabIndex ?? 0;
            }

            return -1;
        };

        const constructRating = (currentRating: number) => {
            const updatedArray = ratingArray.map(
                (item: JSX.Element, i: number) => {
                    return (
                        <span
                            className={cn(styles.star, {
                                [styles.filled]: i < currentRating,
                                [styles.editable]: isEditable,
                            })}
                            onMouseEnter={() => changeDisplay(i + 1)}
                            onMouseLeave={() => changeDisplay(rating)}
                            onClick={() => onClick(i + 1)}
                            tabIndex={computeFocus(rating, i)}
                            onKeyDown={handleKey}
                            ref={(r) => ratingArrayRef.current?.push(r)}
                        >
                            <StarIcon />
                        </span>
                    );
                }
            );
            setRaingArray(updatedArray);
        };
        return (
            <div
                {...props}
                ref={ref}
                className={cn(styles.ratingWrapper, { [styles.error]: error })}
            >
                {ratingArray.map((item, i) => (
                    <span key={i}>{item}</span>
                ))}
                {error && (
                    <span className={styles.errorMessage}>{error.message}</span>
                )}
            </div>
        );
    }
);
