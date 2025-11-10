export interface SocialMediaPost {
	id: number;
	platform: string; // ex: FACEBOOK, INSTAGRAM
	postLink: string;
	image?: string; // URL atau path file
	createdById: number;
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
