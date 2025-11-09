export interface Announcement {
	id: number;
	title: string;
	description: string;
	file?: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface CreateAnnouncementDto {
	title: string;
	description: string;
	file?: File | null;
}

export interface UpdateAnnouncementDto extends Partial<CreateAnnouncementDto> {}
