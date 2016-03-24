import { Component, View } from "angular2/core";
import { HelloWorldComponent } from 'test@helloWorld/components';

@Component()
@View({
    directives: [ HelloWorldComponent ],
    template: `
        <h2>Medias.</h2>
        <p>Some other content right here</p>
        <p>Module :</p>
        <helloWorld-cmp></helloWorld-cmp>
    `
})
export class MediasComponent { }