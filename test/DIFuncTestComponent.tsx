import React from 'react';
import { Inject } from '../src/di/decorate/service';
// import { Inject } from 'di-service'; // npm pack test
import { INumberProvider } from './service/serviceInterface/constProvider';
import { IObjectProvider } from './service/serviceInterface/objectProvider';

const DIFuncTestComponent = (props: any, {}, services: { NumberService: INumberProvider, ObjectService: IObjectProvider }) => {
return (
        <div>
            <h2>DI Function Component Test</h2>
            <div>NumberService: {services.NumberService}</div>
            <div>ObjectService: {services.ObjectService.Score}</div>
        </div>
    )
}

export default Inject(['NumberService', 'ObjectService'])(DIFuncTestComponent);