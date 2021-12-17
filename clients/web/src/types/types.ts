export interface PanzoomDetail {
	x: number;
	y: number;
	scale: number;
}

export interface PanzoomEvent extends Event {
	detail: PanzoomDetail;
}