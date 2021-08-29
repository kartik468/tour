export class TourStep {
  title!: string;
  description!: string;
  // stepNo?: number;
  element?: string | HTMLElement;
  backdrop?: boolean = true;
  bodyMask?: boolean = true;

  highlightElem?: HTMLElement;
  spotlightElem?: HTMLElement;

  constructor(step: TourStep) {
    this.title = step.title;
    this.description = step.description;
    this.element = step.element;

    if (step.backdrop !== undefined) {
      this.backdrop = step.backdrop;
    }

    if (step.bodyMask !== undefined) {
      this.bodyMask = step.bodyMask;
    }
  }
}
