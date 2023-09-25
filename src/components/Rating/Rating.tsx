import { RatingProps } from './Rating.props';
import cn from 'classnames';
import styles from './Rating.module.css';
import { useEffect, useState, KeyboardEvent } from 'react';
import StarIcon from './star.svg';

export const Rating = ({
    isEditable = false,
    rating,
    setRating,
    ...props
}: RatingProps): JSX.Element => {
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

    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
        if (e.code != 'Space' || !setRating) {
            return;
        }
        setRating(i);
    };

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((item: JSX.Element, i: number) => {
            return (
                <span
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable,
                    })}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                >
                    <StarIcon
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                            isEditable && handleSpace(i + 1, e)
                        }
                    />
                </span>
            );
        });
        setRaingArray(updatedArray);
    };
    return (
        <div {...props}>
            {ratingArray.map((item, i) => (
                <span key={i}>{item}</span>
            ))}
        </div>
    );
};
