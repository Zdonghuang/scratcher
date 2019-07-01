import { Step4Module } from './step4.module';

describe('Step4Module', () => {
    let step4Module: Step4Module;

    beforeEach(() => {
        step4Module = new Step4Module();
    });

    it('should create an instance', () => {
        expect(Step4Module).toBeTruthy();
    });
});
