export interface Structure {
	id?: number;
	image: string | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface UpdateStructureDto {
	image?: File | null;
}
