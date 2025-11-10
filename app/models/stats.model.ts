export interface Statistic {
	id: number;
	name: string;
	number: number;
	link: string;
	categoryId: number;
	createdAt: string;
	updatedAt: string;
}

export interface CreateStatisticDto {
	name: string;
	number: number;
	link: string;
	categoryId: number;
}

export interface UpdateStatisticDto {
	name?: string;
	number?: number;
	link?: string;
	categoryId?: number;
}
