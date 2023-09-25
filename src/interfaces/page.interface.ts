export enum LevelCategory {
    Courses,
    Services,
    Books,
    Products,
}

export interface PageAdvantage {
    _id: string;
    title: string;
    description: string;
}

export interface HhData {
    _id: string;
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
    updateAt: Date;
}

export interface PageModel {
    tags: string[];
    _id: string;
    secondCategory: string;
    alias: string;
    title: string;
    category: string;
    seoText?: string;
    tagsTitle: string;
    metaTitle: string;
    metaDescription: string;
    firstCategory: LevelCategory;
    advantages?: PageAdvantage[];
    createAt: Date;
    updateAt: Date;
    hh?: HhData;
}
