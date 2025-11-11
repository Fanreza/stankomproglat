export interface DirectorProfile {
	id: number;
	order: number;
	beginYear: number;
	endYear?: number | null;
	name: string;
	detail: string;
	file?: string | null;
	createdAt: string;
	updatedAt: string;
	picture: string;
}

export interface CreateDirectorProfileDto {
	order: number;
	beginYear: number;
	endYear?: number | null;
	name: string;
	detail: string;
	file?: File | null;
}

export interface UpdateDirectorProfileDto {
	order?: number;
	beginYear?: number;
	endYear?: number | null;
	name?: string;
	detail?: string;
	file?: File | null;
}
