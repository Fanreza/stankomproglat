export interface FAQ {
	id: number;
	question: string;
	answer: string;
	createdById: number;
	createdAt: string;
	updatedAt: string;
}

export interface CreateFaqDto {
	question: string;
	answer: string;
	createdById?: number;
}

export interface UpdateFaqDto {
	question?: string;
	answer?: string;
}
