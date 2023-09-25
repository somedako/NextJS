import { FooterProps } from './Footer.props';
import { format } from 'date-fns';
import cn from 'classnames';
import styles from './Footer.module.css';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <div>
                OwlTop © 2022 - {format(new Date(), 'yyyy')} Все права защищены
            </div>
            <a href="#" target="_blnak">
                Пользовательское соглашение
            </a>
            <a href="#" target="_blnak">
                Политика конфиденциальности
            </a>
        </footer>
    );
};
