export interface StatisticCategory {
	id: number;
	name: string;
	link: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateStatisticCategoryDto {
	name: string;
	link: string;
}

export interface UpdateStatisticCategoryDto {
	name?: string;
	link?: string;
}
