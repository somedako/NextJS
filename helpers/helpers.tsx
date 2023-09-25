import CourseIcon from './icons/course.svg';
import BookIcon from './icons/book.svg';
import ProductIcon from './icons/product.svg';
import ServiceIcon from './icons/service.svg';
import { LevelCategory } from '@/interfaces/page.interface';
import { FirstLevelMenuItem } from '@/interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
    {
        route: 'courses',
        name: 'Курсы',
        icon: <CourseIcon />,
        id: LevelCategory.Courses,
    },
    {
        route: 'services',
        name: 'Сервисы',
        icon: <ServiceIcon />,
        id: LevelCategory.Services,
    },
    {
        route: 'books',
        name: 'Книги',
        icon: <BookIcon />,
        id: LevelCategory.Books,
    },
    {
        route: 'products',
        name: 'Продукты',
        icon: <ProductIcon />,
        id: LevelCategory.Products,
    },
];

export const priceRu = (price: number): string =>
    price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .concat(' ₽');

export const deflOfNum = (
    number: number,
    titles: [string, string, string]
): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
    ];
};
