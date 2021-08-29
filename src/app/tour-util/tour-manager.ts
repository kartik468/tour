import { emptyDomElement } from './dom-util';
import { TourStep } from './tour-step';

export class TourManager {
  steps: TourStep[] = [];

  currentStep!: TourStep;
  currentStepIndex!: number;

  private id!: string;

  reportWindowSizeFn!: () => void;

  constructor() {
    this.reportWindowSizeFn = this.reportWindowSize.bind(this);
    this.initManager();
  }

  private initManager() {
    // creat unique id
    this.id = this.uuidv4();
    console.log(this.id);

    this.createWrapperDomForTourManager();

    this.addWindowResizeEventHandler();
  }

  private createWrapperDomForTourManager() {
    // create wrapper div for containing mask and spotlight div
    const wrapper = document.createElement('div');
    wrapper.classList.add(
      'tour-manager-wrapper',
      'tour-manager-wrapper-' + this.id
    );

    // append wrapper to body
    document.body.appendChild(wrapper);
  }

  start() {
    if (this.steps) {
      this.currentStepIndex = 0;
      this.currentStep = this.steps[this.currentStepIndex];
      this.goToStep(this.currentStep);
    } else {
      console.error('No Steps Found');
    }
  }

  exit() {}

  goToNextStep() {
    this.currentStepIndex++;
    this.currentStep = this.steps[this.currentStepIndex];
    this.goToStep(this.currentStep);
  }

  goToPrevStep() {
    this.currentStepIndex--;
    this.currentStep = this.steps[this.currentStepIndex];
    this.goToStep(this.currentStep);
  }

  goToStep(step: TourStep) {
    if (!step) {
      return;
    }
    this.createDomForStepAndPosition(step);
  }

  createDomForStepAndPosition(step: TourStep) {
    // empty the wrapper div
    const wrapperDiv = document.querySelector(
      '.tour-manager-wrapper-' + this.id
    ) as HTMLElement;
    emptyDomElement(wrapperDiv);

    // create dom according to step

    // create body mask
    if (step.bodyMask) {
      const bodyMask = document.createElement('div');
      bodyMask.classList.add('tour-manager-body-mask');

      wrapperDiv.appendChild(bodyMask);
    }

    if (step.element) {
      // create spotlight div according to the size of step element
      let highlightElement: HTMLElement = step.element as HTMLElement;

      if (typeof step.element === 'string') {
        highlightElement = document.querySelector(step.element) as HTMLElement;
      }
      step.highlightElem = highlightElement;

      console.log(highlightElement);

      // create spotlight div
      const spotlightDiv: HTMLElement = document.createElement('div');
      spotlightDiv.classList.add('tour-spotlight-element');
      step.spotlightElem = spotlightDiv;

      this.positionSpotLightDiv(spotlightDiv, highlightElement);

      wrapperDiv.appendChild(spotlightDiv);
    }
  }

  positionSpotLightDiv(
    spotlightDiv: HTMLElement,
    highlightElement: HTMLElement
  ) {
    const highlightElementDOMRect = highlightElement.getBoundingClientRect();
    console.log(highlightElementDOMRect);

    spotlightDiv.style.width = highlightElementDOMRect.width + 'px';
    spotlightDiv.style.height = highlightElementDOMRect.height + 'px';

    spotlightDiv.style.left = highlightElementDOMRect.left + 'px';
    spotlightDiv.style.top = highlightElementDOMRect.top + 'px';
  }

  setSteps(steps: TourStep[]) {
    this.steps = steps.map((step) => {
      return new TourStep(step);
    });
  }

  addWindowResizeEventHandler() {
    window.addEventListener('resize', this.reportWindowSizeFn);
  }

  removeWindowResizeEventHandler() {
    window.removeEventListener('resize', this.reportWindowSizeFn);
  }

  reportWindowSize() {
    if (this.currentStep && this.currentStep.spotlightElem && this.currentStep.highlightElem) {
      this.positionSpotLightDiv(this.currentStep.spotlightElem, this.currentStep.highlightElem);
      console.log(this.currentStep);
    }
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
