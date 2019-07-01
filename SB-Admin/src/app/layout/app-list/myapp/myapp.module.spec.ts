import { MyappModule } from './myapp.module';

describe('MyappModule', () => {
    let myappModule: MyappModule;

    beforeEach(() => {
        myappModule = new MyappModule();
    });

    it('should create an instance', () => {
        expect(MyappModule).toBeTruthy();
    });
});
