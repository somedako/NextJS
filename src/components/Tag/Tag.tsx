import { TagProps } from './Tag.props';
import cn from 'classnames';
import styles from './Tag.module.css';

export const Tag = ({
    size = 's',
    children,
    color = 'ghost',
    className,
    href,
    ...props
}: TagProps): JSX.Element => {
    return (
        <>
            <div
                className={cn(styles.tag, className, {
                    [styles.s]: size == 's',
                    [styles.m]: size == 'm',
                    [styles.ghost]: color == 'ghost',
                    [styles.red]: color == 'red',
                    [styles.gray]: color == 'grey',
                    [styles.green]: color == 'green',
                    [styles.primary]: color == 'primary',
                })}
                {...props}
            >
                {href ? <a href={href}>{children}</a> : <>{children}</>}
            </div>
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
