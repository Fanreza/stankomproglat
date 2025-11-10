export interface Service {
	id: number;
	title: string;
	description: string;
	link: string;
	icon: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateServiceDto {
	title: string;
	description?: string;
	link?: string;
	icon?: string;
}

export interface UpdateServiceDto {
	title?: string;
	description?: string;
	link?: string;
	icon?: string;
}
