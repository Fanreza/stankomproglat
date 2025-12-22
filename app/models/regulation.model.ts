export interface Regulation {
	id: number;
	title: string;
	description: string;
	file?: string | null;
	attachment?: string | null;
	createdAt: string;
	updatedAt: string;
	createdBy: {
		name: string;
	};
}

export interface CreateRegulationDto {
	title: string;
	description: string;
	file?: File | null;
}

export interface UpdateRegulationDto extends Partial<CreateRegulationDto> {}
