export class TourStep {
  title!: string;
  description!: string;
  // stepNo?: number;
  selector?: string;
  element?: HTMLElement;
  backdrop?: boolean;
  bodyMask?: boolean;
}
