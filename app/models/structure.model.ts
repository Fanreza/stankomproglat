export interface Structure {
	id?: number;
	image: string | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface UpdateStructureDto {
	file?: File | null;
}
