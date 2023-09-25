import { PProps } from './P.props';
import cn from 'classnames';
import styles from './P.module.css';

export const P = ({
    size = 'm',
    children,
    className,
    ...props
}: PProps): JSX.Element => {
    return (
        <>
            <p
                className={cn(styles.p, className, {
                    [styles.s]: size == 's',
                    [styles.m]: size == 'm',
                    [styles.l]: size == 'l',
                })}
                {...props}
            >
                {children}
            </p>
        </>
    );
    // return (
    //     <>
    //         {tag == 'h1' && <h1>{children}</h1>}
    //         {tag == 'h2' && <h2>{children}</h2>}
    //         {tag == 'h3' && <h3>{children}</h3>}
    //     </>
    // );
};
