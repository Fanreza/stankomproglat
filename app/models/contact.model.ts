export interface Contact {
	id: number;
	key: string;
	value: string;
	createdAt: string;
	updatedAt: string;
	updatedById: number | null;
}

export interface UpdateContactDto {
	value: string;
}
