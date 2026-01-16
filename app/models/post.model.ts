export interface SocialMediaPost {
	id: number;
	platform: string;
	postLink: string;
	image?: string;
	createdById: number;
	createdBy: {
		id: number;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
}

export interface CreateSocialMediaPostDto {
	platform: string;
	postLink: string;
	image?: string;
	createdById: number;
}

export interface UpdateSocialMediaPostDto {
	platform?: string;
	postLink?: string;
	image?: string;
}
