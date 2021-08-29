import { Component, OnInit } from '@angular/core';
import { TourManager } from './tour-util/tour-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'custom-tour';

  tourManager!: TourManager;

  ngOnInit() {
    this.tourManager = new TourManager();

    const steps = [
      // {
      //   title: 'Welcome',
      //   description: 'Hello World! 👋',
      // },
      {
        title: 'Twitter',
        // element: document.querySelector('.twitter-link') as HTMLElement,
        element: '.twitter-link',
        description: 'Follow us on Twitter',
      },
      {
        title: 'YouTube',
        element: document.querySelector('.youtube-link') as HTMLElement,
        description: 'Checkout our YouTube channel!',
      },
      {
        title: 'Resources',
        element: document.querySelector('.resources-body') as HTMLElement,
        description: 'Here are some links to help you get started:',
      },
      {
        title: 'Next Steps',
        element: document.querySelector('.next-steps-body') as HTMLElement,
        description: 'What do you want to do next with your app?',
      },
      {
        title: 'Farewell!',
        description: 'And this is our final step!',
      },
    ];

    this.tourManager.setSteps(steps);

    this.tourManager.start();

    setInterval(() => {
      this.tourManager.goToNextStep();
    }, 3000);
  }
}
