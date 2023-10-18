import { useScrollY } from '@/hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import styles from './Up.module.css';
import UpIcon from './up.svg';

export const Up = (): JSX.Element => {
    const control = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        control.start({ opacity: y / document.body.scrollHeight });
    }, [y, control]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <motion.div
            animate={control}
            initial={{ opacity: 0 }}
            className={styles.up}
        >
            <ButtonIcon appearance="primary" icon="up" onClick={scrollToTop} />
        </motion.div>
    );
};
